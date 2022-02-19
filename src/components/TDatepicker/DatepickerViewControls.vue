<template>
  <div class="flex px-3 pt-2">
    <button
      :aria-label="toggleViewAriaLabel"
      type="button"
      class="transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-gray-100 px-2 -ml-1"
      tabindex="-1"
      @click="toggleView"
    >
      <datepicker-view-controls-label
        :date="date"
        :view="currentView"
      />
    </button>

    <button
      :aria-label="prevAriaLabel"
      type="button"
      class="inline-flex p-1 ml-auto transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      tabindex="-1"
      @click="prevGroupHandler"
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="inline-flex w-6 h-6 text-gray-400"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 19l-7-7 7-7"
      /></svg>
    </button>

    <button
      :aria-label="nextAriaLabel"
      type="button"
      class="inline-flex p-1 -mr-1 transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      tabindex="-1"
      @click="nextGroupHandler"
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="inline-flex w-6 h-6 text-gray-400"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 5l7 7-7 7"
      /></svg>
    </button>
  </div>
</template>

<script lang="ts">
import { addMonths, addYears } from '@variantjs/core';
import { defineComponent, inject, Ref, computed } from 'vue';
import { TDatepickerView } from '../../types/components/t-datepicker';
import DatepickerViewControlsLabel from './DatepickerViewControlsLabel.vue';
export default defineComponent({
  name: 'DatepickerViewControls',
  components: {
    DatepickerViewControlsLabel,
  },
  props: {
    date: {
      type: Date,
      required: true,
    },
  },
  setup() {
    const activeDate = inject<Ref<Date>>('activeDate')!;
    const setCurrentView = inject<(view: TDatepickerView) => void>('setCurrentView')!;
    const setActiveDate = inject<(date: Date) => void>('setActiveDate')!;
    const currentView = inject<Ref<TDatepickerView>>('currentView')!;

    const isMonthView = computed<boolean>(() => currentView.value === TDatepickerView.Day);
    const isYearView = computed<boolean>(() => currentView.value === TDatepickerView.Month);
    
    const prevAriaLabel = computed<string>(() => 'Prev Year') ;
    const nextAriaLabel = computed<string>(() => 'Next Year') ;
    const toggleViewAriaLabel = computed<string>(() => 'Toggle View') ;

    const nextGroupHandler = () => {
      if (currentView.value === TDatepickerView.Year) {
        setActiveDate(addYears(activeDate.value, 12));
      } else if (currentView.value === TDatepickerView.Month) {
        setActiveDate(addYears(activeDate.value, 1));
      } else  {
        setActiveDate(addMonths(activeDate.value, 1));
      }
    };

    const prevGroupHandler = () => {
      if (currentView.value === TDatepickerView.Year) {
        setActiveDate(addYears(activeDate.value, -12));
      } else if (currentView.value === TDatepickerView.Month) {
        setActiveDate(addYears(activeDate.value, -1));
      } else {
        setActiveDate(addMonths(activeDate.value, -1));
      }
    };

    const toggleView = () => {
      if (isMonthView.value) {
        setCurrentView(TDatepickerView.Month);
      } else if (isYearView.value) {
        setCurrentView(TDatepickerView.Year);
      } else {
        setCurrentView(TDatepickerView.Day);
      }
    };

    return { toggleView, nextAriaLabel, prevAriaLabel, toggleViewAriaLabel, nextGroupHandler, prevGroupHandler, currentView };
  },
});
</script>
