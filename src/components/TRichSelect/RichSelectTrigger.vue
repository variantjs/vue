<template>
  <text-placeholder
    v-if="! hasOptionSelected"
    ref="placeholder"
    class-property="selectButtonPlaceholder"
    :placeholder="configuration.placeholder"
  />

  <span
    v-else
    class="block truncate"
  >{{ selectedOption.text }}</span>

  <selector-icon
    v-if="showSelectorIcon"
    class="flex-shrink-0 w-4 h-4 ml-1 text-gray-600"
  />
</template>

<script lang="ts">
import { ComputedRef, defineComponent, inject } from 'vue';
import { NormalizedOption } from '@variantjs/core';
import TextPlaceholder from '../misc/TextPlaceholder.vue';
import SelectorIcon from '../../icons/SelectorIcon.vue';
import { TRichSelectOptions } from '../../types';
import { useInjectsConfiguration } from '../../use';

export default defineComponent({
  name: 'RichSelectTrigger',
  components: {
    TextPlaceholder,
    SelectorIcon,
  },
  setup() {
    const configuration = useInjectsConfiguration<TRichSelectOptions>();

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const selectedOption = inject<ComputedRef<NormalizedOption | undefined>>('selectedOption')!;

    return {
      selectedOption, configuration,
    };
  },
  computed: {
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
