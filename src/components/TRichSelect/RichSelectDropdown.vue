<template>
  <div>
    <rich-select-search-input
      v-if="! configuration.hideSearchBox"
      ref="searchInput"
    />

    <rich-select-state ref="state" />

    <rich-select-options-list
      ref="optionsList"
      :options="options"
    />

    <!-- @TODO bottom -->
  </div>
</template>

<script lang="ts">
import {
  ComputedRef, defineComponent, inject,
} from 'vue';
import RichSelectOptionsList from './RichSelectOptionsList.vue';
import RichSelectSearchInput from './RichSelectSearchInput.vue';
import RichSelectState from './RichSelectState.vue';
import { TRichSelectOptions } from '../../types';
import { useInjectsConfiguration } from '../../use';

export default defineComponent({
  name: 'RichSelectDropdown',
  components: {
    RichSelectOptionsList,
    RichSelectSearchInput,
    RichSelectState,
  },
  setup() {
    const configuration = useInjectsConfiguration<TRichSelectOptions>();
    const options = inject<ComputedRef<TRichSelectOptions>>('options');

    return {
      options,
      configuration,
    };
  },
});
</script>
