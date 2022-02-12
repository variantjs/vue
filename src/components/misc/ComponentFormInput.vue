<template>
  <input
    v-for="(item, index) in valueAsArray"
    :key="`${item}-${index}`"
    :name="inputName"
    v-bind="inputAttributes"
    type="hidden"
    :value="item"
  >
</template>

<script lang="ts">
import { Data } from '@variantjs/core';
import { defineComponent, PropType, InputHTMLAttributes } from 'vue';

/**
 * Adds a hidden input or a set of hidden inputs in case of array values
 * that can be used in form components to ensure it send the value of the
 * component form in a regular form request
 */
export default defineComponent({
  name: 'ComponentFormInput',
  props: {
    inputName: {
      type: String,
      default: undefined,
    },
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
