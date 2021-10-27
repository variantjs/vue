<template>
  <div class="px-3 py-2">
    <div class="grid grid-cols-7 ">
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Sun</span>
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Mon</span>
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Tue</span>
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Wed</span>
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Thu</span>
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Fri</span>
      <span class="flex items-center justify-center w-8 h-8 text-xs text-gray-500 uppercase">Sat</span>
    </div>
    <div class="grid grid-cols-7">
      <datepicker-view-month-day
        v-for="day in days"
        :key="day.toTimeString()"
        :day="day"
      />

      <!-- <span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="September 27, 2021"
        data-date="2021-09-27"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm text-gray-400 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >27</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="September 28, 2021"
        data-date="2021-09-28"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm text-gray-400 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >28</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="September 29, 2021"
        data-date="2021-09-29"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm text-gray-400 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >29</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="September 30, 2021"
        data-date="2021-09-30"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm text-gray-400 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >30</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 1, 2021"
        data-date="2021-10-01"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >1</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 2, 2021"
        data-date="2021-10-02"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >2</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 3, 2021"
        data-date="2021-10-03"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >3</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 4, 2021"
        data-date="2021-10-04"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >4</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 5, 2021"
        data-date="2021-10-05"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >5</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 6, 2021"
        data-date="2021-10-06"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >6</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 7, 2021"
        data-date="2021-10-07"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >7</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 8, 2021"
        data-date="2021-10-08"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >8</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 9, 2021"
        data-date="2021-10-09"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >9</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 10, 2021"
        data-date="2021-10-10"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >10</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 11, 2021"
        data-date="2021-10-11"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >11</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 12, 2021"
        data-date="2021-10-12"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >12</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 13, 2021"
        data-date="2021-10-13"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >13</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 14, 2021"
        data-date="2021-10-14"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >14</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 15, 2021"
        data-date="2021-10-15"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm text-white bg-blue-500 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >15</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 16, 2021"
        data-date="2021-10-16"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >16</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 17, 2021"
        data-date="2021-10-17"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >17</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 18, 2021"
        data-date="2021-10-18"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >18</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 19, 2021"
        data-date="2021-10-19"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >19</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 20, 2021"
        data-date="2021-10-20"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >20</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 21, 2021"
        data-date="2021-10-21"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >21</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 22, 2021"
        aria-current="date"
        data-date="2021-10-22"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm border border-blue-500 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >22</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 23, 2021"
        data-date="2021-10-23"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >23</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 24, 2021"
        data-date="2021-10-24"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >24</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 25, 2021"
        data-date="2021-10-25"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >25</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 26, 2021"
        data-date="2021-10-26"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >26</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 27, 2021"
        data-date="2021-10-27"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >27</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 28, 2021"
        data-date="2021-10-28"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >28</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 29, 2021"
        data-date="2021-10-29"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >29</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 30, 2021"
        data-date="2021-10-30"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >30</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="October 31, 2021"
        data-date="2021-10-31"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >31</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="November 1, 2021"
        data-date="2021-11-01"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm text-gray-400 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >1</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="November 2, 2021"
        data-date="2021-11-02"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm text-gray-400 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >2</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="November 3, 2021"
        data-date="2021-11-03"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm text-gray-400 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >3</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="November 4, 2021"
        data-date="2021-11-04"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm text-gray-400 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >4</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="November 5, 2021"
        data-date="2021-11-05"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm text-gray-400 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >5</button></span><span class="flex items-center flex-shrink-0 w-full h-8"><button
        aria-label="November 6, 2021"
        data-date="2021-11-06"
        type="button"
        tabindex="-1"
        class="w-8 h-8 mx-auto text-sm text-gray-400 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >6</button></span> -->
    </div>
  </div>
</template>

<script lang="ts">

import { visibleDaysInMonthView } from '@variantjs/core';
import {
  defineComponent, inject, Ref, computed,
} from 'vue';
import { TDatepickerOptions } from '../../types/components/t-datepicker';
import DatepickerViewMonthDay from './DatepickerViewMonthDay.vue';

export default defineComponent({
  name: 'DatepickerViewMonth',
  components: {
    DatepickerViewMonthDay,
  },
  setup() {
    const activeDate = inject<Ref<Date>>('activeDate')!;
    const configuration = inject<TDatepickerOptions>('configuration')!;

    // @TODO: the month is dynamic
    const activeMonth = new Date();

    // @TODO add this as a prop
    const weekStart = 0;

    const days = computed<Date[]>(() => visibleDaysInMonthView(activeDate.value, weekStart));

    return { days, configuration };
  },
});
</script>
