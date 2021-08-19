<template>
  <text-placeholder
    v-if="isFetchingOptionsWhileClosed"
    ref="fetchingPlaceholder"
    class-property="selectButtonSearchingPlaceholder"
    placeholder="Loading..."
  />

  <text-placeholder
    v-else-if="! hasOptionSelected"
    ref="placeholder"
    class-property="selectButtonPlaceholder"
    :placeholder="isFetchingOptionsWhileClosed ? 'Loading...' : configuration.placeholder"
  />

  <span
    v-else
    class="block truncate"
  >{{ selectedOption.text }}</span>

  <loading-icon
    v-if="isFetchingOptionsWhileClosed"
    class="flex-shrink-0 w-4 h-4 ml-1 text-gray-600"
  />
  <selector-icon
    v-else-if="showSelectorIcon"
    class="flex-shrink-0 w-4 h-4 ml-1 text-gray-600"
  />
</template>

<script lang="ts">
import {
  ComputedRef, defineComponent, inject, Ref,
} from 'vue';
import { NormalizedOption } from '@variantjs/core';
import TextPlaceholder from '../misc/TextPlaceholder.vue';
import SelectorIcon from '../../icons/SelectorIcon.vue';
import LoadingIcon from '../../icons/LoadingIcon.vue';
import { TRichSelectOptions } from '../../types';
import { useInjectsConfiguration } from '../../use';

export default defineComponent({
  name: 'RichSelectTrigger',
  components: {
    TextPlaceholder,
    SelectorIcon,
    LoadingIcon,
  },
  setup() {
    const configuration = useInjectsConfiguration<TRichSelectOptions>();

    const selectedOption = inject<ComputedRef<NormalizedOption | undefined>>('selectedOption')!;

    const fetchingOptions = inject<Ref<boolean>>('fetchingOptions')!;

    const shown = inject<ComputedRef<boolean>>('shown')!;

    return {
      selectedOption,
      configuration,
      fetchingOptions,
      shown,
    };
  },
  computed: {
    isFetchingOptionsWhileClosed(): boolean {
      return this.fetchingOptions && !this.shown;
    },
    hasOptionSelected(): boolean {
      return this.selectedOption !== undefined;
    },
    showSelectorIcon(): boolean {
      if (!this.configuration.clearable) {
        return true;
      }

      return this.hasOptionSelected === false;
    },
  },
});
</script>
