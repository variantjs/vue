<template>
  <component
    :is="configuration.tagName"
    v-bind="attributes"
  >
    <slot :configuration="configuration">
      {{ configuration.text }}
    </slot>
  </component>
</template>

<script lang="ts">
import { TTagConfig } from '@variantjs/core';
import { defineComponent } from 'vue';
import { TTagOptions } from '../types';
import { getVariantProps, useConfiguration } from '..';

// @vue/component
export default defineComponent({
  name: 'TTag',
  props: {
    ...getVariantProps<TTagOptions>(),
    tagName: {
      type: String,
      default: 'div',
    },
    text: {
      type: String,
      default: undefined,
    },
  },
  setup() {
    const { configuration, attributes } = useConfiguration<TTagOptions>(TTagConfig);

    return { configuration, attributes };
  },
});

</script>
