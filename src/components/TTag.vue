<template>
  <component
    :is="configuration.tagName"
    v-bind="attributes"
  >
    <template v-if="configuration.text !== undefined">
      {{ configuration.text }}
    </template>
    <slot v-else />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TTagOptions } from '../types';
import { getVariantProps } from '../utils/getVariantProps';
import { useAttributes, useConfiguration } from '../use';

// @vue/component
export default defineComponent({
  name: 'TTag',
  props: {
    ...getVariantProps<TTagOptions>(),
    tagName: {
      type: String,
      default: 'div',
    },
    text: {
      type: String,
      default: undefined,
    },
  },
  setup() {
    const configuration = useConfiguration<TTagOptions>({});
    const attributes = useAttributes<TTagOptions>(configuration);

    return { configuration, attributes };
  },
});

</script>
