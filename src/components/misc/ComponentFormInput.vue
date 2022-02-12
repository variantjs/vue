<template>
  <input
    v-for="(item, index) in valueAsArray"
    :key="`${item}-${index}`"
    :name="inputName"
    :disabled="disabled"
    type="hidden"
    :value="item"
    v-bind="inputAttributes"
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
    // eslint-disable-next-line vue/require-prop-types
    value: {      
      required: true,
    },
    inputAttributes: {
      type: Object as PropType<InputHTMLAttributes & Data>,
      default: () => {},
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    valueAsArray(): string[] {
      return Array.isArray(this.value)
        ? this.value.map(v => String(v))
        : [String(this.value)];
    },
  },
});
</script>
