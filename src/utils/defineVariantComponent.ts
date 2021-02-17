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

export const setup = <PropsOptions extends WithVariantProps<Record<string, unknown>>>(componentName: keyof VariantJSConfiguration, props: PropsOptions, ctx: any, componentDefaultConfiguration: ObjectWithClassName): RawBindings | RenderFunction | void =>
  // const globalConfiguration = inject<VariantJSConfiguration>('theme');
  // const componentGlobalConfiguration = globalConfiguration ? globalConfiguration[componentName] : undefined;

  // const definedProps: ObjectWithClassName = pick(props, (value) => value !== undefined);
  // const customProps = ref<ObjectWithClassName>(parseVariant(definedProps, componentGlobalConfiguration, componentDefaultConfiguration));

  // watch(() => [props.variant, props.variants, props.fixedClasses, props.classes], () => {
  //   const definedProps2 = pick<ObjectWithClassName>(props, (value) => value !== undefined);
  //   customProps.value = parseVariant<ObjectWithClassName>(definedProps2, componentGlobalConfiguration, componentDefaultConfiguration);
  // });

  // return { customProps };
  ({
    class: props.variantConfiguraton.class,
  });
export const mixin = (componentDefaultConfiguration: WithVariantProps<Record<string, unknown>>, componentName: keyof VariantJSConfiguration) => ({
  props: {
    variantConfiguraton: {
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
>(options: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE>): DefineComponent<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE> => {
  const newOptions: ComponentOptionsWithObjectProps<PropsOptions, RawBindings, D, C, M, Mixin, Extends, E, EE> = { ...options };
  const newProps: ComponentObjectPropsOptions<Record<string, unknown>> = {};

  Object.entries(options.props).forEach(([propKey, prop]) => {
    if (prop && !Array.isArray(prop) && typeof prop === 'object') {
      const newProp = { ...prop };
      newProp.default = (props: WithVariantProps<Record<string, unknown>>) => get(props, `variantConfiguraton.${propKey}`, prop.default);
      newProps[propKey] = newProp;
    }
  });

  newOptions.props = newProps as PropsOptions;

  return defineComponent(newOptions);
};

export default defineVariantComponent;
