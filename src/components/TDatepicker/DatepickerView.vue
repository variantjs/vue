<template>
  <div class="w-64">
    <datepicker-view-controls :show-controls="first" />

    <datepicker-view-month
      v-if="isMonthView"
      :month="month"
    />

    <datepicker-view-year v-else-if="isYearView" />

    <DatepickerViewMultipleYears v-else-if="isMultipleYearsView" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref } from 'vue';
import { TDatepickerView } from '../../types/components/t-datepicker';
import DatepickerViewControls from './DatepickerViewControls.vue';
import DatepickerViewMonth from './DatepickerViewMonth.vue';
import DatepickerViewYear from './DatepickerViewYear.vue';
import DatepickerViewMultipleYears from './DatepickerViewMultipleYears.vue';

export default defineComponent({
  name: 'DatepickerView',
  components: {
    DatepickerViewControls,
    DatepickerViewMonth,
    DatepickerViewYear,
    DatepickerViewMultipleYears,
  },
  props: {
    month: {
      type: Date,
      required: true,
    },
    first: {
      type: Boolean,
      required: true,
    },
  },
  setup(props) {
    const currentView = inject<Ref<TDatepickerView>>('currentView')!;

    const isMonthView = computed<boolean>(() => currentView.value === TDatepickerView.Day || !props.first);
    const isYearView = computed<boolean>(() => currentView.value === TDatepickerView.Month);
    const isMultipleYearsView = computed<boolean>(() => currentView.value === TDatepickerView.Year);

    return { isMonthView, isYearView, isMultipleYearsView };
  },
});
</script>
