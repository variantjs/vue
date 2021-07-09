<template>
  <transition
    :enter-active-class="configuration.classesList?.enterActiveClass"
    :enter-from-class="configuration.classesList?.enterFromClass"
    :enter-to-class="configuration.classesList?.enterToClass"
    :leave-active-class="configuration.classesList?.leaveActiveClass"
    :leave-from-class="configuration.classesList?.leaveFromClass"
    :leave-to-class="configuration.classesList?.leaveToClass"
  >
    <component
      :is="tagName"
      v-show="shown"
      :class="configuration.classesList?.wrapper"
      v-bind="attributes"
    >
      <component
        :is="tagName"
        :class="configuration.classesList?.body"
      >
        <slot
          v-if="$slots.default !== undefined"
          :show="doShow"
          :hide="doHide"
          :toggle="doToggle"
          :configuration="configuration"
        />
        <template v-else>
          {{ configuration.text }}
        </template>
      </component>

      <button
        type="button"
        :class="configuration.classesList?.trigger"
        class="relative flex items-center justify-center flex-shrink-0 w-6 h-6 ml-4 text-blue-500 transition duration-100 ease-in-out rounded hover:bg-blue-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
        @click="doHide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          :class="configuration.classesList?.closeIcon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </component>
  </transition>
</template>

<script lang="ts">
import { TAlertConfig, TAlertConfigKeys } from '@variantjs/core';
import { defineComponent } from 'vue';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { useAttributes, useConfigurationWithClassesList } from '../use';
import { TAlertOptions } from '../types';

// @vue/component
export default defineComponent({
  name: 'TAlert',
  props: {
    ...getVariantPropsWithClassesList<TAlertOptions, TAlertConfigKeys>(),
    text: {
      type: String,
      default: undefined,
    },
    tagName: {
      type: String,
      default: 'div',
    },
    bodyTagName: {
      type: String,
      default: 'div',
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: true,
    },
    timeout: {
      type: Number,
      default: undefined,
    },
  },
  emits: {
    'update:show': (show: boolean) => typeof show === 'boolean',
  },
  setup() {
    const configuration = useConfigurationWithClassesList<TAlertOptions>(TAlertConfig, ['wrapper', 'body', 'close', 'closeIcon', 'enterFromClass', 'enterActiveClass', 'enterToClass', 'leaveFromClass', 'leaveActiveClass', 'leaveToClass']);
    const attributes = useAttributes<TAlertOptions>(configuration);

    return { configuration, attributes };
  },
  data({ configuration }) {
    return {
      shown: (configuration as unknown as TAlertOptions).show,
    };
  },

  watch: {
    shown(shown: boolean): void {
      this.$emit('update:show', shown);
    },
    'configuration.show': function configurationShowWatch(show: boolean): void {
      if (show) {
        this.doShow();
      } else {
        this.doHide();
      }
    },
  },
  methods: {
    doToggle(): void {
      if (!this.shown) {
        this.doShow();
      } else {
        this.doHide();
      }
    },
    doShow(): void {
      this.shown = true;
    },
    doHide(): void {
      this.shown = false;
    },
  },
});

</script>
