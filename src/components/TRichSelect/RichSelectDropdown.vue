<template>
  <div>
    <div class="inline-block w-full p-2 placeholder-gray-400">
      <input
        ref="search"
        placeholder="Search..."
        class="inline-block w-full px-3 py-2 text-sm border border-gray-300 rounded bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
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
  ComputedRef, defineComponent, inject, nextTick, watch, ref,
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
    const search = ref<HTMLInputElement>();

    const classesList = useProvidesClassesList<typeof TRichSelectConfig.classes>();

    const options = inject<ComputedRef<NormalizedOptions>>('options');

    const shown = inject<ComputedRef<boolean>>('shown', false);

    watch(shown, async (isShown: boolean) : Promise<void> => {
      await nextTick();

      if (isShown) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        search.value!.focus();
      }
    });

    return {
      classesList, options, shown, search,
    };
  },
});
</script>
