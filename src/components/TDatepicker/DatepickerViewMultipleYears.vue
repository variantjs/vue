<template>
  <div class="px-3 py-2">
    <div class="grid grid-cols-4">
      <datepicker-view-multiple-years-year
        v-for="year in years"
        :key="year.toISOString()"
        :year="year"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { range, clone } from '@variantjs/core';
import {
  defineComponent, inject, Ref, computed,
} from 'vue';
import DatepickerViewMultipleYearsYear from './DatepickerViewMultipleYearsYear.vue';

export default defineComponent({
  name: 'DatepickerViewMultipleYears',
  components: {
    DatepickerViewMultipleYearsYear,
  },
  setup() {
    const activeDate = inject<Ref<Date>>('activeDate')!;

    const years = computed<Date[]>(() => {
      const currentYear = activeDate.value.getFullYear();
      const from = currentYear - (currentYear % 12);
      const to = from + 11;

      return range(from, to).map((rangeYear) => {
        const year = clone(activeDate.value);
        year.setFullYear(rangeYear);
        return year;
      });
    });

    return { years };
  },
});
</script>
