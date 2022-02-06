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
import { range, clone } from '@variantjs/core';
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

    const months: Date[] = range(0, 11).map((monthIndex) => {
      const month = clone(activeDate.value);
      month.setMonth(monthIndex);
      return month;
    });

    return { months };
  },
});
</script>
