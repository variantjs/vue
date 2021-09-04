<template>
  <div class="inline-block w-full p-2 placeholder-gray-400">
    <input
      ref="search"
      v-model="searchQuery"
      data-rich-select-focusable
      :placeholder="configuration.searchBoxPlaceholder"
      class="inline-block w-full px-3 py-2 text-sm border border-gray-300 rounded bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
      @keydown.down="keydownDownHandler"
      @keydown.up="keydownUpHandler"
      @keydown.enter="keydownEnterHandler"
      @keydown.esc="keydownEscHandler"
    >
  </div>
</template>

<script lang="ts">
import {
  ComputedRef, defineComponent, inject, watch, ref, Ref,
} from 'vue';
import { TRichSelectOptions } from '../../types';
import { useInjectsConfiguration } from '../../use';

export default defineComponent({
  name: 'RichSelectSearchInput',
  setup() {
    const search = ref<HTMLInputElement>();

    const shown = inject<ComputedRef<boolean>>('shown')!;
    const searchQuery = inject<Ref<string | undefined>>('searchQuery')!;
    const configuration = useInjectsConfiguration<TRichSelectOptions>();
    const keydownDownHandler = inject<(e: KeyboardEvent) => void>('keydownDownHandler');
    const keydownUpHandler = inject<(e: KeyboardEvent) => void>('keydownUpHandler');
    const keydownEnterHandler = inject<(e: KeyboardEvent) => void>('keydownEnterHandler');
    const keydownEscHandler = inject<(e: KeyboardEvent) => void>('keydownEscHandler');

    watch(shown, async (isShown: boolean) : Promise<void> => {
      if (isShown) {
        search.value!.focus();
      }
    });

    return {
      configuration,
      shown,
      search,
      searchQuery,
      keydownUpHandler,
      keydownDownHandler,
      keydownEnterHandler,
      keydownEscHandler,
    };
  },
});
</script>
