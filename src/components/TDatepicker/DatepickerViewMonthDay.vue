<template>
  <div :class="configuration.classesList?.calendarDaysDayWrapper">
    <span
      v-if="showEmptyPlaceholder"
      :class="configuration.classesList?.emptyDay"
    />
    <button
      v-else
      :aria-label="ariaLabel"
      :data-date="dataDate"
      type="button"
      tabindex="-1"
      :class="buttonClass"
      @click="daySelectedHandler"
    >
      {{ dayLabel }}
    </button>
  </div>
</template>

<script lang="ts">
import {
  DateFormatter,
  dateIsPartOfTheRange, dateIsValid, DateParser, dayIsPartOfTheConditions, isSameDay,
} from '@variantjs/core';
import {
  defineComponent, inject, computed, Ref, ComputedRef,
} from 'vue';
import { TDatepickerOptions } from '../../types/components/t-datepicker';

export default defineComponent({
  name: 'DatepickerViewMonthDay',
  props: {
    day: {
      type: Date,
      required: true,
    },
    month: {
      type: Date,
      required: true,
    },
  },
  setup(props) {
    const configuration = inject<TDatepickerOptions>('configuration')!;
    const showActiveDate = inject<Ref<boolean>>('showActiveDate')!;
    const selectedDate = inject<Ref<Date | Date[]>>('selectedDate')!;
    const activeDate = inject<Ref<Date>>('activeDate')!;
    const parseDate = inject<Ref<DateParser>>('parseDate')!;
    const selectDay = inject<(day: Date) => void>('selectDay')!;
    const formatDate = inject<ComputedRef<DateFormatter>>('formatDate')!;

    const ariaLabel = formatDate.value(props.day, 'F d, Y');
    const dataDate = formatDate.value(props.day, 'Y-m-d');
    const dayLabel = formatDate.value(props.day, 'j');

    const isForAnotherMonth = computed(() => props.day.getFullYear() !== props.month.getFullYear()
        || props.day.getMonth() !== props.month.getMonth());

    const isFirstDayOfRange = computed<boolean>(() => {
      if (!configuration.range! || !Array.isArray(selectedDate.value)) {
        return false;
      }
      const [from] = selectedDate.value;
      return from && isSameDay(from, props.day);
    });

    const isLastDayOfRange = computed<boolean>(() => {
      if (!configuration.range! || !Array.isArray(selectedDate.value)) {
        return false;
      }
      const [, to] = selectedDate.value;
      return to && isSameDay(to, props.day);
    });

    const isInRange = computed<boolean>(() => {
      if (!configuration.range! || !Array.isArray(selectedDate.value)) {
        return false;
      }
      const [from, to] = selectedDate.value;
      return from && to && dateIsPartOfTheRange(props.day, from, to);
    });

    const isSelected = computed<boolean>(() => {
      if (Array.isArray(selectedDate.value)) {
        return selectedDate.value.some((date) => isSameDay(date, props.day));
      }

      return isSameDay(selectedDate.value, props.day);
    });

    const isHighlighted = computed<boolean>(() => dayIsPartOfTheConditions(
      props.day,
      configuration.highlightDates,
      parseDate.value,
      configuration.dateFormat,
    ));

    const isToday = computed<boolean>(() => isSameDay(props.day, new Date()));

    const isActive = computed<boolean>(() => isSameDay(activeDate.value, props.day));

    const buttonClass = computed(() => {
      if (isFirstDayOfRange.value) {
        return configuration.classesList?.inRangeFirstDay;
      }

      if (isLastDayOfRange.value) {
        return configuration.classesList?.inRangeLastDay;
      }

      if (isInRange.value) {
        return configuration.classesList?.inRangeDay;
      }

      if (isSelected.value) {
        return configuration.classesList?.selectedDay;
      }

      if (isActive.value && showActiveDate.value) {
        return configuration.classesList?.activeDay;
      }

      if (isHighlighted.value) {
        return configuration.classesList?.highlightedDay;
      }

      if (isToday.value) {
        return configuration.classesList?.today;
      }

      if (isForAnotherMonth.value) {
        return configuration.classesList?.otherMonthDay;
      }

      return configuration.classesList?.day;
    });

    const daySelectedHandler = ()  => {
      // @TODO: Consider disabled days      
      selectDay(props.day);
    };

    const showEmptyPlaceholder =  computed<boolean>(() => {
      if (!dateIsValid(props.day)) {
        return true;
      }
      
      if (!isForAnotherMonth.value) {
        return false;
      }

      return ! configuration.showDaysForOtherMonth! || configuration.monthsPerView! > 1;
    });

    return { configuration, buttonClass, daySelectedHandler, ariaLabel, dataDate, dayLabel, showEmptyPlaceholder };
  },
});
</script>
