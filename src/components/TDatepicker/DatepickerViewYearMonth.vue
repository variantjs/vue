<template>
  <button
    :aria-label="ariaLabel"
    :data-date="dataDate"
    type="button"
    tabindex="-1"
    class="text-sm rounded w-full h-12 mx-auto hover:bg-blue-100"
    v-text="monthLabel"
  />
</template>

<script lang="ts">
import { DateFormatter } from '@variantjs/core';
import { ComputedRef, defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'DatepickerViewYearMonth',
  props: {
    month: {
      type: Date,
      required: true,
    },
  },
  setup(props) { 
    const formatDate = inject<ComputedRef<DateFormatter>>('formatDate')!;

    const ariaLabel = formatDate.value(props.month, 'F, Y');
    const dataDate = formatDate.value(props.month, 'Y-m');
    const monthLabel = formatDate.value(props.month, 'M');

    return { ariaLabel, dataDate, monthLabel };
  },
});
</script>
