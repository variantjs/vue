<template>
  <t-tag
    :class="configuration.classesList?.wrapper"
    :tag-name="tagName"
  >
    <t-tag
      v-if="$slots.header || header"
      ref="header"
      :class="configuration.classesList?.header"
      :text="header"
    >
      <slot name="header" />
    </t-tag>
    <t-tag
      v-if="$slots.default || body"
      ref="body"
      :class="configuration.classesList?.body"
      :text="body"
    >
      <slot />
    </t-tag>
    <t-tag
      v-if="$slots.footer || footer"
      ref="footer"
      :class="configuration.classesList?.footer"
      :text="footer"
    >
      <slot name="footer" />
    </t-tag>
  </t-tag>
</template>

<script lang="ts">
import { TCardTheme, TCardThemeKeys } from '@variantjs/core';
import { defineComponent } from 'vue';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { useAttributes, useConfigurationWithClassesList } from '../use';
import { TCardOptions } from '../types';
import TTag from './TTag.vue';

// @vue/component
export default defineComponent({
  name: 'TCard',
  components: {
    TTag,
  },
  props: {
    ...getVariantPropsWithClassesList<TCardOptions, TCardThemeKeys>(),
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
    const configuration = useConfigurationWithClassesList<TCardOptions>(TCardTheme, ['wrapper', 'body', 'header', 'footer']);
    const attributes = useAttributes<TCardOptions>(configuration);

    return { configuration, attributes };
  },
});

</script>
