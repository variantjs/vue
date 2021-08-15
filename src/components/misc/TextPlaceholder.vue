<template>
  <span :class="className">
    <slot>
      <template v-if="placeholder !== undefined">{{ placeholder }}</template>
      <template v-else>&nbsp;</template>
    </slot>
  </span>
</template>

<script lang="ts">
import { CSSClass } from '@variantjs/core';
import { computed, defineComponent } from 'vue';
import useProvidesClassesList from '../../use/useInjectsClassesList';

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
    const classesList = useProvidesClassesList();

    const className = computed<CSSClass>(() => (classesList.value === undefined ? undefined : classesList.value[props.classProperty]));

    return { className };
  },
});
</script>
