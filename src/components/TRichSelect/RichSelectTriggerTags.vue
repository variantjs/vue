<template>
  <div
    class="flex flex-wrap overflow-hidden -mx-2 -my-2.5 py-1 pr-8"
  >
    <rich-select-trigger-tags-tag
      v-for="(option, index) in selectedOptions"
      :key="`${option.value}-${index}`"
      :option="option"
    />
  </div>
</template>

<script lang="ts">
import { NormalizedOption } from '@variantjs/core';
import { ComputedRef, defineComponent, inject } from 'vue';
import RichSelectTriggerTagsTag from './RichSelectTriggerTagsTag.vue';

export default defineComponent({
  name: 'RichSelectTriggerTags',
  components: {
    RichSelectTriggerTagsTag,
  },
  setup() {
    const selectedOptions = inject<ComputedRef<NormalizedOption[]>>('selectedOption')!;

    return {
      selectedOptions,
    };
  },
});
</script>
