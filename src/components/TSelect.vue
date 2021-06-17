<template>
  <select
    v-model="localValue"
    v-bind="attributes"
    :multiple="multiple"
  >
    <template v-for="(option, index) in normalizedOptions">
      <template v-if="option.children && option.children.length">
        <optgroup
          :key="`${option.value}-${index}`"
          :label="option.text !== undefined ? String(option.text) : undefined"
        >
          <option
            v-for="(childrenOption, index2) in option.children"
            :key="`${childrenOption.value}-${index}-${index2}`"
            :value="childrenOption.value"
            v-text="childrenOption.text"
          />
        </optgroup>
      </template>
      <template v-else>
        <option
          :key="`${option.value}-${index}`"
          :value="option.value"
          v-text="option.text"
        />
      </template>
    </template>
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

// @vue/component
export default defineComponent({
  name: 'TSelect',
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
