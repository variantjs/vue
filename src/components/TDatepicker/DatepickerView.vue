<template>
  <div class="w-64">
    <datepicker-view-controls />

    <datepicker-view-month
      v-if="isMonthView"
      :month="month"
    />

    <datepicker-view-year v-else-if="isYearView" />

    <datepicker-view-month
      v-else-if="isMultipleYearsView"
      :month="month"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref } from 'vue';
import { TDatepickerView } from '../../types/components/t-datepicker';
import DatepickerViewControls from './DatepickerViewControls.vue';
import DatepickerViewMonth from './DatepickerViewMonth.vue';
import DatepickerViewYear from './DatepickerViewYear.vue';

export default defineComponent({
  name: 'DatepickerView',
  components: {
    DatepickerViewControls,
    DatepickerViewMonth,
    DatepickerViewYear,
  },
  props: {
    month: {
      type: Date,
      required: true,
    },
  },
  setup() {
    const currentView = inject<Ref<TDatepickerView>>('currentView')!;

    const isMonthView = computed<boolean>(() => currentView.value === TDatepickerView.Day);
    const isYearView = computed<boolean>(() => currentView.value === TDatepickerView.Month);
    const isMultipleYearsView = computed<boolean>(() => currentView.value === TDatepickerView.Year);

    return { isMonthView, isYearView, isMultipleYearsView };
  },
});
</script>
