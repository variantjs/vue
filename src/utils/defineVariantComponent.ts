import {
  CSSClass, parseVariant, Variants, WithVariantProps, get,
} from '@variantjs/core';
import { ComputedGetter, WritableComputedOptions } from '@vue/reactivity';
import {
  ComponentOptionsMixin,
  ComponentOptionsWithObjectProps,
  ComponentPropsOptions,
  ComputedOptions,
  DefineComponent,
  defineComponent,
  EmitsOptions,
  ExtractPropTypes,
  MethodOptions,
  Prop,
  PropType,
} from 'vue';

import { VariantJSConfiguration } from '../main';
import { VariantComputedAttributes, ComponentWithVariantsProps } from '../types';

export type ComponentName = keyof VariantJSConfiguration;

// type Something = ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>

type Data = Record<string, unknown>;

export declare type ComponentObjectPropsOptions<P = Data> = {
  [K in keyof P]: Prop<P[K]> | null;
};

type Something<PropsOptions = ComponentObjectPropsOptions, RawBindings = {}, D = {}, C extends ComputedOptions = {}, M extends MethodOptions = {}, Mixin extends ComponentOptionsMixin = ComponentOptionsMixin, Extends extends ComponentOptionsMixin = ComponentOptionsMixin, E extends EmitsOptions = EmitsOptions, EE extends string = string, Props = Readonly<ExtractPropTypes<PropsOptions>>, Defaults = ExtractDefaultPropTypes<PropsOptions>> = ComponentOptionsBase<Props, RawBindings, D, C, M, Mixin, Extends, E, EE, Defaults> & {
  props: PropsOptions & ThisType<void>;
} & ThisType<CreateComponentPublicInstance<Props, RawBindings, D, C, M, Mixin, Extends, E, Props, Defaults, false>>;

const defineVariantComponent = <
  ComponentOptions extends WithVariantProps<Record<string, unknown>>,
  PropsOptions extends Readonly<ComponentPropsOptions>,
  C = Record<string, ComputedGetter<any> | WritableComputedOptions<any>>,
  M extends MethodOptions = Record<string, any>,
  RawBindings = Record<string, any>,
  D = Record<string, any>,
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string,
>(
    componentName: ComponentName,
    options: ComponentOptionsWithObjectProps<Partial<PropsOptions>, RawBindings, D, C, M, Mixin, Extends, E, EE>,
    componentDefaultConfiguration: WithVariantProps<Record<string, unknown>>,
  ): DefineComponent<ComponentWithVariantsProps<ComponentOptions, PropsOptions>, RawBindings, D, VariantComputedAttributes<C>, M, Mixin, Extends, E, EE> => {
  const computed: VariantComputedAttributes<C> = {

    ...options.computed as C,

    configuration(): Record<string, unknown> {
      const globalConfiguration = get<VariantJSConfiguration, PropsOptions>(this.theme, componentName, {});

      const propsValues = {} as PropsOptions;

      if (this.definedProps) {
        this.definedProps.forEach((propName) => {
          propsValues[propName] = this[propName];
        });
      }

      return parseVariant(propsValues, globalConfiguration, componentDefaultConfiguration);
    },
    attributes(): Record<string, unknown> {
      const configuration = { ...this.configuration };

      if (this.definedProps) {
        this.definedProps.forEach((propName) => {
          delete configuration[propName];
        });
      }

      return configuration;
    },
  };

  const props: ComponentWithVariantsProps<ComponentOptions, PropsOptions> = {
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
    definedProps: {
      type: Array as PropType<(keyof PropsOptions)[]>,
      default: (p: PropsOptions) : (keyof PropsOptions)[] => Object.keys(p) as (keyof PropsOptions)[],
    },
    ...options.props as PropsOptions,
  };

  const newOptions: ComponentOptionsWithObjectProps<ComponentWithVariantsProps<ComponentOptions, PropsOptions>, RawBindings, D, VariantComputedAttributes<C>, M, Mixin, Extends, E, EE> = {
    // ...options,
    props,
    inject: ['theme'],
    computed,
  };

  return defineComponent(newOptions);
};

export default defineVariantComponent;
