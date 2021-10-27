<template>
  <input
    v-model="localValue"
    type="checkbox"
    v-bind="attributes"
  >
</template>

<script lang="ts">
import { TCheckboxConfig } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { TCheckboxOptions, TCheckboxValue } from '../types';
import { getVariantProps } from '../utils/getVariantProps';
import useConfiguration from '../use/useConfiguration';
import useVModel from '../use/useVModel';

// @vue/component
export default defineComponent({
  name: 'TCheckbox',
  compatConfig: {
    MODE: 3,
  },
  props: {
    ...getVariantProps<TCheckboxOptions>(),
    modelValue: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<TCheckboxValue>,
      default: undefined,
    },
  },
  setup(props) {
    const localValue = useVModel(props, 'modelValue');

    const { attributes } = useConfiguration<TCheckboxOptions>(TCheckboxConfig);

    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      localValue: localValue as any,
      attributes,
    };
  },
});

</script>
