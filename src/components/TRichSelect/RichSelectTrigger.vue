<template>
  <text-placeholder
    v-if="isFetchingOptionsWhileClosed"
    ref="fetchingPlaceholder"
    class-property="selectButtonSearchingPlaceholder"
    :placeholder="configuration.loadingClosedPlaceholder"
  />

  <text-placeholder
    v-else-if="! hasSelectedOption"
    ref="placeholder"
    class-property="selectButtonPlaceholder"
    :placeholder="configuration.placeholder"
  />

  <span
    v-else
    ref="label"
    class="block truncate pr-4"
  >{{ label }}</span>

  <loading-icon
    v-if="isFetchingOptionsWhileClosed"
    ref="loadingIcon"
    class="flex-shrink-0 w-4 h-4 ml-1 text-gray-600"
  />

  <selector-icon
    v-else-if="showSelectorIcon"
    ref="selectorIcon"
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

    const selectedOption = inject<ComputedRef<NormalizedOption | undefined | NormalizedOption[]>>('selectedOption')!;

    const hasSelectedOption = inject<ComputedRef<boolean>>('hasSelectedOption')!;

    const fetchingOptions = inject<Ref<boolean>>('fetchingOptions')!;

    const shown = inject<ComputedRef<boolean>>('shown')!;

    return {
      selectedOption,
      hasSelectedOption,
      configuration,
      fetchingOptions,
      shown,
    };
  },
  computed: {
    label(): string | undefined {
      if (!this.hasSelectedOption) {
        return undefined;
      }

      if (this.multiple) {
        return (this.selectedOption as NormalizedOption[])
          .map((o) => o.text).join(', ');
      }

      return String((this.selectedOption as NormalizedOption).text);
    },
    isFetchingOptionsWhileClosed(): boolean {
      return this.fetchingOptions && !this.shown;
    },
    multiple(): boolean {
      return Array.isArray(this.selectedOption);
    },
    showSelectorIcon(): boolean {
      if (!this.configuration.clearable) {
        return true;
      }

      return !this.hasSelectedOption;
    },
  },
});
</script>
