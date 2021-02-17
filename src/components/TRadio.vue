<template>
  <input
    v-model="localValue"
    type="radio"
    :class="variantConfiguration.class"
  >
</template>

<script lang="ts">
import { WithVariantProps, TRadioTheme } from '@variantjs/core';
import { PropType } from 'vue';
import defineVariantComponent from '../utils/defineVariantComponent';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TRadioValue = string | number | boolean | undefined | null | Date | Function | symbol | TRadioValue[];

export type TRadioProps = WithVariantProps<{
  modelValue: TRadioValue
}>;

export default defineVariantComponent('TRadio', {
  props: {
    modelValue: {
      type: [String, Number] as PropType<TRadioValue>,
      default: undefined,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (_: TRadioValue) => true,
  },
  computed: {
    localValue: {
      get(): TRadioValue {
        return this.modelValue;
      },
      set(value: TRadioValue) {
        this.$emit('update:modelValue', value);
      },
    },
  },
}, TRadioTheme);

</script>
