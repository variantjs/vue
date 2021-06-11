import {
  CSSClass, get, parseVariant, TInputTheme, Variants,
} from '@variantjs/core';
import {
  camelize, defineComponent, inject, PropType,
} from 'vue';
import { VariantJSConfiguration } from '../main';
import {
  TInputValue, TInputProps, TInputOptions, ComponentWithVariantsProps,
} from '../types';

const defineVariantComponent = (props: ComponentWithVariantsProps) =>{ 
  console.log(":D")
// const props: TInputProps = {
//   classes: {
//     type: [String, Array, Object] as PropType<CSSClass>,
//     default: undefined,
//   },
//   fixedClasses: {
//     type: [String, Array, Object] as PropType<CSSClass>,
//     default: undefined,
//   },
//   variants: {
//     type: Object as PropType<Variants<TInputOptions>>,
//     default: undefined,
//   },
//   variant: {
//     type: String as PropType<string | undefined>,
//     default: undefined,
//   },
//   modelValue: {
//     type: [String, Number] as PropType<TInputValue>,
//     default: undefined,
//   },
// };

  return defineComponent({
    props,
    emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      'update:modelValue': (_: TInputValue) => true,
    },
    computed: {
      localValue: {
        get(): TInputValue {
          const { test4 } = this;
          const { fixedClasses } = this;
          const { configuration } = this;
          const { localValue } = this;
          return this.modelValue;
        },
        set(value: TInputValue) {
          this.$emit('update:modelValue', value);
        },
      },
      configuration(): TInputOptions {
        const theme = inject<VariantJSConfiguration>('theme');
        const globalConfiguration = get<VariantJSConfiguration, TInputOptions>(theme || {}, 'TInput', {});

        const propsValues: Record<string, unknown> = {};

        const manualAttributes = Object.keys(this.$.vnode.props || {});

        manualAttributes.forEach((attributeName) => {
          const normalizedAttribute = camelize(attributeName) as keyof TInputProps;
          propsValues[normalizedAttribute] = this[normalizedAttribute];
        });

        return parseVariant(propsValues as TInputOptions, globalConfiguration, TInputTheme);
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
    },
    methods: {
      test4(): CSSClass {
        return this.fixedClasses;
      },
    },
  });
export default defineVariantComponent;
