<template>
  <div
    :class="className"
  >
    <rich-select-trigger-tags-tag
      v-for="(option, index) in selectedOptions"
      :key="`${option.value}-${index}`"
      :option="option"
    >
      <template
        v-for="slotName in ['tagCloseIcon', 'tagLabel']"
        #[slotName]="props"
      >
        <slot
          :name="slotName"
          v-bind="props"
        />
      </template>
    </rich-select-trigger-tags-tag>
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
