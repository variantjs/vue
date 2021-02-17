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

export type TCheckboxValue = string | number | undefined | null;

export type TCheckboxProps = WithVariantProps<{
  modelValue: TCheckboxValue
}>;

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
