<template>
  <div
    :class="className"
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
import { useInjectsClassesListClass } from '../../use';
import RichSelectTriggerTagsTag from './RichSelectTriggerTagsTag.vue';

export default defineComponent({
  name: 'RichSelectTriggerTags',
  components: {
    RichSelectTriggerTagsTag,
  },
  setup() {
    const selectedOptions = inject<ComputedRef<NormalizedOption[]>>('selectedOption')!;
    const className = useInjectsClassesListClass('tagsWrapper')!;

    return {
      selectedOptions,
      className,
    };
  },
});
</script>
