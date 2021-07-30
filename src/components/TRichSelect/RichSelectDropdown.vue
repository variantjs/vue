<template>
  <div>
    <rich-select-search-input
      v-if="! configuration.hideSearchBox"
    />

    <rich-select-options-list :options="options" />

    <div>
      <!-- bottom -->
    </div>
  </div>
</template>

<script lang="ts">
import { ComputedRef, defineComponent, inject } from 'vue';
import { NormalizedOptions } from '@variantjs/core';
import RichSelectOptionsList from './RichSelectOptionsList.vue';
import RichSelectSearchInput from './RichSelectSearchInput.vue';
import { TRichSelectOptions } from '../../types';
import { useProvidesConfiguration } from '../../use';

export default defineComponent({
  name: 'RichSelectDropdown',
  components: {
    RichSelectOptionsList,
    RichSelectSearchInput,
  },
  setup() {
    const configuration = useProvidesConfiguration<TRichSelectOptions>();

    const options = inject<ComputedRef<NormalizedOptions>>('options');

    return {
      options, configuration,
    };
  },
});
</script>
