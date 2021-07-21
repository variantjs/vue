<template>
  <text-placeholder
    v-if="selectedOption === undefined"
    ref="placeholder"
    class-property="selectButtonPlaceholder"
  />

  <span
    v-else
    class="block truncate"
  >{{ selectedOption.text }}</span>

  <selector-icon class="flex-shrink-0 w-4 h-4 ml-1 text-gray-600" />
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { NormalizedOption, TRichSelectConfig } from '@variantjs/core';
import TextPlaceholder from '../misc/TextPlaceholder.vue';
import useProvidesClassesList from '../../use/useProvidesClassesList';
import SelectorIcon from '../../icons/SelectorIcon.vue';

export default defineComponent({
  name: 'RichSelectTrigger',
  components: {
    TextPlaceholder,
    SelectorIcon,
  },
  setup() {
    const classesList = useProvidesClassesList<typeof TRichSelectConfig.classes>();

    const selectedOption = inject<NormalizedOption | undefined>('selectedOption');

    return { classesList, selectedOption };
  },
});
</script>
