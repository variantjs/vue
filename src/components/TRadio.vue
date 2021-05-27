<template>
  <input
    v-model="localValue"
    type="radio"
  >
</template>

<script lang="ts">
import { TRadioTheme } from '@variantjs/core';
import { PropType } from 'vue';
import defineVariantComponent from '../utils/defineVariantComponent';
import { TRadioValue } from '../types';

// @vue/component
export default defineVariantComponent('TRadio', {
  props: {
    modelValue: {
      type: [String, Number, Array, Object] as PropType<TRadioValue>,
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
