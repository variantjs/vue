<template>
  <component
    :is="tagName"
    ref="trigger"
    :type="tagName === 'button' ? 'button' : undefined"
    :aria-expanded="shown"
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
      :configuration="configuration"
      :is-show="shown"
      :popper="popper"
      name="trigger"
    >
      {{ configuration.text }}
    </slot>
  </component>

  <teleport
    :to="configuration.teleportTo"
    :disabled="! configuration.teleport"
  >
    <transitionable
      :classes-list="configuration.classesList"
      @after-leave="dropdownAfterLeave"
    >
      <component
        :is="dropdownTagName"
        v-show="shown || !popperIsAdjusted"
        ref="dropdown"
        :class="configuration.classesList?.dropdown"
        aria-hidden="!shown"
        v-bind="dropdownAttributes"
        @blur="blurHandler"
        @mouseover="mouseoverHandler"
        @mouseleave="mouseleaveHandler"
      >
        <slot
          :show="doShow"
          :hide="doHide"
          :toggle="doToggle"
          :configuration="configuration"
          :popper="popper"
        />
      </component>
    </transitionable>
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
  getFocusableElements,
  isTouchOnlyDevice,
  throttle,
  TDropdownPopperDefaultOptions as defaultPopperOptions,
  DebouncedFn,
} from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { useAttributes, useConfigurationWithClassesList } from '../use';
import { Data, TDropdownOptions } from '../types';
import Transitionable from './Transitionable.vue';
// @vue/component
export default defineComponent({
  name: 'TDropdown',
  components: { Transitionable },
  inheritAttrs: false,
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
      default: true,
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
  emits: {
    'update:show': (show: boolean) => typeof show === 'boolean',
    focus: (e: FocusEvent) => e instanceof FocusEvent,
    blur: (e: FocusEvent) => e instanceof FocusEvent,
    click: (e: MouseEvent) => e instanceof MouseEvent,
    mouseover: (e: MouseEvent) => e instanceof MouseEvent,
    mouseleave: (e: MouseEvent) => e instanceof MouseEvent,
    touchstart: (e: TouchEvent) => e instanceof TouchEvent,
  },
  setup() {
    const configuration = useConfigurationWithClassesList<TDropdownOptions>(TDropdownConfig, ['trigger', 'dropdown', 'enterFromClass', 'enterActiveClass', 'enterToClass', 'leaveFromClass', 'leaveActiveClass', 'leaveToClass']);
    const attributes = useAttributes<TDropdownOptions>(configuration);

    return { configuration, attributes };
  },
  data({ configuration }) {
    return {
      isTouchOnlyDevice: isTouchOnlyDevice(),
      popperIsAdjusted: false,
      shown: (configuration as unknown as TDropdownOptions).show,
      popper: null as Instance | null,
      popperAdjusterListener: null as null | DebouncedFn,
      hideTimeout: null as ReturnType<typeof setTimeout> | null,
      focusableElements: [] as Array<HTMLElement>,
      throttledToggle: null as null | (() => void),
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
    shouldShowWhenClicked(): boolean {
      return this.isTouchOnlyDevice
        && (this.configuration.toggleOnFocus === true || this.configuration.toggleOnHover === true);
    },
  },
  watch: {
    shown(shown: boolean): void {
      this.$emit('update:show', shown);
      if (shown) {
        this.onShown();
      } else {
        this.onHidden();
      }
    },
    'configuration.toggleOnFocus': {
      handler(toggleOnFocus: boolean): void {
        if (this.isTouchOnlyDevice) {
          return;
        }

        this.$nextTick().then(() => {
          if (toggleOnFocus) {
            this.addBlurListenersToChildElements();
          } else {
            this.removeBlurListenersFromChildElements();
          }
        });
      },
      immediate: true,
    },
    'configuration.show': function configurationShowWatch(show: boolean): void {
      if (show) {
        this.doShow();
      } else {
        this.doHide();
      }
    },
  },
  mounted() {
    this.createPopper();

    this.initPopperAdjusterListener();

    if (this.isTouchOnlyDevice && this.shown) {
      window.addEventListener('touchstart', this.touchstartHandler);
    }
  },
  created() {
    this.throttledToggle = throttle(this.doToggle, 200);
  },
  beforeUnmount() {
    this.disablePopperAdjusterListener();

    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
    }

    if (this.isTouchOnlyDevice && this.shown) {
      window.removeEventListener('touchstart', this.touchstartHandler);
    }
  },
  methods: {
    initPopperAdjusterListener() : void {
      this.popperAdjusterListener = debounce(this.updatePopper, 200);

      window.addEventListener('resize', this.popperAdjusterListener);

      window.addEventListener('scroll', this.popperAdjusterListener);
    },
    disablePopperAdjusterListener() : void {
      const popperAdjusterListener = this.popperAdjusterListener as DebouncedFn;

      window.removeEventListener('resize', popperAdjusterListener);

      window.removeEventListener('scroll', popperAdjusterListener);

      popperAdjusterListener.cancel();

      this.destroyPopper();
    },
    onShown(): void {
      if (this.isTouchOnlyDevice) {
        window.addEventListener('touchstart', this.touchstartHandler);
      }
    },
    onHidden(): void {
      if (this.isTouchOnlyDevice) {
        window.removeEventListener('touchstart', this.touchstartHandler);
      }
    },
    addBlurListenersToChildElements(): void {
      const dropdown = this.getDropdownElement();

      this.focusableElements = getFocusableElements(dropdown);
      this.focusableElements.forEach((element) => element.addEventListener('blur', this.blurHandler));
    },
    removeBlurListenersFromChildElements(): void {
      this.focusableElements.forEach((element) => element.removeEventListener('blur', this.blurHandler));
      this.focusableElements = [];
    },
    dropdownAfterLeave(): void {
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
    createPopper(): void {
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
      if (!this.shown) {
        this.doShow();
      } else {
        this.doHide();
      }
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
      this.$emit('click', e);

      if (this.configuration.toggleOnClick) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.throttledToggle!();
      } else if (this.shouldShowWhenClicked) {
        this.doShow();
      }
    },
    focusHandler(e: FocusEvent): void {
      this.$emit('focus', e);

      if (this.isTouchOnlyDevice) {
        return;
      }

      if (this.configuration.toggleOnFocus) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.throttledToggle!();
      }
    },
    blurHandler(e: FocusEvent): void {
      this.$emit('blur', e);

      if (this.isTouchOnlyDevice) {
        return;
      }

      if (this.configuration.toggleOnFocus && !this.targetIsChild(e.relatedTarget)) {
        this.doHide();
      }
    },
    targetIsChild(target: EventTarget | null): boolean {
      return elementIsTargetOrTargetChild(target, this.getDropdownElement())
        || elementIsTargetOrTargetChild(target, this.getTriggerElement());
    },
    mouseoverHandler(e: MouseEvent): void {
      this.$emit('mouseover', e);

      if (this.isTouchOnlyDevice) {
        return;
      }

      if (this.configuration.toggleOnHover) {
        this.doShow();
      }
    },
    mouseleaveHandler(e: MouseEvent): void {
      this.$emit('mouseleave', e);

      if (this.isTouchOnlyDevice) {
        return;
      }

      if (this.configuration.toggleOnHover && !this.targetIsChild(e.relatedTarget)) {
        this.hideAfterTimeout();
      }
    },
    touchstartHandler(e: TouchEvent) {
      this.$emit('touchstart', e);

      if (Array.from(e.targetTouches).some((touch) => this.targetIsChild(touch.target))) {
        return;
      }

      if (this.configuration.toggleOnFocus || this.configuration.toggleOnHover) {
        this.doHide();
      }
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
