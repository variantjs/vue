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
import { defineComponent } from 'vue';
import { useConfiguration, useAttributes } from '../use';
import getVariantProps from '../utils/getVariantProps';
import { TButtonOptions } from '../types';

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
  },
});
</script>
