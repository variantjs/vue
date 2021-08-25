<template>
  <ul
    class="px-2 pb-2 "
    :style="usesMaxHeight? `max-height: ${maxHeight}; overflow-x: auto;` : undefined"
  >
    <rich-select-option
      v-for="(option, index) in options"
      :key="`${deep > 0 ? `${deep}-` : ''}${JSON.stringify(option.value)}-${index}`"
      :option="option"
      :deep="deep"
    />

    <li
      v-if="fetchingMoreOptions"
      ref="fetchingMoreOptions"
      key="loading_more"
      class="flex items-center justify-between px-3 py-2 text-gray-400"
      v-text="configuration.loadingMoreResultsText"
    />
  </ul>
</template>

<script lang="ts">
import {
  computed,
  Ref,
  ComputedRef, defineComponent, inject, PropType,
} from 'vue';
import { debounce, NormalizedOptions, normalizeMeasure } from '@variantjs/core';
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
    const configuration = inject<ComputedRef<TRichSelectOptions>>('configuration')!;
    const shown = inject<Ref<boolean>>('shown');
    const maxHeight = computed(() => normalizeMeasure(configuration.value.maxHeight));
    const usesMaxHeight = computed((): boolean => props.deep === 0 && maxHeight.value !== undefined);
    const fetchingMoreOptions = inject<Ref<boolean>>('fetchingMoreOptions')!;
    const dropdownBottomReachedHandler = inject<(() => void)>('dropdownBottomReachedHandler')!;

    const bottomReachedObserver = debounce(([event]: [Event]) => {
      const element = event.target as HTMLUListElement;
      const reached: boolean = Math.ceil(element.scrollHeight - element.scrollTop) === element.clientHeight;

      if (reached) {
        dropdownBottomReachedHandler();
      }
    });

    return {
      maxHeight, usesMaxHeight, shown, bottomReachedObserver, fetchingMoreOptions, configuration,
    };
  },
  watch: {
    async fetchingMoreOptions(fetchingMoreOptions: boolean) {
      if (fetchingMoreOptions) {
        await this.$nextTick();
        const el = this.$refs.fetchingMoreOptions as HTMLLIElement;
        el.scrollIntoView({ block: 'end', behavior: 'smooth' });
      }
    },
  },
  mounted() {
    this.$el.addEventListener('scroll', this.bottomReachedObserver);
  },
  beforeUnmount() {
    this.$el.removeEventListener('scroll', this.bottomReachedObserver);
  },

});
</script>
