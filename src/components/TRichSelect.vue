<template>
  <div>placeholder</div>
</template>

<script lang="ts">
import { InputOptions, TRichSelectConfig, TRichSelectConfigKeys } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { useAttributes, useConfigurationWithClassesList } from '../use';
import { TRichSelectOptions, TSelectValue } from '../types';

// @vue/component
export default defineComponent({
  name: 'TRichSelect',
  props: {
    ...getVariantPropsWithClassesList<TRichSelectOptions, TRichSelectConfigKeys>(),
    modelValue: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<TSelectValue>,
      default: undefined,
    },
    options: {
      type: [Array, Object] as PropType<InputOptions>,
      default: undefined,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const configuration = useConfigurationWithClassesList<TRichSelectOptions>(TRichSelectConfig, ['wrapper', 'body', 'close', 'closeIcon', 'enterFromClass', 'enterActiveClass', 'enterToClass', 'leaveFromClass', 'leaveActiveClass', 'leaveToClass']);
    const attributes = useAttributes<TRichSelectOptions>(configuration);

    return { configuration, attributes };
  },
});

</script>
