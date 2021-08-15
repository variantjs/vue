<template>
  <input
    v-model="localValue"
    type="radio"
    v-bind="attributes"
  >
</template>

<script lang="ts">
import { TRadioConfig } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { TRadioOptions, TRadioValue } from '../types';
import { getVariantProps } from '../utils/getVariantProps';
import { useConfiguration, useVModel } from '../use';

// @vue/component
export default defineComponent({
  name: 'TRadio',
  props: {
    ...getVariantProps<TRadioOptions>(),
    modelValue: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<TRadioValue>,
      default: undefined,
    },
  },
  setup(props) {
    const localValue = useVModel(props, 'modelValue');
    const { configuration, attributes } = useConfiguration<TRadioOptions>(TRadioConfig);

    return { localValue, configuration, attributes };
  },
});

</script>
