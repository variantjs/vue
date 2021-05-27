import {
  CSSClass, parseVariant, Variants, WithVariantProps, pick, get, WithVariantPropsAndClassesList, CSSRawClassesList, ObjectWithClassesList, parseVariantWithClassesList,
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
  inject,
  MethodOptions,
  PropType,
  computed,
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
      definedProps: {
        type: Object,
        default: (props: { [key: string]: unknown }) : string[] => Object.keys(props),
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

    },

  };

  if (Array.isArray(newOptions.mixins)) {
    newOptions.mixins.push(mixin as Mixin);
  } else {
    newOptions.mixins = [mixin as Mixin];
  }

  newOptions.props = newProps as PropsOptions;

  newOptions.setup = (props: ComponentOptionsBase<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>['setup'] & { definedProps: string[] }) => {
    const variantConfiguration = computed(() => {
      if (classesListKeys) {
        const accum: WithVariantPropsAndClassesList<PropsOptions, ClassesList, ClassesList2> = {};
        const definedProps: WithVariantPropsAndClassesList<PropsOptions, ClassesList, ClassesList2> = props.definedProps.reduce((accum, prop) => {
          accum[prop] = props[prop];
          return accum;
        }, {});
        const globalConfiguration = inject<VariantJSConfiguration>('theme', {})[componentName] as WithVariantPropsAndClassesList<Record<string, unknown>, ClassesList, ClassesList2>;
        return parseVariantWithClassesList(definedProps as WithVariantPropsAndClassesList<Record<string, unknown>, ClassesList, ClassesList2>, classesListKeys, globalConfiguration, componentDefaultConfiguration as WithVariantPropsAndClassesList<Record<string, unknown>, ClassesList, ClassesList2>);
      }

      const definedProps: WithVariantProps<Record<string, unknown>> = props.definedProps.reduce((accum, prop) => {
        accum[prop] = props[prop];
        return accum;
      }, {});

      const globalConfiguration = inject<VariantJSConfiguration>('theme', {})[componentName] as WithVariantProps<Record<string, unknown>>;
      return parseVariant(definedProps as WithVariantProps<Record<string, unknown>>, globalConfiguration, componentDefaultConfiguration);
    });

    return { variantConfiguration };
  };

  return defineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>(newOptions) as DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE, WithVariantProps<Record<string, unknown>>>;
};

export default defineVariantComponent;
