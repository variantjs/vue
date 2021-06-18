<template>
  <component
    :is="routerLinkTag"
    v-if="useRouterLink"
    :to="configuration.to"
    :replace="configuration.replace"
    :active-class="configuration.activeClass"
    :exact-active-class="configuration.exactActiveClass"
    :custom="configuration.custom"
    :aria-current-value="configuration.ariaCurrentValue"
    v-bind="attributes"
  >
    <slot />
  </component>
  <component
    :is="guessedTagName"
    v-else
    :href="configuration.href"
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
    // Handled attributes
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
      if (this.configuration.href !== undefined) {
        return 'a';
      }

      return this.tagName;
    },
    routerLinkComponentAvailable(): boolean {
      return this.routerLinkTag !== null;
    },
    useRouterLink(): boolean {
      return this.configuration.to !== undefined && this.routerLinkComponentAvailable;
    },
    routerLinkTag(): string | null {
      const { components } = this.$.appContext;

      if (components.RouterLink !== undefined) {
        return 'RouterLink';
      }

      if (components.NuxtLink !== undefined) {
        return 'NuxtLink';
      }

      return null;
    },
  },
});
</script>
