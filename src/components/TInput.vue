<template>
  <input
    v-model="localValue"
    v-bind="{
      class:variantConfiguration.class
    }"
  >
</template>

<script lang="ts">
import { WithVariantProps, TInputTheme } from '@variantjs/core';
import { PropType } from 'vue';
import defineVariantComponent from '../utils/defineVariantComponent';

export type TInputValue = string | number | undefined | null;

export type TInputProps = WithVariantProps<{
  modelValue: TInputValue
}>;

// @vue/component
export default defineVariantComponent('TInput', {
  props: {
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
    localValue: {
      get(): TInputValue {
        return this.modelValue;
      },
      set(value: TInputValue) {
        this.$emit('update:modelValue', value);
      },
    },
  },
}, TInputTheme);

</script>
