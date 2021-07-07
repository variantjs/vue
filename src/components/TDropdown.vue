<template>
  <component
    :is="tagName"
    ref="trigger"
    type="button"
    aria-haspopup="true"
    aria-expanded="true"
    aria-controls="headlessui-menu-items-80"
    :class="configuration.classesList?.trigger"
    :disabled="configuration.disabled"
    v-bind="allAttributes"
    @click="clickHandler"
    @focus="focusHandler"
    @blur="blurHandler"
    @mouseover="mouseoverHandler"
    @mouseleave="mouseleaveHandler"
  >
    <slot
      v-if="$slots.trigger !== undefined"
      name="trigger"
    />
    <template v-else>
      {{ configuration.text }}
    </template>
  </component>

  <teleport
    :to="configuration.teleportTo"
    :disabled="! configuration.teleport"
  >
    <transition
      :enter-active-class="configuration.classesList?.enterActiveClass"
      :enter-from-class="configuration.classesList?.enterFromClass"
      :enter-to-class="configuration.classesList?.enterToClass"
      :leave-active-class="configuration.classesList?.leaveActiveClass"
      :leave-from-class="configuration.classesList?.leaveFromClass"
      :leave-to-class="configuration.classesList?.leaveToClass"
      @after-leave="dropdownAfterLeave"
    >
      <component
        :is="dropdownTagName"
        v-show="shown || !popperIsAdjusted"
        ref="dropdown"
        :class="configuration.classesList?.dropdown"
        tabindex="0"
        v-bind="dropdownAttributes"
        @mouseover="mouseoverHandler"
        @mouseleave="mouseleaveHandler"
        @blur="blurHandler"
      >
        <slot />
      </component>
    </transition>
  </teleport>
</template>

<script lang="ts">
import {
  createPopper, Instance, Options, Placement,
} from '@popperjs/core';
import {
  TDropdownConfig,
  TDropdownConfigKeys,
  debounce,
  elementIsTargetOrTargetChild,
  // getFocusableElements,
  // isTouchDevice,
  TDropdownPopperDefaultOptions as defaultPopperOptions,
} from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { useAttributes, useConfigurationWithClassesList } from '../use';
import { Data, TDropdownOptions } from '../types';

// @TODO remove
const getFocusableElements = (element: HTMLElement): Array<HTMLElement> => Array
  .from(element.querySelectorAll(
    'a, button, input, textarea, select, details, [contenteditable], [tabindex]:not([tabindex="-1"])',
  ))
  .filter((el) => !el.hasAttribute('disabled')) as Array<HTMLElement>;

// @TODO remove
const isTouchDevice = (w: Window = window, n: Navigator = navigator): boolean => (('ontouchstart' in w)
     || (n.maxTouchPoints > 0)
     || (n.msMaxTouchPoints > 0));

// @vue/component
export default defineComponent({
  name: 'TDropdown',
  props: {
    ...getVariantPropsWithClassesList<TDropdownOptions, TDropdownConfigKeys>(),
    text: {
      type: String,
      default: undefined,
    },
    teleport: {
      type: Boolean,
      default: false,
    },
    teleportTo: {
      type: [String, Object] as PropType<string | HTMLElement>,
      default: 'body',
    },
    tagName: {
      type: String,
      default: 'button',
    },
    dropdownTagName: {
      type: String,
      default: 'div',
    },
    dropdownAttributes: {
      type: Object,
      default: undefined,
    },
    disabled: {
      type: Boolean,
      default: undefined,
    },
    toggleOnFocus: {
      type: Boolean,
      default: false,
    },
    toggleOnClick: {
      type: Boolean,
      default: true,
    },
    toggleOnHover: {
      type: Boolean,
      default: false,
    },
    hideOnLeaveTimeout: {
      type: Number,
      default: 250,
    },
    show: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String as PropType<Placement>,
      default: undefined,
      validator(value: string) {
        // The value must match one of these strings
        return [
          'auto',
          'auto-start',
          'auto-end',
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'right',
          'right-start',
          'right-end',
          'left',
          'left-start',
          'left-end',
        ].includes(value);
      },
    },
    popperOptions: {
      type: Object as PropType<Options>,
      default: (): Options => defaultPopperOptions as Options,
    },
  },
  setup() {
    const configuration = useConfigurationWithClassesList<TDropdownOptions>(TDropdownConfig, ['trigger', 'dropdown', 'enterFromClass', 'enterActiveClass', 'enterToClass', 'leaveFromClass', 'leaveActiveClass', 'leaveToClass']);
    const attributes = useAttributes<TDropdownOptions>(configuration);

    return { configuration, attributes };
  },
  data({ configuration }) {
    return {
      popperIsAdjusted: false,
      shown: configuration.show,
      popper: null as Instance | null,
      popperAdjusterListener: null as null | (() => void),
      hideTimeout: null as ReturnType<typeof setTimeout> | null,
      focusableElements: [] as Array<HTMLElement>,
    };
  },
  computed: {
    allAttributes(): Data {
      return {
        ...this.attributes,
        ...this.$attrs,
      };
    },
    fullPopperOptions(): Options {
      const popperOptions = this.configuration.popperOptions as Options;

      if (this.configuration.placement !== undefined) {
        popperOptions.placement = this.configuration.placement;
      }

      const originalOnFirstUpdate = popperOptions.onFirstUpdate;
      popperOptions.onFirstUpdate = async (arg) => {
        if (originalOnFirstUpdate) {
          originalOnFirstUpdate(arg);
        }

        this.popperIsAdjusted = true;
      };

      return popperOptions;
    },
  },
  watch: {
    shown(shown: boolean) {
      this.$emit('update:show', shown);
    },
    'configuration.toggleOnFocus': {
      async handler(toggleOnFocus: boolean) {
        await this.$nextTick();
        if (toggleOnFocus) {
          this.addBlurListenersToChildElements();
        } else {
          this.removeBlurListenersFromChildElements();
        }
      },
      immediate: true,
    },
    'configuration.show': function configurationShowWatch(show: boolean) {
      if (show) {
        this.doShow();
      } else {
        this.doHide();
      }
    },
  },
  mounted() {
    this.createPopper();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    window.addEventListener('resize', this.popperAdjusterListener!);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    window.addEventListener('scroll', this.popperAdjusterListener!);
  },
  created() {
    this.popperAdjusterListener = debounce(this.updatePopper, 200);
  },
  beforeUnmount() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    window.removeEventListener('resize', this.popperAdjusterListener!);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    window.removeEventListener('scroll', this.popperAdjusterListener!);

    this.destroyPopper();

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }
  },
  methods: {
    addBlurListenersToChildElements(): void {
      const dropdown = this.getDropdownElement();

      this.focusableElements = getFocusableElements(dropdown);
      this.focusableElements.forEach((element) => element.addEventListener('blur', this.blurHandler));
    },
    removeBlurListenersFromChildElements(): void {
      this.focusableElements.forEach((element) => element.removeEventListener('blur', this.blurHandler));
      this.focusableElements = [];
    },
    dropdownAfterLeave() {
      this.getDropdownElement().style.removeProperty('visibility');
    },

    async updatePopper(): Promise<void> {
      if (this.shown) {
        return;
      }

      this.getDropdownElement().style.visibility = 'hidden';

      this.popperIsAdjusted = false;

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await this.popper!.update();

      this.popperIsAdjusted = true;
    },
    destroyPopper() : void {
      if (!this.popper) {
        return;
      }

      this.popper.destroy();
    },
    async createPopper() {
      if (!this.shown) {
        // Used to `hide` the dropdown while the position is adjusted
        // for the popper plugin
        this.getDropdownElement().style.visibility = 'hidden';
      }

      this.popper = createPopper(this.getTriggerElement(), this.getDropdownElement(), this.fullPopperOptions);
    },
    getDropdownElement(): HTMLDivElement {
      const { dropdown } = this.$refs;
      return dropdown as HTMLDivElement;
    },
    getTriggerElement(): HTMLButtonElement {
      const { trigger } = this.$refs;
      return trigger as HTMLButtonElement;
    },
    doToggle(): void {
      this.shown = !this.shown;
    },
    doShow(): void {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
      }

      this.shown = true;
    },
    doHide(): void {
      this.shown = false;
    },
    clickHandler(e: MouseEvent): void {
      if (this.configuration.toggleOnClick) {
        this.doToggle();
      }

      this.$emit('click', e);
    },
    focusHandler(e: FocusEvent): void {
      if (this.configuration.toggleOnFocus) {
        this.doShow();
      }

      this.$emit('focus', e);
    },
    blurHandler(e: FocusEvent): void {
      if (this.configuration.toggleOnFocus && !this.targetIsChild(e)) {
        this.doHide();
      }

      this.$emit('blur', e);
    },
    targetIsChild(e: FocusEvent | MouseEvent): boolean {
      return elementIsTargetOrTargetChild(e.relatedTarget, this.getDropdownElement())
        || elementIsTargetOrTargetChild(e.relatedTarget, this.getTriggerElement());
    },
    mouseoverHandler(e: MouseEvent): void {
      if (this.configuration.toggleOnHover) {
        this.doShow();
      }

      this.$emit('mouseover', e);
    },
    mouseleaveHandler(e: MouseEvent): void {
      if (this.configuration.toggleOnHover && !this.targetIsChild(e)) {
        this.hideAfterTimeout();
      }

      this.$emit('mouseleave', e);
    },

    hideAfterTimeout(): void {
      if (!this.configuration.hideOnLeaveTimeout) {
        this.doHide();
      } else {
        this.hideTimeout = setTimeout(() => {
          this.doHide();
          this.hideTimeout = null;
        }, this.configuration.hideOnLeaveTimeout);
      }
    },
  },
});

</script>
