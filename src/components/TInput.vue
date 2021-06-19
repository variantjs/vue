<template>
  <input
    v-model="localValue"
    v-bind="attributes"
  >
</template>

<script lang="ts">
import { TInputTheme } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { useVModel, useConfiguration, useAttributes } from '../use';
import getVariantProps from '../utils/getVariantProps';
import { TInputOptions, TInputValue } from '../types';

export default defineComponent({
  name: 'TInput',
  props: {
    ...getVariantProps<TInputOptions>(),
    modelValue: {
      type: [String, Number] as PropType<TInputValue>,
      default: undefined,
    },
  },
  setup(props) {
    const localValue = useVModel(props, 'modelValue');
    const configuration = useConfiguration<TInputOptions>(TInputTheme);
    const attributes = useAttributes<TInputOptions>(configuration);

    return { localValue, configuration, attributes };
  },
});
</script>
