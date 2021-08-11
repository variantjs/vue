<template>
  <li
    v-if="hasChildren"
    role="optgroup"
  >
    <div>
      <span class="block px-3 py-2 text-sm text-gray-400 truncate">{{ option.text }}</span>
      <rich-select-options-list
        :options="option.children"
        :deep="deep + 1"
      />
    </div>
  </li>
  <li
    v-else
    :data-value="dataValueAttribute"
    role="option"
    :class="{
      'cursor-pointer  rounded-sm': true,
      'font-semibold text-white bg-blue-500': isSelected,
      'font-semibold text-white bg-blue-600': isActive && isSelected,
      'bg-blue-100': isActive && !isSelected,
    }"
    :aria-selected="isSelected"
    tabindex="-1"
    @mouseover="mouseoverHandler"
    @click="clickHandler"
  >
    <div class="flex items-center justify-between px-3 py-2">
      <span class="block truncate">
        {{ option.text }}
      </span>

      <checkmark-icon
        v-if="isSelected"
        ref="checkIcon"
        class="w-5 h-5"
      />
    </div>
  </li>
</template>

<script lang="ts">
import {
  defineComponent, inject, PropType, Ref,
} from 'vue';
import { NormalizedOption } from '@variantjs/core';
import RichSelectOptionsList from './RichSelectOptionsList.vue';
import CheckmarkIcon from '../../icons/CheckmarkIcon.vue';

export default defineComponent({
  name: 'RichSelectOption',
  components: {
    CheckmarkIcon,
  },
  props: {
    option: {
      type: [Object] as PropType<NormalizedOption>,
      required: true,
    },
    deep: {
      type: Number,
      default: 0,
    },
  },
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const toggleOption = inject<(option: NormalizedOption) => void>('toggleOption')!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const setActiveOption = inject<(option: NormalizedOption) => void>('setActiveOption')!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const optionIsSelected = inject<(option: NormalizedOption) => boolean>('optionIsSelected')!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const optionIsActive = inject<(option: NormalizedOption) => boolean>('optionIsActive')!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const shown = inject<Ref<boolean>>('shown');

    return {
      setActiveOption,
      toggleOption,
      optionIsSelected,
      optionIsActive,
      shown,
    };
  },
  computed: {
    dataValueAttribute(): string {
      if (typeof this.option.value === 'object') {
        return JSON.stringify(this.option.value);
      }

      return String(this.option.value);
    },
    hasChildren(): boolean {
      return this.option.children !== undefined && this.option.children.length > 0;
    },
    isSelected(): boolean {
      return this.optionIsSelected(this.option);
    },
    isActive(): boolean {
      return this.optionIsActive(this.option);
    },
  },
  watch: {
    shown: {
      async handler(): Promise<void> {
        await this.$nextTick();
        this.scrollIntoViewIfNeccesary();
      },
      immediate: true,
    },
    isActive(): void {
      this.scrollIntoViewIfNeccesary();
    },
  },
  beforeCreate() {
    (this.$ as unknown as any).components = { RichSelectOptionsList };
  },
  methods: {
    scrollIntoViewIfNeccesary(): void {
      if (this.shown && this.isActive) {
        const li = this.$el as HTMLLIElement;
        li.scrollIntoView({ block: 'nearest', behavior: 'auto' });
      }
    },
    mouseoverHandler(): void {
      this.setActiveOption(this.option);
    },
    clickHandler(): void {
      this.toggleOption(this.option);
    },
  },
});
</script>
