<template>
  <button
    :aria-label="ariaLabel"
    :data-date="dataDate"
    type="button"
    tabindex="-1"
    :class="buttonClass"
    @click="monthSelectedHandler"
    v-text="monthLabel"
  />
</template>

<script lang="ts">
import { DateFormatter, isSameMonth } from '@variantjs/core';
import { ComputedRef, defineComponent, inject, computed, Ref } from 'vue';
import { TDatepickerOptions } from '../..';

export default defineComponent({
  name: 'DatepickerViewYearMonth',
  props: {
    month: {
      type: Date,
      required: true,
    },
  },
  setup(props) { 
    const configuration = inject<TDatepickerOptions>('configuration')!;
    const formatDate = inject<ComputedRef<DateFormatter>>('formatDate')!;
    const activeDate = inject<Ref<Date>>('activeDate')!;
    const selectedDate = inject<Ref<Date | Date[]>>('selectedDate')!;
    const showActiveDate = inject<Ref<boolean>>('showActiveDate')!;
    const selectMonth = inject<(day: Date) => void>('selectMonth')!;

    const ariaLabel = formatDate.value(props.month, 'F, Y');
    const dataDate = formatDate.value(props.month, 'Y-m');
    const monthLabel = formatDate.value(props.month, 'M');

    const isSelected = computed<boolean>(() => {
      if (Array.isArray(selectedDate.value)) {
        return selectedDate.value.some((date) => isSameMonth(date, props.month));
      }

      return isSameMonth(selectedDate.value, props.month);
    });

    const isActive = computed<boolean>(() => isSameMonth(activeDate.value, props.month));

    const buttonClass = computed(() => {
      if (isSelected.value) {
        return configuration.classesList?.selectedMonth;
      }

      if (isActive.value && showActiveDate.value) {
        return configuration.classesList?.activeMonth;
      }

      return configuration.classesList?.month;
    });

    const monthSelectedHandler = ()  => {
      selectMonth(props.month);
    };

    return { ariaLabel, dataDate, monthLabel, buttonClass, monthSelectedHandler };
  },
});
</script>
