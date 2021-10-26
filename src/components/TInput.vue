<template>
  <input
    v-if="usesVModel"
    v-model="localValue"
    v-bind="attributes"
  >
  <input
    v-else
    v-bind="attributes"
  >
</template>

<script lang="ts">
import { TInputConfig } from '@variantjs/core';
import { defineComponent, PropType, getCurrentInstance } from 'vue';
import { TInputOptions, TInputValue } from '../types/components/t-input';
import { getVariantProps } from '../utils/getVariantProps';
import useVModel from '../use/useVModel';
import useConfiguration from '../use/useConfiguration';
import { getGlobalComponentOptions } from '../utils/getGlobalComponentOptions';

export default defineComponent({
  ...getGlobalComponentOptions(),
  name: 'TInput',
  props: {
    ...getVariantProps<TInputOptions>(),
    modelValue: {
      type: [String, Number] as PropType<TInputValue>,
      default: undefined,
    },
  },
  setup(props) {
    const vm = getCurrentInstance();

    const definedProps = vm!.vnode.props;

    const usesVModel = definedProps && definedProps.modelValue !== undefined;

    const localValue = useVModel(props, 'modelValue');

    const { configuration, attributes } = useConfiguration<TInputOptions>(TInputConfig);

    return {
      localValue, configuration, attributes, usesVModel,
    };
  },
});
</script>
