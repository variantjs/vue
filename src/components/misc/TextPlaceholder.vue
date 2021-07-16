<template>
  <span :class="className">
    <slot>
      <template v-if="placeholder">{{ placeholder }}</template>
      <template v-else>&nbsp;</template>
    </slot>
  </span>
</template>

<script lang="ts">
import { CSSClass, CSSRawClassesList } from '@variantjs/core';
import { defineComponent, inject } from 'vue';

export default defineComponent({
  name: 'TextPlaceholder',
  props: {
    classProperty: {
      type: String,
      default: 'placeholder',
    },
  },
  setup() {
    const classesList = inject<CSSRawClassesList>('classesList', {});
    const placeholder = inject('placeholder', undefined);

    return { classesList, placeholder };
  },

  computed: {
    className(): CSSClass {
      return this.classesList[this.classProperty];
    },
  },
});
</script>
