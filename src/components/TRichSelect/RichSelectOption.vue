<template>
  <li
    v-if="hasChildren"
    role="optgroup"
    :class="classesList.optgroup"
  >
    <div :class="classesList.optgroupContent">
      <span :class="classesList.optgroupLabel">{{ option.text }}</span>

      <rich-select-options-list
        ref="childrenOptions"
        :class="classesList.optgroupOptionsList"
        :options="option.children"
        :deep="deep + 1"
      />
    </div>
  </li>
  <li
    v-else
    :class="classesList.optionWrapper"
  >
    <button
      role="option"
      :class="optionClasses"
      :aria-selected="isSelected"
      tabindex="-1"
      type="button"
      :disabled="isDisabled"
      :value="valueAttribute"
      @mousemove="mousemoveHandler"
      @mousewheel="mousewheelHandler"
      @click="clickHandler"
    >
      <div :class="classesList.optionContent">
        <span :class="classesList.optionLabel">
          {{ option.text }}
        </span>

        <checkmark-icon
          v-if="isSelected"
          ref="checkIcon"
          :class="classesList.optionSelectedIcon"
        />
      </div>
    </button>
  </li>
</template>

<script lang="ts">
import {
  defineComponent, inject, PropType, Ref,
} from 'vue';
import { CSSClass, NormalizedOption } from '@variantjs/core';
import RichSelectOptionsList from './RichSelectOptionsList.vue';
import CheckmarkIcon from '../../icons/CheckmarkIcon.vue';
import { useInjectsClassesList } from '../../use';

export default defineComponent({
  name: 'RichSelectOption',
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
    const toggleOption = inject<(option: NormalizedOption) => void>('toggleOption')!;
    const setActiveOption = inject<(option: NormalizedOption) => void>('setActiveOption')!;
    const optionIsSelected = inject<(option: NormalizedOption) => boolean>('optionIsSelected')!;
    const optionIsActive = inject<(option: NormalizedOption) => boolean>('optionIsActive')!;
    const shown = inject<Ref<boolean>>('shown');
    const classesList = useInjectsClassesList()!;

    return {
      setActiveOption,
      toggleOption,
      optionIsSelected,
      optionIsActive,
      shown,
      classesList,
    };
  },
  computed: {
    optionClasses(): CSSClass[] {
      const classes: CSSClass[] = [this.classesList!.option];

      // Selected
      if (this.isSelected) {
        if (this.isActive) {
          classes.push(this.classesList!.selectedHighlightedOption);
        } else {
          classes.push(this.classesList!.selectedOption);
        }
      // Not selected
      } else if (this.isActive) {
        classes.push(this.classesList!.highlightedOption);
      }

      return classes;
    },
    valueAttribute(): string {
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
    isDisabled(): boolean {
      return this.option.disabled === true || this.option.disabled === 'disabled';
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
    this.$options.components = {
      RichSelectOptionsList,
      CheckmarkIcon,
    };
  },
  methods: {
    scrollIntoViewIfNeccesary(): void {
      if (this.shown && this.isActive) {
        const li = this.$el as HTMLLIElement;
        li.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    },
    mousemoveHandler(): void {
      if (this.isDisabled) {
        return;
      }
      this.setActiveOption(this.option);
    },
    mousewheelHandler(): void {
      if (this.isDisabled) {
        return;
      }
      this.setActiveOption(this.option);
    },
    clickHandler(): void {
      if (this.isDisabled) {
        return;
      }
      this.toggleOption(this.option);
    },
  },
});
</script>
