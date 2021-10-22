<template>
  <div class="inline-flex flex-col mt-1 bg-white border rounded">
    <div class="inline-flex flex-wrap ">
      <datepicker-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DatepickerView from './DatepickerView.vue';

export default defineComponent({
  name: 'DatepickerDropdown',
  components: {
    DatepickerView,
  },
});
</script>
