<template>
  <input
    v-model="localValue"
    v-bind="attributes"
    type="checkbox"
  >
</template>

<script lang="ts">
import { TCheckboxTheme } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { getComputed, getProps } from '../utils/defineVariantComponent';
import { TCheckboxOptions, TCheckboxValue } from '../types';

// @vue/component
export default defineComponent({
  name: 'TCheckbox',
  props: {
    ...getProps<TCheckboxOptions>(),
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
    ...getComputed(TCheckboxTheme, 'TCheckbox'),
    localValue: {
      get(): TCheckboxValue {
        return this.modelValue;
      },
      set(value: TCheckboxValue) {
        this.$emit('update:modelValue', value);
      },
    },
  },
});

</script>
