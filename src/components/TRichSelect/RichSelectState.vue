<template>
  <div
    v-if="fetchingOptions"
    class="px-2 text-sm text-gray-400"
  >
    Searching...
  </div>
  <div
    v-else-if="fetchsOptions && needsMoreCharsToFetch"
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
    const fetchsOptions = inject<Ref<boolean>>('fetchsOptions')!;
    const fetchingOptions = inject<Ref<boolean>>('fetchingOptions')!;
    const needsMoreCharsToFetch = inject<Ref<boolean>>('needsMoreCharsToFetch')!;
    const needsMoreCharsMessage = inject<ComputedRef<string>>('needsMoreCharsMessage')!;

    return {
      fetchsOptions,
      fetchingOptions,
      needsMoreCharsToFetch,
      needsMoreCharsMessage,
    };
  },
});
</script>
