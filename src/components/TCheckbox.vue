<template>
  <input
    v-model="localValue"
    type="checkbox"
    v-bind="attributes"
  >
</template>

<script lang="ts">
import { TCheckboxTheme } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { TCheckboxOptions, TCheckboxValue } from '../types';
import getVariantProps from '../utils/getVariantProps';
import { useAttributes, useConfiguration, useMulipleableVModel } from '../use';

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
    const localValue = useMulipleableVModel(props, 'modelValue');
    const configuration = useConfiguration<TCheckboxOptions>(TCheckboxTheme);
    const attributes = useAttributes<TCheckboxOptions>(TCheckboxTheme);

    return { localValue, configuration, attributes };
  },
});

</script>
