<template>
  <input
    v-model="localValue"
    v-bind="attributes"
  >
</template>

<script lang="ts">
import { CSSClass, TInputTheme } from '@variantjs/core';
import { PropType } from 'vue';
import { TInputValue, TInputProps, TInputOptions } from '../types';
import defineVariantComponent from '../utils/defineVariantComponent';

const TInput = defineVariantComponent<
TInputOptions,
TInputProps,
{
  test:() => string | undefined,
  test2: () => string | number,
  localValue: {
    get: () => TInputValue,
    set: (value: TInputValue) => void,
  }
},
{
  test4: () => CSSClass,
}
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
        test(): string | undefined {
          return this.variant;
        },
        test2(): string | number {
          return 1;
        },
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

export default TInput;
</script>
