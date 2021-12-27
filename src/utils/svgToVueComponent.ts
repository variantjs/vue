import { Data } from '@variantjs/core';
import { h, VNode, VNodeProps } from 'vue';

const icons: {
  [key: string]: VNode
} = {};

export const svgToVueComponent = (el: Element | string, deep = 0): VNode => {
  let iconAsString: string | null = null;

  if (deep === 0) {
    iconAsString = typeof el === 'string' ? el : el.outerHTML;

    if (icons[iconAsString]) {
      return icons[iconAsString];
    }
  }

  let elToConvert: Element | null | string = el;

  if (typeof elToConvert === 'string') {
    const div = document.createElement('div');
    div.innerHTML = elToConvert;
    elToConvert = div.firstElementChild;
  }

  if (elToConvert === null) {
    return h('span');
  }

  const attributes = Array.from(elToConvert.attributes);
  const children = Array.from(elToConvert.children);
  const attrs: VNodeProps & Data = {};

  attributes
    .filter((attribute: Attr) => !attribute.name.startsWith('on'))
    .forEach((attribute: Attr) => {
      attrs[attribute.name] = attribute.value;
    });

  const component = h(elToConvert.tagName, attrs, children.map((child) => svgToVueComponent(child, deep + 1)));

  if (deep === 0 && iconAsString !== null) {
    icons[iconAsString] = component;
  }

  return component;
};
