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
  MethodOptions,
  PropType,
} from 'vue';

import { VariantJSConfiguration } from '../main';
import { VariantComputedAttributes, ComponentWithVariantsProps } from '../types';

export type ComponentName = keyof VariantJSConfiguration;

const defineVariantComponent = <
  ComponentOptions extends WithVariantProps<Record<string, unknown>>,
  PropsOptions extends Readonly<ComponentPropsOptions>,
  C extends ComputedOptions = Record<string, ComputedGetter<any> | WritableComputedOptions<any>>,
  M extends MethodOptions = Record<string, any>,
  RawBindings = Record<string, any>,
  D = Record<string, any>,
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string,
>(
    componentName: ComponentName,
    options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>,
    componentDefaultConfiguration: WithVariantProps<Record<string, unknown>>,
  ): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE> => {
  const computed: C = {
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

  const props: PropsOptions = {
    ...options.props as PropsOptions,
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
  };

  const newOptions: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE> = {
    ...options,
    props,
    inject: ['theme'],
    computed,
  };

  return defineComponent(newOptions);
};

export default defineVariantComponent;
