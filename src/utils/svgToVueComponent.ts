import { h, VNode, VNodeProps } from 'vue';
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

export default svgToVueComponent;
