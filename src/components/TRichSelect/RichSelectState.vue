<template>
  <div
    v-if="fetchingOptions"
    class="px-2 text-sm text-gray-400"
    v-text="configuration.searchingText"
  />
  <div
    v-else-if="needsMoreCharsToFetch"
    class="px-2 text-sm text-gray-400"
    v-text="needsMoreCharsMessage"
  />
  <div
    v-else-if="noResults"
    class="px-2 text-sm text-gray-400"
    v-text="configuration.noResultsText"
  />
</template>

<script lang="ts">
import {
  computed,
  ComputedRef, defineComponent, inject, Ref,
} from 'vue';
import { TRichSelectOptions } from '../../types';
import { useInjectsConfiguration } from '../../use';

export default defineComponent({
  name: 'RichSelectState',
  setup() {
    const options = inject<ComputedRef<TRichSelectOptions>>('options')!;
    const fetchingOptions = inject<Ref<boolean>>('fetchingOptions')!;
    const needsMoreCharsToFetch = inject<Ref<boolean>>('needsMoreCharsToFetch')!;
    const needsMoreCharsMessage = inject<ComputedRef<string>>('needsMoreCharsMessage')!;
    const configuration = useInjectsConfiguration<TRichSelectOptions>();
    const noResults = computed<boolean>((): boolean => options.value.length === 0);

    return {
      noResults,
      configuration,
      fetchingOptions,
      needsMoreCharsToFetch,
      needsMoreCharsMessage,
    };
  },
});
</script>
