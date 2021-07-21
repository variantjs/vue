<template>
  <li
    :data-value="option.value"
    data-type="option"
    :class="{
      'cursor-pointer': true,
      'font-semibold text-white bg-blue-500': isSelected,
      'font-semibold text-white bg-blue-600': isActive && isSelected,
      'bg-blue-100': isActive && !isSelected,
    }"
    :aria-selected="isSelected"
    @mouseover="mouseoverHandler"
    @click="clickHandler"
  >
    <div class="flex items-center justify-between px-3 py-2">
      <span class="block truncate">{{ option.text }}</span>

      <svg
        v-if="isSelected"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        class="w-4 h-4 fill-current "
      ><polygon points="0 11 2 9 7 14 18 3 20 5 7 18" /></svg>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue';
import { NormalizedOption } from '@variantjs/core';

export default defineComponent({
  name: 'RichSelectOption',
  props: {
    option: {
      type: [Object] as PropType<NormalizedOption>,
      required: true,
    },
  },
  setup() {
    const toggleOption = inject<(option: NormalizedOption) => void>('toggleOption');
    const setActiveOption = inject<(option: NormalizedOption) => void>('setActiveOption');
    const optionIsSelected = inject<(option: NormalizedOption) => boolean>('optionIsSelected');
    const optionIsActive = inject<(option: NormalizedOption) => boolean>('optionIsActive');

    return {
      setActiveOption, toggleOption, optionIsSelected, optionIsActive,
    };
  },
  computed: {
    hasChildren(): boolean {
      return this.option.children !== undefined && this.option.children.length > 0;
    },
    isSelected(): boolean {
      return this.optionIsSelected!(this.option);
    },
    isActive(): boolean {
      return this.optionIsActive!(this.option);
    },
  },
  methods: {
    mouseoverHandler(): void {
      this.setActiveOption!(this.option);
    },
    clickHandler(): void {
      this.toggleOption!(this.option);
    },
  },
});
</script>
