<template>
  <input
    v-model="localValue"
    type="checkbox"
  >
</template>

<script lang="ts">
import { TCheckboxTheme } from '@variantjs/core';
import { PropType } from 'vue';
import defineVariantComponent from '../utils/defineVariantComponent';
import { TCheckboxValue } from '../types';

// @vue/component
export default defineVariantComponent('TCheckbox', {
  props: {
    modelValue: {
      type: [String, Number, Array, Object] as PropType<TCheckboxValue>,
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
