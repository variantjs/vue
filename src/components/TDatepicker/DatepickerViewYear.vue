<template>
  <div class="px-3 py-2">
    <div class="grid grid-cols-4">
      <datepicker-view-year-month
        v-for="month in months"
        :key="month.toISOString()"
        :month="month"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { range, addMonths } from '@variantjs/core';
import {
  defineComponent, inject, Ref,
} from 'vue';
import DatepickerViewYearMonth from './DatepickerViewYearMonth.vue';

export default defineComponent({
  name: 'DatepickerViewYear',
  components: {
    DatepickerViewYearMonth,
  },
  setup() {
    const activeDate = inject<Ref<Date>>('activeDate')!;

    // The `addMonths` function ensures it uses an equivalent month day in case
    // it have different days, for example: If the active date is `2019-01-31` 
    // (last day of january) the next month day will be `2019-02-28` (last day
    // of february).
    const months: Date[] = range(
      activeDate.value.getMonth() * -1,
      11 - activeDate.value.getMonth(),
    ).map((monthDiff) => addMonths(activeDate.value, monthDiff));

    return { months };
  },
});
</script>
