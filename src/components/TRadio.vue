<template>
  <input
    v-model="localValue"
    type="radio"
    v-bind="attributes"
  >
</template>

<script lang="ts">
import { TRadioTheme } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { TRadioOptions, TRadioValue } from '../types';
import getVariantProps from '../utils/getVariantProps';
import { useAttributes, useConfiguration, useVModel } from '../use';

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
    const configuration = useConfiguration<TRadioOptions>(TRadioTheme);
    const attributes = useAttributes<TRadioOptions>(configuration);

    return { localValue, configuration, attributes };
  },
});

</script>
