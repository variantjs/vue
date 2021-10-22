<template>
  <div class="flex items-center flex-shrink-0 w-full h-8">
    <button
      aria-label="September 26, 2021"
      data-date="2021-09-26"
      type="button"
      tabindex="-1"
      class="w-8 h-8 mx-auto text-sm text-gray-400 rounded-full hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      26
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DatepickerViewMonthDay',

});
</script>
