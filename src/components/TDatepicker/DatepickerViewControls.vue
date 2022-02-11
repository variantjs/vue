<template>
  <div class="flex px-3 pt-2">
    <button
      :aria-label="toggleViewAriaLabel"
      type="button"
      class="inline-flex items-center px-2 py-1 -ml-1 transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-gray-100"
      tabindex="-1"
      @click="toggleView"
    >
      <template v-if="isMonthView || isYearView">
        <span
          v-if="isMonthView"
          class=""
          v-text="monthName"
        />
        
        <span
          class="ml-1 text-gray-500"
          v-text="year"
        />
        
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="flex-shrink-0 w-5 h-5 text-gray-400 fill-current"
        ><polygon points="12.9497475 10.7071068 13.6568542 10 8 4.34314575 6.58578644 5.75735931 10.8284271 10 6.58578644 14.2426407 8 15.6568542 12.9497475 10.7071068" /></svg>
      </template>

      <template v-else>
        <svg
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="flex-shrink-0 h-5 w-5 fill-current text-gray-400"
        ><polygon points="7.05025253 9.29289322 6.34314575 10 12 15.6568542 13.4142136 14.2426407 9.17157288 10 13.4142136 5.75735931 12 4.34314575" /></svg>
        
        <span
          class="ml-1 text-gray-500"
          v-text="`${yearsRange[0]} - ${yearsRange[1]}`"
        />
      </template>
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
import { addMonths, addYears, DateFormatter } from '@variantjs/core';
import { ComputedRef, defineComponent, inject, Ref, computed } from 'vue';
import { TDatepickerView } from '../../types/components/t-datepicker';

export default defineComponent({
  name: 'DatepickerViewControls',

  setup() {
    const activeDate = inject<Ref<Date>>('activeDate')!;
    const formatDate = inject<ComputedRef<DateFormatter>>('formatDate')!;
    const setCurrentView = inject<(view: TDatepickerView) => void>('setCurrentView')!;
    const setActiveDate = inject<(date: Date) => void>('setActiveDate')!;
    const currentView = inject<Ref<TDatepickerView>>('currentView')!;

    const monthName = computed<string>(() => formatDate.value(activeDate.value, 'F')) ;
    const year = computed<string>(() => formatDate.value(activeDate.value, 'Y')) ;

    const isMonthView = computed<boolean>(() => currentView.value === TDatepickerView.Day);
    const isYearView = computed<boolean>(() => currentView.value === TDatepickerView.Month);
    
    const yearsRange = computed<[number, number]>(() => {
      const currentYear = activeDate.value.getFullYear();
      const from = currentYear - (currentYear % 12);
      const to = from + 11;
      return [from, to];
    });

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

    return { monthName, year, toggleView, isMonthView, isYearView, yearsRange, nextAriaLabel, prevAriaLabel, toggleViewAriaLabel, nextGroupHandler, prevGroupHandler };
  },
});
</script>
