<template>
  <component
    :is="tagName"
    :class="configuration.classesList?.wrapper"
  >
    <template
      v-if="$slots.header || header"
      ref="header"
    >
      <div
        v-if="header !== undefined"
        :class="configuration.classesList?.header"
      >
        {{ header }}
      </div>
      <div
        v-else
        :class="configuration.classesList?.header"
      >
        <slot name="header" />
      </div>
    </template>

    <template
      v-if="$slots.default || body"
      ref="body"
    >
      <div
        v-if="body !== undefined"
        :class="configuration.classesList?.body"
      >
        {{ body }}
      </div>
      <div
        v-else
        :class="configuration.classesList?.body"
      >
        <slot />
      </div>
    </template>

    <template
      v-if="$slots.footer || footer"
      ref="header"
    >
      <div
        v-if="footer !== undefined"
        :class="configuration.classesList?.footer"
      >
        {{ footer }}
      </div>
      <div
        v-else
        :class="configuration.classesList?.footer"
      >
        <slot name="footer" />
      </div>
    </template>
  </component>
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
