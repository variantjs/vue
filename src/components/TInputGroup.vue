<template>
  <div
    ref="wrapper"
    :class="configuration.classesList?.wrapper"
    v-bind="attributes"
  >
    <component
      :is="element.tagName"
      v-for="element in elementsToRender"
      :key="element.name"
      :ref="element.name"
      :class="configuration.classesList?.[element.name === 'default' ? 'body' : element.name]"
    >
      <slot
        v-if="$slots[element.name]"
        :name="element.name"
      />
      <template v-else>
        {{ configuration[element.name === 'default' ? 'body' : element.name] }}
      </template>
    </component>
  </div>
</template>

<script lang="ts">
import { TInputGroupConfig, TInputGroupConfigKeys } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { useAttributes, useConfigurationWithClassesList } from '../use';
import { TInputGroupOptions, TInputGroupValidChilElementsKeys } from '../types';

// @vue/component
export default defineComponent({
  name: 'TInputGroup',
  props: {
    ...getVariantPropsWithClassesList<TInputGroupOptions, TInputGroupConfigKeys>(),
    label: {
      type: String,
      default: undefined,
    },
    description: {
      type: String,
      default: undefined,
    },
    feedback: {
      type: String,
      default: undefined,
    },
    body: {
      type: String,
      default: undefined,
    },
    sortedElements: {
      type: Array as PropType<TInputGroupValidChilElementsKeys>,
      default: (): TInputGroupValidChilElementsKeys => (['label', 'default', 'feedback', 'description']),
      validator(value: Array<string>) {
        const expectedValues: TInputGroupValidChilElementsKeys = ['default', 'description', 'feedback', 'label'];
        return value.every((key) => expectedValues.find((k) => k === key) !== null);
      },
    },
  },
  setup() {
    const configuration = useConfigurationWithClassesList<TInputGroupOptions>(TInputGroupConfig, ['wrapper', 'label', 'body', 'feedback', 'description']);
    const attributes = useAttributes<TInputGroupOptions>(configuration);

    return { configuration, attributes };
  },
  computed: {
    elementsToRender(): Array<{
      name: 'label' | 'default' | 'feedback' | 'description',
      tagName: 'div' | 'label',
    }> {
      const { configuration } = this;
      const slots = this.$slots;
      return (this.sortedElements)
        .filter((e) => (e === 'default' ? (!!configuration.body || !!slots.default) : (!!configuration[e] || !!slots[e])))
        .map((e) => ({
          name: e,
          tagName: e === 'label' ? 'label' : 'div',
        }));
    },
  },
});
</script>
