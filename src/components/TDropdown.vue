<template>
  <button
    id="headlessui-menu-button-1"
    ref="trigger"
    class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    type="button"
    aria-haspopup="true"
    aria-expanded="true"
    aria-controls="headlessui-menu-items-80"
    @click.prevent="toggle"
  >
    Options
  </button>

  <teleport
    :to="configuration.teleportTo"
    :disabled="! configuration.teleport"
  >
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
      @after-leave="dropdownAfterLeave"
    >
      <div
        v-show="shown || !popperIsAdjusted"
        id="headlessui-menu-items-80"
        ref="dropdown"
        class="w-56 bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        aria-labelledby="headlessui-menu-button-1"
        role="menu"
        tabindex="0"
      >
        <div
          class="px-1 py-1 "
          role="none"
        >
          <button
            id="headlessui-menu-item-81"
            class="flex items-center w-full px-2 py-2 text-sm text-gray-900 rounded-md group"
            role="menuitem"
            tabindex="-1"
          >
            <svg
              class="w-5 h-5 mr-2"
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M4 13V16H7L16 7L13 4L4 13Z"
              fill="#EDE9FE"
              stroke="#A78BFA"
              stroke-width="2"
            /></svg>Edit
          </button><button
            id="headlessui-menu-item-82"
            class="flex items-center w-full px-2 py-2 text-sm text-gray-900 rounded-md group"
            role="menuitem"
            tabindex="-1"
          >
            <svg
              class="w-5 h-5 mr-2"
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M4 4H12V12H4V4Z"
              fill="#EDE9FE"
              stroke="#A78BFA"
              stroke-width="2"
            /><path
              d="M8 8H16V16H8V8Z"
              fill="#EDE9FE"
              stroke="#A78BFA"
              stroke-width="2"
            /></svg>Duplicate
          </button>
        </div><div
          class="px-1 py-1"
          role="none"
        >
          <button
            id="headlessui-menu-item-83"
            class="flex items-center w-full px-2 py-2 text-sm text-gray-900 rounded-md group"
            role="menuitem"
            tabindex="-1"
          >
            <svg
              class="w-5 h-5 mr-2"
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ><rect
              x="5"
              y="8"
              width="10"
              height="8"
              fill="#EDE9FE"
              stroke="#A78BFA"
              stroke-width="2"
            /><rect
              x="4"
              y="4"
              width="12"
              height="4"
              fill="#EDE9FE"
              stroke="#A78BFA"
              stroke-width="2"
            /><path
              d="M8 12H12"
              stroke="#A78BFA"
              stroke-width="2"
            /></svg>Archive
          </button><button
            id="headlessui-menu-item-84"
            class="flex items-center w-full px-2 py-2 text-sm text-gray-900 rounded-md group"
            role="menuitem"
            tabindex="-1"
          >
            <svg
              class="w-5 h-5 mr-2"
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ><path
              d="M10 4H16V10"
              stroke="#A78BFA"
              stroke-width="2"
            /><path
              d="M16 4L8 12"
              stroke="#A78BFA"
              stroke-width="2"
            /><path
              d="M8 6H4V16H14V12"
              stroke="#A78BFA"
              stroke-width="2"
            /></svg>Move
          </button>
        </div><div
          class="px-1 py-1"
          role="none"
        >
          <button
            id="headlessui-menu-item-85"
            class="flex items-center w-full px-2 py-2 text-sm text-gray-900 rounded-md group"
            role="menuitem"
            tabindex="-1"
          >
            <svg
              class="w-5 h-5 mr-2 text-violet-400"
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            ><rect
              x="5"
              y="6"
              width="10"
              height="10"
              fill="#EDE9FE"
              stroke="#A78BFA"
              stroke-width="2"
            /><path
              d="M3 6H17"
              stroke="#A78BFA"
              stroke-width="2"
            /><path
              d="M8 6V4H12V6"
              stroke="#A78BFA"
              stroke-width="2"
            /></svg>Delete
          </button>
        </div>
      </div>
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
import { TDropdownOptions } from '../types';

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
    tagName: {
      type: String,
      default: 'div',
    },
    dropdownWrapperTagName: {
      type: String,
      default: 'div',
    },
    dropdownTagName: {
      type: String,
      default: 'div',
    },
    text: {
      type: String,
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

    teleport: {
      type: Boolean,
      default: false,
    },
    teleportTo: {
      type: String,
      default: 'body',
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
    const configuration = useConfigurationWithClassesList<TDropdownOptions>(TDropdownConfig, ['button', 'wrapper', 'dropdownWrapper', 'dropdown', 'enterClass', 'enterActiveClass', 'enterToClass', 'leaveClass', 'leaveActiveClass', 'leaveToClass']);
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
