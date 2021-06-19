<template>
  <div />
  <!-- <t-tag
    :class="attributes.classesList.wrapper"
    :tag-name="tagName"
  >
    <t-tag
      v-if="$slots.header || header"
      ref="header"
      :class="attributes.classesList.header"
      :text="header"
    >
      <slot name="header" />
    </t-tag>
    <t-tag
      v-if="$slots.default || body"
      ref="body"
      :class="attributes.classesList.body"
      :text="body"
    >
      <slot />
    </t-tag>
    <t-tag
      v-if="$slots.footer || footer"
      ref="footer"
      :class="attributes.classesList.footer"
      :text="footer"
    >
      <slot name="footer" />
    </t-tag>
  </t-tag> -->
</template>

<script lang="ts">
// import { TCardTheme } from '@variantjs/core';
import { defineComponent } from 'vue';
import getVariantProps from '../utils/getVariantProps';
import { useAttributesWithClassesList, useConfigurationWithClassesList } from '../use';
import TTag from './TTag.vue';
import { TCardOptions } from '../types';

// @TODO move this to the core library
const TCardTheme = {
  classes: {
    wrapper: 'border rounded shadow-sm bg-white border-gray-100',
    body: 'p-3',
    header: 'border-b border-gray-100 p-3 rounded-t',
    footer: 'border-gray-100 border-t p-3 rounded-b',
  },
};

// @vue/component
export default defineComponent({
  name: 'TCard',
  components: {
    TTag,
  },
  props: {
    ...getVariantProps<TCardOptions>(),
    tagName: {
      type: String,
      default: 'div',
    },
    header: {
      type: String,
      default: undefined,
    },
    body: {
      type: String,
      default: undefined,
    },
    footer: {
      type: String,
      default: undefined,
    },
  },
  setup() {
    const configuration = useConfigurationWithClassesList<TCardOptions>(TCardTheme, []);
    const attributes = useAttributesWithClassesList<TCardOptions>(configuration);

    return { configuration, attributes };
  },

});

</script>
