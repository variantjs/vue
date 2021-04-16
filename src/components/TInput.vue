<template>
  <input
    v-model="localValue"
    v-bind="{
      class:variantConfiguration.class
    }"
  >
</template>

<script lang="ts">
import { TInputTheme } from '@variantjs/core';
import { PropType } from 'vue';
import { TInputValue } from '../types/props';
import defineVariantComponent from '../utils/defineVariantComponent';

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
