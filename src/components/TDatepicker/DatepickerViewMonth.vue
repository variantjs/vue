<template>
  <div class="px-3 py-2">
    <div class="grid grid-cols-7 ">
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Sun</span>
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Mon</span>
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Tue</span>
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Wed</span>
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Thu</span>
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Fri</span>
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Sat</span>
    </div>
    <div class="grid grid-cols-7">
      <datepicker-view-month-day
        v-for="day in days"
        :key="day.toISOString()"
        :month="month"
        :day="day"
      />
    </div>
  </div>
</template>

<script lang="ts">

import { visibleDaysInMonthView } from '@variantjs/core';
import { config } from '@vue/test-utils';
import {
  defineComponent, inject, Ref, computed,
} from 'vue';
import { TDatepickerOptions } from '../../types/components/t-datepicker';
import DatepickerViewMonthDay from './DatepickerViewMonthDay.vue';

export default defineComponent({
  name: 'DatepickerViewMonth',
  components: {
    DatepickerViewMonthDay,
  },
  props: {
    month: {
      type: Date,
      required: true,
    },
  },
  setup(props) {
    const configuration = inject<TDatepickerOptions>('configuration')!;

    const weekStart = configuration.weekStart!;

    const days = computed<Date[]>(() => visibleDaysInMonthView(props.month, weekStart));

    return { days, configuration };
  },
});
</script>
