<template>
  <input
    v-model="localValue"
    v-bind="attributes"
  >
</template>

<script lang="ts">
import { TInputTheme } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { useVModel } from '../use';
import { getProps, getComputed } from '../utils/defineVariantComponent';
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
    return { localValue };
  },
  computed: getComputed<TInputOptions>(TInputTheme, 'TInput'),
});
</script>
