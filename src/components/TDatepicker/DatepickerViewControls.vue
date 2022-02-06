<template>
  <div class="flex px-3 pt-2">
    <button
      type="button"
      class="flex inline-flex items-center px-2 py-1 -ml-1 transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-gray-100"
      tabindex="-1"
      @click="toggleView"
    >
      <span
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
    </button>
    <button
      aria-label="Prev Year"
      type="button"
      class="inline-flex p-1 ml-auto transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      tabindex="-1"
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
      aria-label="Next Year"
      type="button"
      class="inline-flex p-1 -mr-1 transition duration-100 ease-in-out rounded-full cursor-pointer hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      tabindex="-1"
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
import { DateFormatter } from '@variantjs/core';
import { ComputedRef, defineComponent, inject, Ref, computed } from 'vue';
import { TDatepickerView } from '../../types/components/t-datepicker';

export default defineComponent({
  name: 'DatepickerViewControls',

  setup() {
    const activeDate = inject<Ref<Date>>('activeDate')!;
    const formatDate = inject<ComputedRef<DateFormatter>>('formatDate')!;
    const setCurrentView = inject<(view: TDatepickerView) => void>('setCurrentView')!;
    const currentView = inject<Ref<TDatepickerView>>('currentView')!;

    const monthName = computed<string>(() => formatDate.value(activeDate.value, 'F')) ;
    const year = computed<string>(() => formatDate.value(activeDate.value, 'Y')) ;

    const toggleView = () => {
      if (currentView.value === TDatepickerView.Day) {
        setCurrentView(TDatepickerView.Month);
      } else if (currentView.value === TDatepickerView.Month) {
        setCurrentView(TDatepickerView.Year);
      } else {
        setCurrentView(TDatepickerView.Day);
      }
    };

    return { monthName, year, toggleView };
  },
});
</script>
