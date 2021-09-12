<template>
  <div :class="className">
    <rich-select-search-input
      v-if="showSearchInput"
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
import { NormalizedOptions } from '@variantjs/core';
import RichSelectOptionsList from './RichSelectOptionsList.vue';
import RichSelectSearchInput from './RichSelectSearchInput.vue';
import RichSelectState from './RichSelectState.vue';
import { useInjectsClassesListClass } from '../../use';

export default defineComponent({
  name: 'RichSelectDropdown',
  components: {
    RichSelectOptionsList,
    RichSelectSearchInput,
    RichSelectState,
  },
  setup() {
    const options = inject<ComputedRef<NormalizedOptions>>('options')!;
    const showSearchInput = inject<ComputedRef<boolean>>('showSearchInput')!;
    const className = useInjectsClassesListClass('dropdownContent');

    return {
      options,
      showSearchInput,
      className,
    };
  },
});
</script>
