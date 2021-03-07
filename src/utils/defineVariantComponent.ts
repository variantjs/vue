import {
  CSSClass, parseVariant, Variants, WithVariantProps, ObjectWithClassName, get, WithVariantPropsAndClassesList, CSSRawClassesList, ObjectWithClassesList, parseVariantWithClassesList,
} from '@variantjs/core';

import {
  ComponentObjectPropsOptions,
  ComponentOptionsBase,
  ComponentOptionsMixin,
  ComponentOptionsWithObjectProps,
  ComponentPropsOptions,
  ComputedOptions,
  DefineComponent,
  defineComponent,
  EmitsOptions,
  inject, MethodOptions, PropType,
} from 'vue';

import { VariantJSConfiguration } from '../main';

export type ComponentName = keyof VariantJSConfiguration;

const defineVariantComponent = <
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D,
  ClassesList extends CSSRawClassesList,
  ClassesList2 extends CSSRawClassesList,
  C extends ComputedOptions = {},
  M extends MethodOptions = {},
  Mixin extends ComponentOptionsMixin = ComponentOptionsMixin,
  Extends extends ComponentOptionsMixin = ComponentOptionsMixin,
  E extends EmitsOptions = Record<string, any>,
  EE extends string = string,
>(
    componentName: ComponentName,
    options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>,
    componentDefaultConfiguration: WithVariantProps<Record<string, unknown>> | WithVariantPropsAndClassesList<Record<string, unknown>, ClassesList, ClassesList2>,
    classesListKeys?: Readonly<string[]>,
  ): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, WithVariantProps<Record<string, unknown>>> => {
  const newOptions: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE> = { ...options };
  const newProps: ComponentObjectPropsOptions<Record<string, unknown>> = {};

  Object.entries(options.props).forEach(([propKey, prop]) => {
    if (prop && !Array.isArray(prop) && typeof prop === 'object') {
      const newProp = { ...prop };
      newProp.default = (props: WithVariantProps<Record<string, unknown>>) => get(props, `variantConfiguration.${propKey}`, prop.default);
      newProps[propKey] = newProp;
    }
  });

  newOptions.name = componentName;

  const mixin: ComponentOptionsBase<WithVariantProps<Record<string, unknown>>, any, any, any, any, any, any, any, any, any> = {
    props: {
      variantConfiguration: {
        type: Object,
        default: (props: WithVariantProps<Record<string, unknown>> | WithVariantPropsAndClassesList<Record<string, unknown>, ClassesList, ClassesList2>): ObjectWithClassName | ObjectWithClassesList => {
          const globalConfiguration = inject<VariantJSConfiguration>('theme', {})[componentName];
          if (classesListKeys) {
            return parseVariantWithClassesList(props as WithVariantPropsAndClassesList<Record<string, unknown>, ClassesList, ClassesList2>, classesListKeys, globalConfiguration, componentDefaultConfiguration as WithVariantPropsAndClassesList<Record<string, unknown>, ClassesList, ClassesList2>);
          }

          return parseVariant(props, globalConfiguration, componentDefaultConfiguration);
        },
      },
      classes: {
        type: [String, Array, Object] as PropType<CSSClass>,
        default: undefined,
      },
      fixedClasses: {
        type: [String, Array, Object] as PropType<CSSClass>,
        default: undefined,
      },
      variants: {
        type: Object as PropType<Variants<Record<string, unknown>>>,
        default: undefined,
      },
      variant: {
        type: String as PropType<string>,
        default: undefined,
      },
    },
  };

  if (Array.isArray(newOptions.mixins)) {
    newOptions.mixins.push(mixin as Mixin);
  } else {
    newOptions.mixins = [mixin as Mixin];
  }

  newOptions.props = newProps as PropsOptions;

  return defineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>(newOptions) as DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, WithVariantProps<Record<string, unknown>>>;
};

export default defineVariantComponent;
