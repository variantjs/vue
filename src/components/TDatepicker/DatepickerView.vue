<template>
  <div class="w-64">
    <datepicker-view-controls
      v-if="isActiveMonth"
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
      v-if="isMonthView"
      :month="month"
    />

    <datepicker-view-year v-else-if="isYearView" />

    <DatepickerViewMultipleYears v-else />
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

import { isSameMonth } from '@variantjs/core';

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
  },
  setup(props) {
    const activeDate = inject<Ref<Date>>('activeDate')!;

    const currentView = inject<Ref<TDatepickerView>>('currentView')!;
    
    const isActiveMonth = computed<boolean>(() => isSameMonth(props.month, activeDate.value));
    
    const isMonthView = computed<boolean>(() => !isActiveMonth.value || currentView.value === TDatepickerView.Day);
    
    const isYearView = computed<boolean>(() => currentView.value === TDatepickerView.Month);

    return { isMonthView, isYearView, isActiveMonth };
  },
});
</script>
