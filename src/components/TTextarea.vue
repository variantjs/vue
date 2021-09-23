<template>
  <textarea
    v-model="localValue"
    v-bind="attributes"
  />
</template>

<script lang="ts">
import { TTextareaConfig } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { TTextareaOptions, TTextareaValue } from '../types';
import { getVariantProps } from '../utils/getVariantProps';
import useVModel from '../use/useVModel';
import useConfiguration from '../use/useConfiguration';

export default defineComponent({
  name: 'TTextarea',
  props: {
    ...getVariantProps<TTextareaOptions>(),
    modelValue: {
      type: [String, Number] as PropType<TTextareaValue>,
      default: undefined,
    },
  },
  setup(props) {
    const localValue = useVModel(props, 'modelValue');
    const { configuration, attributes } = useConfiguration<TTextareaOptions>(TTextareaConfig);

    return { localValue, configuration, attributes };
  },
});
</script>
