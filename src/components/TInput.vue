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
import getProps from '../utils/getProps';
import { TInputValue, TInputOptions } from '../types';

export default defineComponent({
  name: 'TInput',
  props: {
    ...getProps<TInputOptions>(),
    modelValue: {
      type: [String, Number] as PropType<TInputValue>,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const localValue = useVModel(props, 'modelValue', emit);
    const configuration = useConfiguration<TInputOptions>(TInputTheme);
    const attributes = useAttributes<TInputOptions>(TInputTheme);
    return { localValue, configuration, attributes };
  },
});
</script>
