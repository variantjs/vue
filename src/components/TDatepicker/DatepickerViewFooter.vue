<template>
  <div
    v-if="show"
    class="flex items-center px-3 pb-2 space-x-2"
  >
    <!-- <label class="flex-grow text-sm text-gray-500">Time</label>
      <div class="flex items-center space-x-2">
      <div
        tabindex="0"
        inputmode="numeric"
        contenteditable="true"
        class="bg-gray-100 rounded-md w-full text-right flex items-center border border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
        style="caret-color: transparent;"
      >
        <input
          inputmode="numeric"
          type="text"
          contenteditable="false"
          class="text-center w-8 border-transparent bg-transparent p-0 h-6 text-sm transition duration-100 ease-in-out border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 rounded"
        ><span
          contenteditable="false"
          class=""
        >:</span><input
          inputmode="numeric"
          type="text"
          contenteditable="false"
          class="text-center w-8 border-transparent bg-transparent p-0 h-6 text-sm transition duration-100 ease-in-out border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 rounded"
        >
      </div> -->
    <button
      type="button"
      class="text-blue-600 text-sm uppercase font-semibold transition duration-100 ease-in-out border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 rounded cursor-pointer ml-auto"
      data-datepicker-focusable
      @click="okButtonHandler"
      v-text="locale.okLabel"
    />
  </div>
</template>

<script lang="ts">
import { DateLocale } from '@variantjs/core';
import { computed, ComputedRef, defineComponent, inject } from 'vue';
import { TDatepickerOptions } from '../../types/components/t-datepicker';
import { useCalendarState } from '../../use/datepicker';

export default defineComponent({
  name: 'DatepickerViewFooter',
  setup() {
    const configuration = inject<TDatepickerOptions>('configuration')!;
    const locale = inject<ComputedRef<DateLocale>>('locale')!;
    const okButtonHandler = inject<() => void>('okButtonHandler')!;

    const { isMultiple, isRange } = useCalendarState(configuration);

    const show = computed(() => {
      if (configuration.showOkButton === undefined) {
        return isMultiple.value && !isRange.value;
      }

      return configuration.showOkButton;
    });
    
    return { show, locale, okButtonHandler };
  },
});
</script>
