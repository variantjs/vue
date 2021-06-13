import {
  CSSClass, get, parseVariant, Variants,
} from '@variantjs/core';
import {
  camelize, ComponentPublicInstance, inject, PropType,
} from 'vue';

import { VariantJSConfiguration } from '../main';
import { ComponentWithVariantsProps, VariantComputedAttributes } from '../types';

const extractDefinedProps = (ctx: ComponentPublicInstance): string[] => {
  const validProps = Object.keys(ctx.$props);

  const definedProps = Object.keys(ctx.$.vnode.props || {})
    .map((propName) => camelize(propName))
    .filter((propName) => validProps.includes(propName));

  return definedProps;
};

export const getProps = <ComponentOptions extends Record<string, unknown>>() : ComponentWithVariantsProps => ({
  classes: {
    type: [String, Array, Object] as PropType<CSSClass>,
    default: undefined,
  },
  fixedClasses: {
    type: [String, Array, Object] as PropType<CSSClass>,
    default: undefined,
  },
  variants: {
    type: Object as PropType<Variants<ComponentOptions>>,
    default: undefined,
  },
  variant: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
});

export const getComputed = <ComponentOptions extends Record<string, unknown>>(defaultConfiguration: ComponentOptions, componentName: keyof VariantJSConfiguration): VariantComputedAttributes => ({
  configuration(ctx: ComponentPublicInstance): ComponentOptions {
    const theme = inject<VariantJSConfiguration>('theme');

    const globalConfiguration = get<VariantJSConfiguration, ComponentOptions>(theme || {}, componentName, {});

    const propsValues: Record<string, unknown> = {};

    const definedProps = extractDefinedProps(ctx);

    definedProps.forEach((attributeName) => {
      const normalizedAttribute = camelize(attributeName);
      propsValues[normalizedAttribute] = (ctx.$props as Record<string, unknown>)[normalizedAttribute];
    });

    return parseVariant(propsValues as ComponentOptions, globalConfiguration, defaultConfiguration);
  },

  attributes(ctx: ComponentPublicInstance): Record<string, unknown> {
    const configuration: Record<string, unknown> = { ...this.configuration };

    const definedProps = extractDefinedProps(ctx);

    definedProps.forEach((attributeName) => {
      const normalizedAttribute = camelize(attributeName);
      delete configuration[normalizedAttribute];
    });

    return configuration;
  },
});
