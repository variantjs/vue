<template>
  <div class="inline-flex flex-col mt-1 bg-white border rounded">
    <div class="inline-flex flex-wrap ">
      <datepicker-view
        v-for="(month) in activeMonths"
        :key="month.toISOString"
        :month="month"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, computed, inject, Ref,
} from 'vue';
import { addMonths } from '@variantjs/core';
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

    const activeMonths = computed<Date[]>(() => Array
      .from({ length: monthsPerView }, (_x, i) => i)
      .map((i) => addMonths(activeDate.value, i)));

    return { activeMonths };
  },
});
</script>
