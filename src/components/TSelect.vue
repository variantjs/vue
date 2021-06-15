<template>
  <select
    v-model="localValue"
    v-bind="attributes"
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
import {
  TSelectTheme, normalizeOptions, NormalizedOptions, InputOptions,
} from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import getVariantProps from '../utils/getVariantProps';
import { TSelectOptions, TSelectValue } from '../types';
import { useVModel, useConfiguration, useAttributes } from '../use';

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
  },
  setup(props) {
    const localValue = useVModel(props, 'modelValue');
    const configuration = useConfiguration<TSelectOptions>(TSelectTheme);
    const attributes = useAttributes<TSelectOptions>(TSelectTheme);

    return { localValue, configuration, attributes };
  },
  computed: {
    normalizedOptions(): NormalizedOptions {
      return this.options !== undefined ? normalizeOptions(this.options) : [];
    },
  },
});
</script>
