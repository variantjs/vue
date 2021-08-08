<template>
  <ul
    class="px-2 pb-2 "
    :style="deep === 0 ? 'max-height: 200px; overflow-x: auto;' : undefined"
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
import { defineComponent, PropType } from 'vue';
import { NormalizedOptions } from '@variantjs/core';
import RichSelectOption from './RichSelectOption.vue';

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
});
</script>
