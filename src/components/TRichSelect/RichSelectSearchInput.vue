<template>
  <div class="inline-block w-full p-2 placeholder-gray-400">
    <input
      ref="search"
      placeholder="Search..."
      class="inline-block w-full px-3 py-2 text-sm border border-gray-300 rounded bg-gray-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
    >
  </div>
</template>

<script lang="ts">
import {
  ComputedRef, defineComponent, inject, nextTick, watch, ref, computed,
} from 'vue';

export default defineComponent({
  name: 'RichSelectSearchInput',
  setup() {
    const search = ref<HTMLInputElement>();

    const shown = inject<ComputedRef<boolean>>('shown', computed(() => false));

    watch(shown, async (isShown: boolean) : Promise<void> => {
      if (isShown) {
        await nextTick();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        search.value!.focus();
      }
    });

    return {
      shown, search,
    };
  },
});
</script>
