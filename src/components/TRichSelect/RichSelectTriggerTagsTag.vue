<template>
  <span
    type="button"
    class="bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 duration-100 ease-in-out focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded shadow-sm text-sm text-white transition white-space-no m-0.5 max-w-full h-8 flex items-center cursor-pointer "
    tabindex="0"
    data-rich-select-focusable
    @mousedown.prevent.stop="focus"
    @keydown.backspace.prevent.stop="unselect"
  >
    <span
      class="px-3"
      v-text="option.text"
    />

    <button
      type="button"
      tabindex="0"
      class="-ml-1.5 h-full hover:bg-blue-600 hover:shadow-sm inline-flex items-center px-2 transition focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-r"
      data-rich-select-focusable
    >
      <close-icon
        ref="closeIcon"
        class="w-3 h-3"
      />
    </button>
  </span>
</template>

<script lang="ts">

import { NormalizedOption } from '@variantjs/core';
import { defineComponent, inject, PropType } from 'vue';
import CloseIcon from '../../icons/CloseIcon.vue';

export default defineComponent({
  name: 'RichSelectTriggerTagsTag',
  components: {
    CloseIcon,
  },
  props: {
    option: {
      type: Object as PropType<NormalizedOption>,
      required: true,
    },
  },
  setup() {
    const toggleOption = inject<(option: NormalizedOption) => void>('toggleOption')!;

    return { toggleOption };
  },
  methods: {
    blurHandler() {
      console.log('blurHandler');
    },
    focus() {
      this.$el.focus();
    },
    unselect() {
      this.toggleOption(this.option);
    },
  },
});
</script>
