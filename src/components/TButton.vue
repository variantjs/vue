<template>
  <component
    :is="guessedTagName"
    :href="href"
    v-bind="attributes"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import { TButtonTheme } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { useConfiguration, useAttributes } from '../use';
import getVariantProps from '../utils/getVariantProps';
import { TButtonOptions, VueRouteAriaCurrentValue, VueRouteRouteLocationRaw } from '../types';

export default defineComponent({
  name: 'TButton',
  props: {
    ...getVariantProps<TButtonOptions>(),
    tagName: {
      type: String,
      default: 'button',
      validator(value: string) {
        return ['button', 'a'].indexOf(value) !== -1;
      },
    },
    href: {
      type: String,
      default: undefined,
    },
    // RouterLink Props
    to: {
      type: [String, Object] as PropType<VueRouteRouteLocationRaw>,
      default: undefined,
    },
    replace: {
      type: Boolean,
      default: false,
    },
    activeClass: {
      type: String,
      default: undefined,
    },
    exactActiveClass: {
      type: String,
      default: undefined,
    },
    custom: {
      type: Boolean,
      default: false,
    },
    ariaCurrentValue: {
      type: String as PropType<VueRouteAriaCurrentValue>,
      default: 'page',
    },
  },
  setup() {
    const configuration = useConfiguration<TButtonOptions>(TButtonTheme);
    const attributes = useAttributes<TButtonOptions>(TButtonTheme);

    return { configuration, attributes };
  },
  computed: {
    guessedTagName(): string {
      if (this.href !== undefined) {
        return 'a';
      }

      return this.tagName;
    },
    routerLinkComponentAvailable(): boolean {
      const { components } = this.$options;
      if (components === undefined) {
        return false;
      }

      return components.RouterLink !== undefined || components.NuxtLink !== undefined;
    },
  },
});
</script>
