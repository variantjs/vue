<template>
  <div>
    <div class="inline-block w-full p-2 placeholder-gray-400">
      <input
        placeholder="Search..."
        class="inline-block w-full px-3 py-2 text-sm border border-gray-300 rounded bg-gray-50 focus:outline-none focus:shadow-outline"
      >
    </div>

    <ul>
      <rich-select-option
        v-for="(option, index) in options"
        :key="`${option.value}-${index}`"
        :option="option"
      />
    </ul>

    <div>
      <!-- bottom -->
    </div>
  </div>
</template>

<script lang="ts">
import {
  ComputedRef, defineComponent, inject,
} from 'vue';
import { NormalizedOptions, TRichSelectConfig } from '@variantjs/core';
import useProvidesClassesList from '../../use/useProvidesClassesList';
import RichSelectOption from './RichSelectOption.vue';

export default defineComponent({
  name: 'RichSelectDropdown',
  components: {
    RichSelectOption,
  },
  setup() {
    const classesList = useProvidesClassesList<typeof TRichSelectConfig.classes>();

    const options = inject<ComputedRef<NormalizedOptions>>('options');

    return { classesList, options };
  },
});
</script>
