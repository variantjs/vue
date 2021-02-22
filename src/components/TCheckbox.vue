<template>
  <input
    v-model="localValue"
    type="checkbox"
    :class="variantConfiguration.class"
  >
</template>

<script lang="ts">
import { WithVariantProps, TCheckboxTheme } from '@variantjs/core';
import { PropType } from 'vue';
import defineVariantComponent from '../utils/defineVariantComponent';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TCheckboxValue = string | number | boolean | undefined | null | Date | Function | symbol | TCheckboxValue[];

export type TCheckboxProps = WithVariantProps<{
  modelValue: TCheckboxValue
}>;

// @vue/component
export default defineVariantComponent('TCheckbox', {
  props: {
    modelValue: {
      type: [String, Number] as PropType<TCheckboxValue>,
      default: undefined,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (_: TCheckboxValue) => true,
  },
  computed: {
    localValue: {
      get(): TCheckboxValue {
        return this.modelValue;
      },
      set(value: TCheckboxValue) {
        this.$emit('update:modelValue', value);
      },
    },
  },
}, TCheckboxTheme);

</script>
