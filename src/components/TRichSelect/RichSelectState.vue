<template>
  <slot
    name="stateFeedback"
    :fetching-options="fetchingOptions"
    :needs-more-chars-to-fetch="needsMoreCharsToFetch"
    :no-results="noResults"
  >
    <div
      v-if="fetchingOptions"
      :class="classesList.searchingText"
      v-text="configuration.searchingText"
    />
    <div
      v-else-if="needsMoreCharsToFetch"
      :class="classesList.needsMoreCharsText"
      v-text="needsMoreCharsMessage"
    />
    <div
      v-else-if="noResults"
      :class="classesList.noResultsText"
      v-text="configuration.noResultsText"
    />
  </slot>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef, defineComponent, inject, Ref,
} from 'vue';
import { TRichSelectOptions } from '../../types/components/t-rich-select';
import useInjectsClassesList from '../../use/useInjectsClassesList';
import useInjectsConfiguration from '../../use/useInjectsConfiguration';
import { getGlobalComponentOptions } from '../../utils/getGlobalComponentOptions';

export default defineComponent({
  ...getGlobalComponentOptions(),
  name: 'RichSelectState',
  setup() {
    const options = inject<ComputedRef<TRichSelectOptions>>('options')!;
    const fetchingOptions = inject<Ref<boolean>>('fetchingOptions')!;
    const needsMoreCharsToFetch = inject<Ref<boolean>>('needsMoreCharsToFetch')!;
    const needsMoreCharsMessage = inject<ComputedRef<string>>('needsMoreCharsMessage')!;
    const configuration = useInjectsConfiguration<TRichSelectOptions>();
    const noResults = computed<boolean>((): boolean => options.value.length === 0);
    const classesList = useInjectsClassesList()!;

    return {
      noResults,
      configuration,
      fetchingOptions,
      needsMoreCharsToFetch,
      needsMoreCharsMessage,
      classesList,
    };
  },
});
</script>
