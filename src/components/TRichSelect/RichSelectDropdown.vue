<template>
  <div :class="className">
    <rich-select-search-input
      v-if="showSearchInput"
      ref="searchInput"
    />

    <slot name="dropdownTop" />

    <rich-select-state ref="state">
      <template #stateFeedback="props">
        <slot
          name="stateFeedback"
          v-bind="props"
        />
      </template>
    </rich-select-state>

    <rich-select-options-list
      ref="optionsList"
      :options="options"
    >
      <template
        v-for="slotName in ['option', 'optionLabel', 'optionIcon']"
        #[slotName]="props"
      >
        <slot
          :name="slotName"
          v-bind="props"
        />
      </template>
    </rich-select-options-list>

    <slot name="dropdownButton" />
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
