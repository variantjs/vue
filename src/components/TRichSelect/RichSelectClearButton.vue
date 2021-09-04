<template>
  <button
    type="button"
    data-rich-select-focusable
    class="absolute flex items-center justify-center w-6 h-6 text-gray-600 transition duration-100 ease-in-out rounded mt-2.5 mr-2 top-0 right-0 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50"
  >
    <close-icon class="w-4 h-4" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CloseIcon from '../../icons/CloseIcon.vue';

export default defineComponent({
  name: 'RichSelectClearButton',
  components: {
    CloseIcon,
  },
});
</script>
