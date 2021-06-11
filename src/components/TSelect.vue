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
import { getProps, getComputed } from '../utils/defineVariantComponent';
import { TSelectOptions, TSelectValue } from '../types';

// @vue/component
export default defineComponent({
  name: 'TSelect',
  props: {
    ...getProps<TSelectOptions>(),
    modelValue: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<TSelectValue>,
      default: undefined,
    },
    options: {
      type: [Array, Object] as PropType<InputOptions>,
      default: undefined,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (_: TSelectValue) => true,
  },
  computed: {
    ...getComputed<TSelectOptions>(TSelectTheme, 'TSelect'),
    localValue: {
      get(): TSelectValue {
        return this.modelValue;
      },
      set(value: TSelectValue) {
        this.$emit('update:modelValue', value);
      },
    },
    normalizedOptions(): NormalizedOptions {
      return this.options !== undefined ? normalizeOptions(this.options) : [];
    },
  },
});
</script>
