<template>
  <component
    :is="configuration.tagName"
    :class="configuration.classesList?.wrapper"
    v-bind="attributes"
  >
    <div
      v-if="$slots.header || configuration.header"
      ref="header"
      :class="configuration.classesList?.header"
    >
      <template v-if="configuration.header !== undefined">
        {{ configuration.header }}
      </template>
      <slot
        v-else
        name="header"
      />
    </div>

    <div
      v-if="$slots.default || configuration.body"
      ref="body"
      :class="configuration.classesList?.body"
    >
      <template
        v-if="configuration.body !== undefined"
      >
        {{ configuration.body }}
      </template>
      <slot v-else />
    </div>

    <div
      v-if="$slots.footer || configuration.footer"
      ref="footer"
      :class="configuration.classesList?.footer"
    >
      <template v-if="configuration.footer !== undefined">
        {{ configuration.footer }}
      </template>
      <slot
        v-else
        name="footer"
      />
    </div>
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
