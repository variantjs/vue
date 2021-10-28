<template>
  <div class="w-64">
    <datepicker-view-controls />

    <datepicker-view-month :month="month" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DatepickerViewControls from './DatepickerViewControls.vue';
import DatepickerViewMonth from './DatepickerViewMonth.vue';

export default defineComponent({
  name: 'DatepickerView',
  components: {
    DatepickerViewControls,
    DatepickerViewMonth,
  },
  props: {
    month: {
      type: Date,
      required: true,
    },
  },
});
</script>
