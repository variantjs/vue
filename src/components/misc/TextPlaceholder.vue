<template>
  <span :class="className">
    <slot>
      <template v-if="placeholder">{{ placeholder }}</template>
      <template v-else>&nbsp;</template>
    </slot>
  </span>
</template>

<script lang="ts">
import { CSSClass } from '@variantjs/core';
import { computed, defineComponent, inject } from 'vue';
import useProvidesClassesList from '../../use/useProvidesClassesList';

export default defineComponent({
  name: 'TextPlaceholder',
  props: {
    classProperty: {
      type: String,
      default: 'placeholder',
    },
  },
  setup(props) {
    const classesList = useProvidesClassesList();

    const placeholder = inject('placeholder', undefined);

    const className = computed<CSSClass>(() => classesList.value[props.classProperty]);

    return { className, placeholder };
  },
});
</script>
