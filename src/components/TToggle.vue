<template>
  <span
    role="checkbox"
    tabindex="0"
    aria-checked="true"
    class="relative inline-flex flex-shrink-0 transition-colors duration-200 ease-in-out bg-blue-500 border-2 border-transparent rounded-full cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
  >
    <input
      value="true"
      type="hidden"
    >
    <span
      aria-hidden="true"
      class="flex items-center justify-center w-5 h-5 text-xs text-gray-400 rounded-full"
    />
    <span
      aria-hidden="true"
      class="flex items-center justify-center w-5 h-5 text-xs text-gray-400 rounded-full"
    />
    <span
      aria-hidden="true"
      class="absolute flex items-center justify-center w-5 h-5 text-xs text-blue-500 transition duration-200 ease-in-out transform translate-x-full bg-white rounded-full shadow"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  TToggleConfig,
  TToggleClassesKeys,
  TToggleClassesValidKeys,
} from '@variantjs/core';
import useConfigurationWithClassesList from '../use/useConfigurationWithClassesList';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { TToggleOptions } from '../types/components/t-toggle';

// @vue/component
export default defineComponent({
  name: 'TToggle',
  props: {
    ...getVariantPropsWithClassesList<TToggleOptions, TToggleClassesValidKeys>(),

  },
  setup() {
    const { configuration, attributes } = useConfigurationWithClassesList<TToggleOptions>(TToggleConfig, TToggleClassesKeys);

    return {
      configuration,
      attributes,
    };
  },
});

</script>
