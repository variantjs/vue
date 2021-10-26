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
import useConfiguration from '../use/useConfiguration';
import useVModel from '../use/useVModel';
import { getVariantProps } from '../utils/getVariantProps';
import { getGlobalComponentOptions } from '../utils/getGlobalComponentOptions';

// @vue/component
export default defineComponent({
  ...getGlobalComponentOptions(),
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

    return { localValue: localValue as any, configuration, attributes };
  },
});

</script>
