<template>
  <textarea
    v-if="usesVModel"
    v-model="localValue"
    v-bind="attributes"
  />
  <textarea
    v-else
    v-bind="attributes"
  />
</template>

<script lang="ts">
import { TTextareaConfig } from '@variantjs/core';
import { defineComponent, PropType, getCurrentInstance } from 'vue';
import { TTextareaOptions, TTextareaValue } from '../types';
import { getVariantProps } from '../utils/getVariantProps';
import useVModel from '../use/useVModel';
import useConfiguration from '../use/useConfiguration';

export default defineComponent({
  name: 'TTextarea',
  props: {
    ...getVariantProps<TTextareaOptions>(),
    modelValue: {
      type: [String, Number] as PropType<TTextareaValue>,
      default: undefined,
    },
  },
  setup(props) {
    const vm = getCurrentInstance();

    const definedProps = vm?.vnode.props;

    const usesVModel = definedProps && definedProps.modelValue !== undefined;

    const localValue = useVModel(props, 'modelValue');
    const { configuration, attributes } = useConfiguration<TTextareaOptions>(TTextareaConfig);

    return {
      usesVModel, localValue, configuration, attributes,
    };
  },
});
</script>
