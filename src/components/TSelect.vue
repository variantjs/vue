<template>
  <select
    v-model="localValue"
    v-bind="attributes"
    :multiple="multiple"
  >
    <t-select-option
      v-for="(option, index) in normalizedOptions"
      :key="`${option.value}-${index}`"
      :option="option"
    />
  </select>
</template>

<script lang="ts">
import { InputOptions, TSelectTheme } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import getVariantProps from '../utils/getVariantProps';
import { Truthy, TSelectOptions, TSelectValue } from '../types';
import {
  useMulipleableVModel, useConfiguration, useAttributes, useMultioptions,
} from '../use';
import TSelectOption from './TSelect/TSelectOption.vue';

// @vue/component
export default defineComponent({
  name: 'TSelect',
  components: {
    TSelectOption,
  },
  props: {
    ...getVariantProps<TSelectOptions>(),
    modelValue: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<TSelectValue>,
      default: undefined,
    },
    options: {
      type: [Array, Object] as PropType<InputOptions>,
      default: undefined,
    },
    multiple: {
      type: [String, Boolean] as PropType<Truthy>,
      default: false,
    },
  },
  setup(props) {
    const localValue = useMulipleableVModel(props, 'modelValue');
    const configuration = useConfiguration<TSelectOptions>(TSelectTheme);
    const attributes = useAttributes<TSelectOptions>(TSelectTheme);
    const normalizedOptions = useMultioptions(props, 'options');

    return {
      localValue, configuration, attributes, normalizedOptions,
    };
  },
});
</script>
