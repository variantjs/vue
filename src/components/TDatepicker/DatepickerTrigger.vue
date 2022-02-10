<template>
  <input
    class="block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
    :value="userDate"
    @change="dateUserInputHandler"
  >
</template>

<script lang="ts">
import { DateParser } from '@variantjs/core';
import {
  defineComponent, inject, PropType, Ref, 
} from 'vue';
import { TDatepickerOptions } from '../..';
export default defineComponent({
  name: 'DatepickerTrigger',
  setup: () => {
    const userDate = inject<Ref<string>>('userDate')!;
    const parseDate = inject<Ref<DateParser>>('parseDate')!;
    const configuration = inject<TDatepickerOptions>('configuration')!;
    const setSelectedDate = inject<(date: Date | Date[] | undefined) => void>('setSelectedDate')!;
    const setActiveDate = inject<(date: Date) => void>('setActiveDate')!;
    
    const dateUserInputHandler = (e: Event) => {
      const input = e.target as HTMLInputElement;
      
      const parsedDate = parseDate.value(input.value, configuration.userFormat);
      setSelectedDate(parsedDate);

      if (parsedDate !== undefined) {
        setActiveDate(parsedDate);
      }
    };

    return {
      userDate,
      dateUserInputHandler,
    };
  },  
});
</script>
