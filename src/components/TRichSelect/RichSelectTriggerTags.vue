<template>
  <div
    :class="className"
  >
    <rich-select-trigger-tags-tag
      v-for="(option, index) in selectedOptions"
      :key="`${option.value}-${index}`"
      :option="option"
    >
      <template #tagCloseIcon="props">
        <slot
          name="tagCloseIcon"
          v-bind="props"
        />
      </template>
      <template #tagLabel="props">
        <slot
          name="tagLabel"
          v-bind="props"
        />
      </template>
    </rich-select-trigger-tags-tag>
  </div>
</template>

<script lang="ts">
import { NormalizedOption } from '@variantjs/core';
import { ComputedRef, defineComponent, inject } from 'vue';
import RichSelectTriggerTagsTag from './RichSelectTriggerTagsTag.vue';
import useInjectsClassesListClass from '../../use/useInjectsClassesListClass';
import { getGlobalComponentOptions } from '../../utils/getGlobalComponentOptions';

export default defineComponent({
  ...getGlobalComponentOptions(),
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
