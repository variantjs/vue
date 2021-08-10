<template>
  <div class="inline-block w-full p-2 placeholder-gray-400">
    <input
      ref="search"
      data-rich-select-search="true"
      placeholder="Search..."
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
  ComputedRef, defineComponent, inject, nextTick, watch, ref,
} from 'vue';

export default defineComponent({
  name: 'RichSelectSearchInput',
  setup() {
    const search = ref<HTMLInputElement>();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const shown = inject<ComputedRef<boolean>>('shown')!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const keydownDownHandler = inject<(e: KeyboardEvent) => void>('keydownDownHandler');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const keydownUpHandler = inject<(e: KeyboardEvent) => void>('keydownUpHandler');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const keydownEnterHandler = inject<(e: KeyboardEvent) => void>('keydownEnterHandler');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const keydownEscHandler = inject<(e: KeyboardEvent) => void>('keydownEscHandler');

    watch(shown, async (isShown: boolean) : Promise<void> => {
      if (isShown) {
        await nextTick();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        search.value!.focus();
      }
    });

    return {
      shown, search, keydownUpHandler, keydownDownHandler, keydownEnterHandler, keydownEscHandler,
    };
  },
});
</script>
