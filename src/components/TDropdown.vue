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
    @click="clicHandler"
    @focus="focuseHandler"
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
        @mouseleave="mouseleaveHandler"
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
import { TDropdownConfig, TDropdownConfigKeys } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { useAttributes, useConfigurationWithClassesList } from '../use';
import { Data, TDropdownOptions } from '../types';

const debounce = (func: (...args: any[]) => void, wait = 200) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return function debounceFn(...args: any[]) {
    const later = () => {
      timeout = undefined;
      func(args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (!timeout) func(args);
  };
};

const elementIsTargetOrTargetChild = (relatedTarget: EventTarget | null, wrapper: HTMLElement) : boolean => {
  if (!(relatedTarget instanceof Element)) {
    return false;
  }

  return wrapper.contains(relatedTarget);
};

const defaultPopperOptions: Options = {
  placement: 'bottom',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 10],
      },
    },
  ],
  strategy: 'absolute',
  onFirstUpdate: undefined,
};

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
      validator(value: string | undefined) {
        if (value === undefined) {
          return true;
        }

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
      default: (): Options => defaultPopperOptions,
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
      let { popperOptions } = this.configuration;

      if (popperOptions === undefined) {
        popperOptions = defaultPopperOptions;
      }

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
    this.destroyPopper();
  },
  methods: {
    dropdownAfterLeave() {
      this.getDropdownElement().style.removeProperty('visibility');
    },

    async updatePopper() {
      if (this.shown) {
        return;
      }

      this.getDropdownElement().style.visibility = 'hidden';

      this.popperIsAdjusted = false;

      await this.popper?.update();

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
      this.shown = true;
    },
    doHide(): void {
      this.shown = false;
    },
    clicHandler(e: MouseEvent): void {
      if (this.configuration.toggleOnClick) {
        this.doToggle();
      }

      this.$emit('click', e);
    },
    focuseHandler(e: FocusEvent): void {
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
        this.doHide();
      }

      this.$emit('mouseleave', e);
    },
  },
});

</script>
