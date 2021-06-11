<template>
  <input
    v-model="localValue"
    v-bind="attributes"
  >
</template>

<script lang="ts">
import { TInputTheme } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
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
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (_: TInputValue) => true,
  },
  computed: {
    ...getComputed<TInputOptions>(TInputTheme, 'TInput'),
    localValue: {
      get(): TInputValue {
        return this.modelValue;
      },
      set(value: TInputValue) {
        this.$emit('update:modelValue', value);
      },
    },
  },
});
</script>
