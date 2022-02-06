<template>
  <div class="px-3 py-2">
    <div class="grid grid-cols-7">
      <span
        v-for="weekDay in weekDays"
        :key="weekDay"
        class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase"
        v-text="weekDay"
      />
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

import { DateFormatter, range, visibleDaysInMonthView } from '@variantjs/core';
import {
  defineComponent, inject, computed, ComputedRef,
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

    const formatDate = inject<ComputedRef<DateFormatter>>('formatDate')!;
    
    const weekStart = configuration.weekStart!;

    const days = computed<Date[]>(() => visibleDaysInMonthView(props.month, weekStart));

    const weekDays = range(0, 6).map((index) => {
      // 1900-01-01 is a Monday
      return formatDate.value(new Date(1900, 0, index), 'D');
    });

    return { days, configuration, weekDays };
  },
});
</script>
