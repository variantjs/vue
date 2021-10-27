<template>
  <div :class="configuration.classesList?.calendarDaysDayWrapper">
    <button
      aria-label="September 26, 2021"
      data-date="2021-09-26"
      type="button"
      tabindex="-1"
      :class="buttonClass"
    >
      {{ day.getDate() }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue';
import { TDatepickerOptions } from '../../types/components/t-datepicker';

export default defineComponent({
  name: 'DatepickerViewMonthDay',
  props: {
    day: {
      type: Date,
      required: true,
    },
  },
  setup() {
    const configuration = inject<TDatepickerOptions>('configuration')!;

    const buttonClass = computed(() => {
      if (this.isForAnotherMonth) {
        return configuration.classesList?.otherMonthDay;
      }

      if (this.isFirstDayOfRange) {
        return configuration.classesList?.inRangeFirstDay;
      }

      if (this.isLastDayOfRange) {
        return configuration.classesList?.inRangeLastDay;
      }

      if (this.isInRange) {
        return configuration.classesList?.inRangeDay;
      }

      if (this.isSelected) {
        return configuration.classesList?.selectedDay;
      }

      if (this.isActive && this.showActiveDate) {
        return configuration.classesList?.activeDay;
      }

      if (this.isHighlighted) {
        return configuration.classesList?.highlightedDay;
      }

      if (this.isToday) {
        return configuration.classesList?.today;
      }

      return configuration.classesList?.day;
    });

    return { configuration, buttonClass };
  },
});
</script>
