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
import { getGlobalComponentOptions } from '../../utils/getGlobalComponentOptions';

export default defineComponent({
  ...getGlobalComponentOptions(),
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
