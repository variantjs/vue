<template>
  <div>
    <rich-select-search-input v-if="! configuration.hideSearchBox" />

    <ul>
      <rich-select-option
        v-for="(option, index) in options"
        :key="`${option.value}-${index}`"
        :option="option"
      />
    </ul>

    <div>
      <!-- bottom -->
    </div>
  </div>
</template>

<script lang="ts">
import {
  ComputedRef, defineComponent, inject,
} from 'vue';
import { NormalizedOptions } from '@variantjs/core';
import RichSelectOption from './RichSelectOption.vue';
import RichSelectSearchInput from './RichSelectSearchInput.vue';
import { TRichSelectOptions } from '../../types';
import { useProvidesConfiguration } from '../../use';

export default defineComponent({
  name: 'RichSelectDropdown',
  components: {
    RichSelectOption,
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
