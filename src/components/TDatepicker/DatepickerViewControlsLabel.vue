<template>
  <div class="inline-flex items-center py-1 space-x-1">
    <template v-if="isMonthView || isYearView">
      <span
        v-if="isMonthView"
        class=""
        v-text="monthName"
      />

      <span
        class="text-gray-500"
        v-text="year"
      />

      <svg
        v-if="control"
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
        v-if="control"
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
import { ComputedRef, defineComponent, inject, Ref, computed } from 'vue';
import { TDatepickerView } from '../../types/components/t-datepicker';

export default defineComponent({
  name: 'DatepickerViewControlsLabel',
  props: {
    control: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const activeDate = inject<Ref<Date>>('activeDate')!;
    const formatDate = inject<ComputedRef<DateFormatter>>('formatDate')!;
    const currentView = inject<Ref<TDatepickerView>>('currentView')!;

    const monthName = computed<string>(() => formatDate.value(activeDate.value, 'F')) ;
    const year = computed<string>(() => formatDate.value(activeDate.value, 'Y')) ;

    const isMonthView = computed<boolean>(() => currentView.value === TDatepickerView.Day);
    const isYearView = computed<boolean>(() => currentView.value === TDatepickerView.Month);
    
    const yearsRange = computed<[number, number]>(() => {
      const currentYear = activeDate.value.getFullYear();
      const from = currentYear - (currentYear % 12);
      const to = from + 11;
      return [from, to];
    });

    return { monthName, year, isMonthView, isYearView, yearsRange };
  },
});
</script>
