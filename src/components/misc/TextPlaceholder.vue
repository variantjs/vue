<template>
  <span :class="className">
    <slot>
      <template v-if="placeholder !== undefined">{{ placeholder }}</template>
      <template v-else>&nbsp;</template>
    </slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useInjectsClassesListClass from '../../use/useInjectsClassesListClass';

export default defineComponent({
  name: 'TextPlaceholder',
  props: {
    classProperty: {
      type: String,
      default: 'placeholder',
    },
    placeholder: {
      type: String,
      default: undefined,
    },
  },
  setup(props) {
    const className = useInjectsClassesListClass(props.classProperty);

    return { className };
  },
});
</script>
