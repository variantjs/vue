<template>
  <div
    v-if="fetchingOptions"
    class="px-2 text-sm text-gray-400"
  >
    Searching...
  </div>
  <div
    v-else-if="needsMoreCharsToFetch"
    class="px-2 text-sm text-gray-400"
    v-text="needsMoreCharsMessage"
  />
</template>

<script lang="ts">
import {
  ComputedRef, defineComponent, inject, Ref,
} from 'vue';

export default defineComponent({
  name: 'RichSelectState',
  setup() {
    const fetchingOptions = inject<Ref<boolean>>('fetchingOptions')!;
    const needsMoreCharsToFetch = inject<Ref<boolean>>('needsMoreCharsToFetch')!;
    const needsMoreCharsMessage = inject<ComputedRef<string>>('needsMoreCharsMessage')!;

    return {
      fetchingOptions,
      needsMoreCharsToFetch,
      needsMoreCharsMessage,
    };
  },
});
</script>
