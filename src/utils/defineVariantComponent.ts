import {
  CSSClass, parseVariant, pick, Variants, WithVariantProps, ObjectWithClassName, get,
} from '@variantjs/core';

import {
  ComponentObjectPropsOptions,
  ComponentOptionsMixin,
  ComponentOptionsWithObjectProps,
  ComponentOptionsWithoutProps,
  ComponentPropsOptions,
  ComputedOptions,
  DefineComponent,
  defineComponent,
  EmitsOptions,
  inject, MethodOptions, Prop, PropType, ref, RenderFunction, watch,
} from 'vue';

import { VariantJSConfiguration } from '../main';

export type ComponentName = keyof VariantJSConfiguration;

export const createVariantMixin = (componentName: ComponentName, componentDefaultConfiguration: WithVariantProps<Record<string, unknown>>): Mixin => ({
  props: {
    variantConfiguration: {
      type: Object,
      default: (props: WithVariantProps<Record<string, unknown>>): ObjectWithClassName => {
        const globalConfiguration = inject<VariantJSConfiguration>('theme');
        const componentGlobalConfiguration = globalConfiguration ? globalConfiguration[componentName] : undefined;
        return parseVariant(props, componentGlobalConfiguration, componentDefaultConfiguration);
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
});

const defineVariantComponent = <
  PropsOptions extends Readonly<ComponentPropsOptions>,
  RawBindings,
  D,
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
  ): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE> => {
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

  const mixin = createVariantMixin(componentName, componentDefaultConfiguration);
  if (Array.isArray(newOptions.mixins)) {
    newOptions.mixins.push(mixin);
  } else {
    newOptions.mixins = [mixin];
  }

  newOptions.props = newProps as PropsOptions;

  return defineComponent(newOptions);
};

export default defineVariantComponent;
