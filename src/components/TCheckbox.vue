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
import { useAttributes, useConfiguration, useVModel } from '../use';

// @vue/component
export default defineComponent({
  name: 'TCheckbox',
  props: {
    ...getVariantProps<TCheckboxOptions>(),
    modelValue: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<TCheckboxValue>,
      default: undefined,
    },
  },
  setup(props) {
    const localValue = useVModel(props, 'modelValue');
    const configuration = useConfiguration<TCheckboxOptions>(TCheckboxConfig);
    const attributes = useAttributes<TCheckboxOptions>(configuration);

    return { localValue, configuration, attributes };
  },
});

</script>
