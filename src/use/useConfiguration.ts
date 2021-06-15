import {
  computed, inject, camelize, getCurrentInstance, ComponentInternalInstance, ComputedRef,
} from 'vue';
import {
  get, parseVariant,
} from '@variantjs/core';
import { VariantJSConfiguration } from '..';

export const extractDefinedProps = (vm: ComponentInternalInstance | null): string[] => {
  const validProps = Object.keys(vm?.props || {});

  const definedProps = Object.keys(vm?.vnode.props || {})
    .map((propName) => camelize(propName))
    .filter((propName) => validProps.includes(propName));

  return definedProps;
};

export default function useConfiguration<ComponentOptions extends Record<string, unknown>>(defaultConfiguration: ComponentOptions): ComputedRef<ComponentOptions> {
  const vm = getCurrentInstance();
  const localConfiguration = inject<VariantJSConfiguration>('configuration', {});
  const globalConfiguration = get<VariantJSConfiguration, ComponentOptions>(localConfiguration, vm?.type.name as keyof VariantJSConfiguration, {});

  const propsValues: Record<string, unknown> = {};

  extractDefinedProps(vm).forEach((attributeName) => {
    const normalizedAttribute = camelize(attributeName);
    propsValues[normalizedAttribute] = (vm?.props || {})[normalizedAttribute];
  });

  return computed(() => parseVariant(propsValues as ComponentOptions, globalConfiguration, defaultConfiguration));
}
