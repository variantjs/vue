<template>
  <input
    v-for="(item, index) in valueAsArray"
    :key="`${item}-${index}`"
    v-bind="inputAttributes"
    type="hidden"
    :value="item"
  >
</template>

<script lang="ts">
import { Data } from '@variantjs/core';
import { defineComponent, PropType, InputHTMLAttributes } from 'vue';

export default defineComponent({
  name: 'DatepickerFormInput',
  props: {
    values: {
      type: [String, Array] as PropType<string | string[]>,
      required: true,
    },
    inputAttributes: {
      type: Object as PropType<InputHTMLAttributes & Data>,
      default: () => {},
    },
  },
  computed: {
    valueAsArray(): string[] {
      return Array.isArray(this.values) ? this.values : [this.values];
    },
  },
});
</script>
