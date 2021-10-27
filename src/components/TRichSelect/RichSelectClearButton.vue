<template>
  <button
    type="button"
    data-rich-select-focusable
    :class="className"
  >
    <slot name="clearButton">
      <close-icon class="w-4 h-4" />
    </slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CloseIcon from '../../icons/CloseIcon.vue';
import useInjectsClassesListClass from '../../use/useInjectsClassesListClass';

export default defineComponent({
  name: 'RichSelectClearButton',
  compatConfig: {
    MODE: 3,
  },
  components: {
    CloseIcon,
  },
  setup() {
    const className = useInjectsClassesListClass('clearButton');

    return { className };
  },
});
</script>
