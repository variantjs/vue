<template>
  <button
    :aria-label="yearLabel"
    :data-date="yearLabel"
    type="button"
    tabindex="-1"
    class="text-sm rounded w-full h-12 mx-auto hover:bg-blue-100"
    v-text="yearLabel"
  />
</template>

<script lang="ts">
import { DateFormatter } from '@variantjs/core';
import { ComputedRef, defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'DatepickerViewMultipleYearsYear',
  props: {
    year: {
      type: Date,
      required: true,
    },
  },
  setup(props) { 
    const formatDate = inject<ComputedRef<DateFormatter>>('formatDate')!;

    const yearLabel = formatDate.value(props.year, 'Y');

    return { yearLabel };
  },
});
</script>
