<template>
  <select v-bind="customProps">
    <template v-for="(option, index) in normalizedOptions">
      <template v-if="option.children && option.children.length">
        <optgroup
          :key="`${option.value}-${index}`"
          :label="option.text !== undefined ? String(option.text) : undefined"
        >
          <option
            v-for="(childrenOption, index2) in option.children"
            :key="`${childrenOption.value}-${index}-${index2}`"
            :value="childrenOption.value"
            v-text="childrenOption.text"
          />
        </optgroup>
      </template>
      <template v-else>
        <option
          :key="`${option.value}-${index}`"
          :value="option.value"
          v-text="option.text"
        />
      </template>
    </template>
  </select>
</template>

<script lang="ts">
import {
  WithVariantProps, TSelect as componentDefaultConfiguration, ObjectWithClassName, normalizeOptions, NormalizedOptions,
} from '@variantjs/core';
import { defineComponent } from 'vue';

export type TSelectProps = WithVariantProps<Record<string, never>>;

export default defineComponent({
  name: 'TSelect',
  props: {
    options: {
      type: [Array, Object],
      default: undefined,
    },
  },
  computed: {
    normalizedOptions(): NormalizedOptions {
      return this.options !== undefined ? normalizeOptions(this.options) : [];
    },
  },
});
</script>
