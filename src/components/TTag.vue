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
import useConfiguration from '../use/useConfiguration';
import { getVariantProps } from '../utils/getVariantProps';

// @vue/component
export default defineComponent({
  name: 'TTag',
  compatConfig: {
    MODE: 3,
  },
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
