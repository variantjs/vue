<template>
  <input
    v-model="localValue"
    v-bind="attributes"
  >
</template>

<script lang="ts">
import { CSSClass, TInputTheme } from '@variantjs/core';
import { PropType } from 'vue';
import {
  TInputValue, TInputProps, TInputOptions, TInputComputedAttributes, TInputMethods,
} from '../types';
import defineVariantComponent from '../utils/defineVariantComponent';

const TInput = defineVariantComponent<
TInputOptions,
TInputProps,
TInputComputedAttributes,
TInputMethods
>('TInput', {
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
  methods: {
    test4(): CSSClass {
      return this.fixedClasses;
    },
  },
  computed: {
    localValue: {
      get(): TInputValue {
        const { test4 } = this;
        const { fixedClasses } = this;
        const { configuration } = this;
        const { localValue } = this;
        return this.modelValue;
      },
      set(value: TInputValue) {
        this.$emit('update:modelValue', value);
      },
    },
  },
}, TInputTheme);

export default TInput;
</script>
