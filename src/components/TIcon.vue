<template>
  <component :is="child" />
</template>

<script lang="ts">
import {
  defineComponent, h, PropType, VNode, VNodeProps,
} from 'vue';
import { Data } from '../types';

const icons: {
  [key: string]: VNode
} = {};

const svgToVueComponent = (el: Element, iconName?: string): VNode => {
  if (iconName !== undefined && icons[iconName]) {
    return icons[iconName];
  }

  const attributes = Array.from(el.attributes);
  const children = Array.from(el.children);
  const attrs: VNodeProps & Data = {};

  attributes
    .filter((attribute: Attr) => !attribute.name.startsWith('on'))
    .forEach((attribute: Attr) => {
      attrs[attribute.name] = attribute.value;
    });

  const component = h(el.tagName, attrs, children.map((child) => svgToVueComponent(child)));

  if (iconName !== undefined) {
    icons[iconName] = component;
  }

  return component;
};

// @vue/component
export default defineComponent({
  name: 'TIcon',
  props: {
    icon: {
      type: Object as PropType<Element>,
      required: true,
      validator: (icon: Element) => icon.tagName === 'svg',
    },
    iconName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      child: svgToVueComponent(this.icon, this.iconName),
    };
  },
});
</script>
