<template>
  <button
    type="button"
    data-rich-select-focusable
    :class="className"
  >
    <close-icon class="w-4 h-4" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CloseIcon from '../../icons/CloseIcon.vue';
import { useInjectsClassesListClass } from '../../use';

export default defineComponent({
  name: 'RichSelectClearButton',
  components: {
    CloseIcon,
  },
  setup() {
    const className = useInjectsClassesListClass('clearButton');

    return { className };
  },
});
</script>
