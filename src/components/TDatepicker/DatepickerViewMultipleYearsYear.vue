<template>
  <button
    :aria-label="yearLabel"
    :data-date="yearLabel"
    type="button"
    tabindex="-1"
    :class="buttonClass"
    @click="yearSelectedHandler"
    v-text="yearLabel"
  />
</template>

<script lang="ts">
import { DateFormatter, isSameYear } from '@variantjs/core';
import { computed, ComputedRef, defineComponent, inject, Ref } from 'vue';
import { TDatepickerOptions } from '../..';

export default defineComponent({
  name: 'DatepickerViewMultipleYearsYear',
  props: {
    year: {
      type: Date,
      required: true,
    },
  },
  setup(props) { 
    const configuration = inject<TDatepickerOptions>('configuration')!;
    const formatDate = inject<ComputedRef<DateFormatter>>('formatDate')!;
    const activeDate = inject<Ref<Date>>('activeDate')!;
    const selectedDate = inject<Ref<Date | Date[]>>('selectedDate')!;
    const selectYear = inject<(day: Date) => void>('selectYear')!;

    const yearLabel = formatDate.value(props.year, 'Y');

    const isSelected = computed<boolean>(() => {
      if (Array.isArray(selectedDate.value)) {
        return selectedDate.value.some((date) => isSameYear(date, props.year));
      }

      return isSameYear(selectedDate.value, props.year);
    });

    const isActive = computed<boolean>(() => isSameYear(activeDate.value, props.year));

    const buttonClass = computed(() => {
      if (isSelected.value) {
        return configuration.classesList?.selectedYear;
      }

      if (isActive.value) {
        return configuration.classesList?.activeYear;
      }

      return configuration.classesList?.year;
    });

    const yearSelectedHandler = ()  => {
      selectYear(props.year);
    };

    return { yearLabel, buttonClass, yearSelectedHandler };
  },
});
</script>
