<template>
  <div class="inline-flex items-center py-1 space-x-1">
    <template v-if="view === 'day' || view === 'month'">
      <span
        v-if="view === 'day'"
        class=""
        v-text="monthName"
      />

      <span
        class="text-gray-500"
        v-text="year"
      />

      <svg
        v-if="!hideControls"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="inline-flex w-6 h-6 text-gray-400"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5l7 7-7 7"
      /></svg>
    </template>

    <template v-else>
      <svg
        v-if="!hideControls"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="inline-flex w-6 h-6 text-gray-400"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      /></svg>
        
      <span
        class="text-gray-500"
        v-text="`${yearsRange[0]} - ${yearsRange[1]}`"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { DateFormatter } from '@variantjs/core';
import { ComputedRef, defineComponent, inject, computed, PropType } from 'vue';
import { TDatepickerView } from '../../types/components/t-datepicker';

export default defineComponent({
  name: 'DatepickerViewControlsLabel',
  props: {
    hideControls: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      required: true,
    },
    view: {
      type: String as PropType<TDatepickerView>,
      default: TDatepickerView.Day,
    },
  },
  setup(props) {
    const formatDate = inject<ComputedRef<DateFormatter>>('formatDate')!;
    
    const monthName = computed<string>(() => formatDate.value(props.date, 'F')) ;
    const year = computed<string>(() => formatDate.value(props.date, 'Y')) ;

    const yearsRange = computed<[number, number]>(() => {
      const currentYear = props.date.getFullYear();
      const from = currentYear - (currentYear % 12);
      const to = from + 11;
      return [from, to];
    });

    return { monthName, year, yearsRange };
  },
});
</script>
