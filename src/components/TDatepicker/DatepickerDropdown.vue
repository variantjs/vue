<template>
  <div class="inline-flex flex-col mt-1 bg-white border rounded">
    <div class="inline-flex flex-wrap ">
      <datepicker-view
        v-for="(month, index) in activeMonths"
        :key="month.toISOString"
        :month="month"
        :first="index === 0"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed, inject, Ref,
} from 'vue';
import { addMonths, range } from '@variantjs/core';
import DatepickerView from './DatepickerView.vue';
import { TDatepickerOptions } from '../../types/components/t-datepicker';

export default defineComponent({
  name: 'DatepickerDropdown',
  components: {
    DatepickerView,
  },
  setup() {
    const configuration = inject<TDatepickerOptions>('configuration')!;
    const monthsPerView = configuration.monthsPerView!;

    const activeDate = inject<Ref<Date>>('activeDate')!;

    const activeMonths = computed<Date[]>(() => 
      range(1, monthsPerView)
        .map((i) => addMonths(activeDate.value, i)));

    return { activeMonths };
  },
});
</script>
