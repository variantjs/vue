<template>
  <input
    v-model="localValue"
    v-bind="attributes"
  >
</template>

<script lang="ts">
import {
  CSSClass, get, ObjectWithClassName, parseVariant, TInputTheme, Variants, WithVariantProps,
} from '@variantjs/core';
import { ComputedOptions } from '@vue/test-utils/dist/mount';
import {
  camelize, ComponentInternalInstance, ComponentPublicInstance, defineComponent, inject, PropType,
} from 'vue';
import { VariantJSConfiguration } from '../main';
import {
  TInputValue, TInputProps, TInputOptions, VariantComputedAttributes, ComponentWithVariantsProps,
} from '../types';

const props = {
  classes: {
    type: [String, Array, Object] as PropType<CSSClass>,
    default: undefined,
  },
  fixedClasses: {
    type: [String, Array, Object] as PropType<CSSClass>,
    default: undefined,
  },
  variants: {
    type: Object as PropType<Variants<TInputOptions>>,
    default: undefined,
  },
  variant: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
};

const extractDefinedProps = (ctx: ComponentPublicInstance): string[] => {
  const validProps = Object.keys(ctx.$props);
  const definedProps = Object.keys(ctx.$.vnode.props || {})
    .map((propName) => camelize(propName))
    .filter((propName) => validProps.includes(propName));

  return definedProps;
};

const getComputed = <ComponentOptions extends Record<string, unknown>>(defaultConfiguration: ComponentOptions, componentName: keyof VariantJSConfiguration) => ({
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

const TInputStandalone = defineComponent({
  props: {
    ...props,
    modelValue: {
      type: [String, Number] as PropType<TInputValue>,
      default: undefined,
    },
  },
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (_: TInputValue) => true,
  },
  computed: {
    ...getComputed<TInputOptions>(TInputTheme, 'TInput'),
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

  },
  methods: {
    test4(): CSSClass {
      return this.fixedClasses;
    },
  },
});

export default TInputStandalone;
</script>
