<template>
  <div class="w-64">
    <datepicker-view-controls
      v-if="first"
      :date="month"
    />
    <div
      v-else
      class="flex px-3 pt-2"
    >
      <datepicker-view-controls-label
        :date="month"
        hide-controls
      />
    </div>

    <datepicker-view-month
      v-if="isMonthView || !first"
      :month="month"
    />

    <datepicker-view-year v-else-if="isYearView" />

    <datepicker-view-multiple-years v-else />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, Ref } from 'vue';
import { TDatepickerView } from '../../types/components/t-datepicker';
import DatepickerViewMonth from './DatepickerViewMonth.vue';
import DatepickerViewYear from './DatepickerViewYear.vue';
import DatepickerViewMultipleYears from './DatepickerViewMultipleYears.vue';
import DatepickerViewControls from './DatepickerViewControls.vue';
import DatepickerViewControlsLabel from './DatepickerViewControlsLabel.vue';

export default defineComponent({
  name: 'DatepickerView',
  components: {
    DatepickerViewMonth,
    DatepickerViewYear,
    DatepickerViewMultipleYears,
    DatepickerViewControls,
    DatepickerViewControlsLabel,
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
  setup() {
    const currentView = inject<Ref<TDatepickerView>>('currentView')!;
    
    const isMonthView = computed<boolean>(() => currentView.value === TDatepickerView.Day);
    
    const isYearView = computed<boolean>(() => currentView.value === TDatepickerView.Month);

    return { isMonthView, isYearView };
  },
});
</script>
