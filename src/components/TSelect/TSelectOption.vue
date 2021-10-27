<template>
  <optgroup
    v-if="hasChildren"
    :data-value="option.value !== undefined ? String(option.value) : undefined"
    :label="option.text !== undefined ? String(option.text) : undefined"
    :disabled="!! option.disabled"
  >
    <t-select-option
      v-for="(childrenOption, index) in option.children"
      :key="`${childrenOption.value}-${childrenOption.text}-${index}`"
      :option="childrenOption"
    />
  </optgroup>
  <option
    v-else
    :value="option.value === null ? undefined : option.value"
    :disabled="!! option.disabled"
    v-text="option.text"
  />
</template>

<script lang="ts">
import { NormalizedOption } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';

// @vue/component
export default defineComponent({
  name: 'TSelectOption',
  compatConfig: {
    MODE: 3,
  },
  props: {
    option: {
      type: [Object] as PropType<NormalizedOption>,
      required: true,
    },
  },
  computed: {
    hasChildren(): boolean {
      return this.option.children !== undefined && this.option.children.length > 0;
    },
  },
});
</script>
