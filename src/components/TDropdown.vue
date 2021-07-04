<template>
  <!-- id="headlessui-menu-button-1" -->
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
    @click.prevent="toggle"
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
      default: (): Options => ({
        placement: 'bottom',
        modifiers: [],
        strategy: 'absolute',
        onFirstUpdate: undefined,
      }),
    },
  },
  setup() {
    const configuration = useConfigurationWithClassesList<TDropdownOptions>(TDropdownConfig, ['trigger', 'dropdown', 'enterFromClass', 'enterActiveClass', 'enterToClass', 'leaveFromClass', 'leaveActiveClass', 'leaveToClass']);
    const attributes = useAttributes<TDropdownOptions>(configuration);

    return { configuration, attributes };
  },
  data() {
    return {
      popperIsAdjusted: false,
      shown: false,
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
        popperOptions = {
          placement: 'bottom',
          modifiers: [],
          strategy: 'absolute',
          onFirstUpdate: undefined,
        };
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
    toggle(): void {
      this.shown = !this.shown;
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
      this.getDropdownElement().style.visibility = 'hidden';

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
  },
});

</script>
