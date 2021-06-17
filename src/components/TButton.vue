<template>
  <button
    v-bind="attributes"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { TButtonTheme } from '@variantjs/core';
import { defineComponent } from 'vue';
import { useConfiguration, useAttributes } from '../use';
import getVariantProps from '../utils/getVariantProps';
import { TButtonOptions } from '../types';

export default defineComponent({
  name: 'TButton',
  props: getVariantProps<TButtonOptions>(),
  setup() {
    const configuration = useConfiguration<TButtonOptions>(TButtonTheme);
    const attributes = useAttributes<TButtonOptions>(TButtonTheme);

    return { configuration, attributes };
  },
});
</script>
