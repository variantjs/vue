import {
  CSSClass, parseVariant, Variants, WithVariantProps, get,
} from '@variantjs/core';
import { ComputedGetter, WritableComputedOptions } from '@vue/reactivity';
import {
  camelize,
  ComponentOptionsMixin,
  ComponentOptionsWithObjectProps,
  ComponentPropsOptions,
  ComputedOptions,
  DefineComponent,
  defineComponent,
  EmitsOptions,
  ExtractPropTypes,
  inject,
  MethodOptions,
  Prop,
  PropType,
} from 'vue';

import { VariantJSConfiguration } from '../main';
import { VariantComputedAttributes, ComponentWithVariantsProps } from '../types';

export type ComponentName = keyof VariantJSConfiguration;

const defineVariantComponent = <
  ComponentOptions extends Record<string, unknown> = {},
  PropsOptions extends Readonly<ComponentPropsOptions> = {
    classes: {
      type: PropType<CSSClass>;
      default: undefined;
    },
    fixedClasses: {
      type: PropType<CSSClass>;
      default: undefined;
    },
    variants: {
      type: PropType<Variants<ComponentOptions>>;
      default: undefined;
    },
    variant: {
      type:PropType<string | undefined>;
      default: undefined;
    },
  },
  RawBindings = {},
  D = {},
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string,

>(
    componentName: ComponentName,
    options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>,
    componentDefaultConfiguration: WithVariantProps<Record<string, unknown>>,
  ): DefineComponent<ComponentWithVariantsProps<ComponentOptions, PropsOptions>, RawBindings, D, VariantComputedAttributes<C>, M, Mixin, Extends, E, EE> => {
  console.log('wait');

  const props: ComponentWithVariantsProps<ComponentOptions> = {
    ...options.props,
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
  };

  // const computed: VariantComputedAttributes<C> = ;

  const newOptions: ComponentOptionsWithObjectProps<ComponentWithVariantsProps<ComponentOptions>, RawBindings, D, VariantComputedAttributes<C>, M, Mixin, Extends, E, EE> = {
    ...options,
    props: {
      ...options.props,
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
    },
    computed: {
      ...options.computed as C,
      configuration(ctx: any): WithVariantProps<Record<string, unknown>> {
        const theme = inject<VariantJSConfiguration>('theme');
        const globalConfiguration = get<VariantJSConfiguration, ComponentOptions>(theme || {}, componentName, {});

        const propsValues: Record<string, unknown> = {};

        const manualAttributes = Object.keys(ctx.$.vnode.props || {});
        manualAttributes.forEach((attributeName) => {
          const normalizedAttribute = camelize(attributeName) as keyof PropsOptions;
          propsValues[normalizedAttribute] = this[normalizedAttribute];
        });

        return parseVariant(propsValues as ComponentOptions, globalConfiguration, componentDefaultConfiguration);
      },

      attributes(): Record<string, unknown> {
        const configuration = { ...this.configuration };

        const manualAttributes = Object.keys(this.$.vnode.props || {});
        manualAttributes.forEach((attributeName) => {
          const normalizedAttribute = camelize(attributeName) as keyof PropsOptions;
          delete configuration[normalizedAttribute];
        });

        return configuration;
      },
    },
  } as ComponentOptionsWithObjectProps<ComponentWithVariantsProps<ComponentOptions>, RawBindings, D, VariantComputedAttributes<C>, M, Mixin, Extends, E, EE>;

  return defineComponent(newOptions) as DefineComponent<ComponentWithVariantsProps<ComponentOptions, PropsOptions>, RawBindings, D, VariantComputedAttributes<C>, M, Mixin, Extends, E, EE>;
};

export default defineVariantComponent;
