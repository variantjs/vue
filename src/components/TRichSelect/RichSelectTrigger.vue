<template>
  <text-placeholder
    v-if="selectedOption === undefined"
    ref="placeholder"
    class-property="selectButtonPlaceholder"
    :placeholder="configuration.placeholder"
  />

  <span
    v-else
    class="block truncate"
  >{{ selectedOption.text }}</span>

  <selector-icon class="flex-shrink-0 w-4 h-4 ml-1 text-gray-600" />
</template>

<script lang="ts">
import { ComputedRef, defineComponent, inject } from 'vue';
import { NormalizedOption } from '@variantjs/core';
import TextPlaceholder from '../misc/TextPlaceholder.vue';
import SelectorIcon from '../../icons/SelectorIcon.vue';
import { TRichSelectOptions } from '../../types';
import { useProvidesConfiguration } from '../../use';

export default defineComponent({
  name: 'RichSelectTrigger',
  components: {
    TextPlaceholder,
    SelectorIcon,
  },
  setup() {
    const configuration = useProvidesConfiguration<TRichSelectOptions>();

    const selectedOption = inject<ComputedRef<NormalizedOption | undefined>>('selectedOption');

    return { selectedOption, configuration };
  },
});
</script>
