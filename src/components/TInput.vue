<template>
  <input
    v-model="localValue"
    :class="class"
  >
</template>

<script lang="ts">
import {
  WithVariantProps, TInput as componentDefaultConfiguration, ObjectWithClassName,
} from '@variantjs/core';
import { PropType, defineComponent, inject } from 'vue';
import defineVariantComponent, { setup, mixin } from '../utils/defineVariantComponent';

const COMPONENT_NAME = 'TInput';

export type TInputValue = string | number | undefined | null;

export type TInputProps = WithVariantProps<{
  modelValue: TInputValue,
}>;

export default defineVariantComponent(COMPONENT_NAME, {
  props: {
    modelValue: {
      type: [String, Number] as PropType<TInputValue>,
      default: undefined,
    },
    test: {
      type: [String, Number] as PropType<TInputValue>,
      default: 'xxx',
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (_: TInputValue) => true,
  },
  setup: (props, ctx) => setup(COMPONENT_NAME, props, ctx, componentDefaultConfiguration as ObjectWithClassName),
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
}, componentDefaultConfiguration);

</script>
