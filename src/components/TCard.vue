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
      <slot
        name="header"
        :configuration="configuration"
      >
        {{ configuration.header }}
      </slot>
    </div>

    <div
      v-if="$slots.default || configuration.body"
      ref="body"
      :class="configuration.classesList?.body"
    >
      <slot :configuration="configuration">
        {{ configuration.body }}
      </slot>
    </div>

    <div
      v-if="$slots.footer || configuration.footer"
      ref="footer"
      :class="configuration.classesList?.footer"
    >
      <slot
        name="footer"
        :configuration="configuration"
      >
        {{ configuration.footer }}
      </slot>
    </div>
  </component>
</template>

<script lang="ts">
import { TCardConfig, TCardConfigKeys } from '@variantjs/core';
import { defineComponent } from 'vue';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { useAttributes, useConfigurationWithClassesList } from '../use';
import { TCardOptions } from '../types';

// @vue/component
export default defineComponent({
  name: 'TCard',
  props: {
    ...getVariantPropsWithClassesList<TCardOptions, TCardConfigKeys>(),
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
    const configuration = useConfigurationWithClassesList<TCardOptions>(TCardConfig, ['wrapper', 'body', 'header', 'footer']);
    const attributes = useAttributes<TCardOptions>(configuration);

    return { configuration, attributes };
  },
});

</script>
