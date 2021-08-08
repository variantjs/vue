<template>
  <ul
    class="px-2 pb-2 "
    :style="usesMaxHeight? `max-height: ${maxHeight}px; overflow-x: auto;` : undefined"
  >
    <rich-select-option
      v-for="(option, index) in options"
      :key="`${deep > 0 ? `${deep}-` : ''}${option.value}-${index}`"
      :option="option"
      :deep="deep"
    />
  </ul>
</template>

<script lang="ts">
import {
  computed,
  ComputedRef, defineComponent, inject, PropType, ref, toRef, toRefs,
} from 'vue';
import { NormalizedOptions } from '@variantjs/core';
import RichSelectOption from './RichSelectOption.vue';
import { TRichSelectOptions } from '../../types';

export default defineComponent({
  name: 'RichSelectOptionsList',
  components: {
    RichSelectOption,
  },

  props: {
    options: {
      type: Array as PropType<NormalizedOptions>,
      required: true,
    },
    deep: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const configuration = inject<ComputedRef<TRichSelectOptions>>('configuration')!;
    const maxHeight = computed(() => configuration.value.maxHeight);
    const usesMaxHeight = computed((): boolean => props.deep === 0 && maxHeight.value !== null && maxHeight.value !== undefined);

    return { maxHeight, usesMaxHeight };
  },
});
</script>
