import {
  CSSClass, parseVariant, pick, Variants, WithVariantProps, Modify, ObjectWithClassName,
} from '@variantjs/core';
import {
  ComponentOptionsMixin,
  ComponentOptionsWithObjectProps,
  ComponentPropsOptions, DefineComponent, defineComponent, EmitsOptions, inject, PropType, ref, RenderFunction, SetupContext, watch,
} from 'vue';
import { VariantJSConfiguration } from '../main';

type VariantComponentOptions<P, RawBindings = Record<string, unknown>> = Modify<ComponentOptionsWithObjectProps<P>, {
  setup?: (this: void, props: P, ctx: SetupContext<EmitsOptions>) => Promise<RawBindings> | RawBindings | RenderFunction | void;
}>;

const defineVariantComponent = <P extends WithVariantProps<ComponentPropsOptions>>(
  options: VariantComponentOptions<P>,
  componentDefaultConfiguration: ObjectWithClassName,
): DefineComponent<P> => {
  const customOptions: VariantComponentOptions<P> = { ...options };

  const mixin: ComponentOptionsMixin = {
    props: {
      classes: {
        type: [String, Array, Object] as PropType<CSSClass>,
        default: undefined,
      },
      fixedClasses: {
        type: [String, Array, Object] as PropType<CSSClass>,
        default: undefined,
      },
      variants: {
        type: Object as PropType<Variants<P>>,
        default: undefined,
      },
      variant: {
        type: String as PropType<string>,
        default: undefined,
      },
    },
  };

  if (customOptions.mixins) {
    customOptions.mixins.push(mixin);
  } else {
    customOptions.mixins = [mixin];
  }

  customOptions.setup = (props: P, ctx: SetupContext<EmitsOptions>) => {
    const globalConfiguration = inject<VariantJSConfiguration>('theme');
    const componentGlobalConfiguration = globalConfiguration ? globalConfiguration.TInput : undefined;

    const definedProps: ObjectWithClassName = pick(props, (value) => value !== undefined);
    const customProps = ref<ObjectWithClassName>(parseVariant(definedProps, componentGlobalConfiguration, componentDefaultConfiguration));

    watch(() => [props.variant, props.variants, props.fixedClasses, props.classes], () => {
      const definedProps2 = pick<ObjectWithClassName>(props, (value) => value !== undefined);
      customProps.value = parseVariant<ObjectWithClassName>(definedProps2, componentGlobalConfiguration, componentDefaultConfiguration);
    });

    const extra = options.setup ? options.setup(props, ctx) : false;

    if (typeof extra === 'object') {
      return { ...extra, customProps };
    }

    return { customProps };
  };

  return defineComponent(customOptions);
};

export default defineVariantComponent;
