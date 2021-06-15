import {
  computed, inject, camelize, getCurrentInstance, ComponentInternalInstance, ComputedRef, watch,
} from 'vue';
import {
  get, parseVariant,
} from '@variantjs/core';
import { VariantJSConfiguration } from '..';

export const extractDefinedProps = (vm: ComponentInternalInstance): string[] => {
  const validProps = Object.keys(vm.props);

  const definedProps = Object.keys(vm.vnode.props || {})
    .map((propName) => camelize(propName))
    .filter((propName) => validProps.includes(propName));

  return definedProps;
};

export default function useConfiguration<ComponentOptions extends Record<string, unknown>>(defaultConfiguration: ComponentOptions): ComputedRef<ComponentOptions> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const vm = getCurrentInstance()!;

  const variantGlobalConfiguration = inject<VariantJSConfiguration>('configuration', {});
  const componentGlobalConfiguration = get<VariantJSConfiguration, ComponentOptions>(variantGlobalConfiguration, vm?.type.name as keyof VariantJSConfiguration, {});

  return computed(() => {
    const propsValues: Record<string, unknown> = {};

    extractDefinedProps(vm).forEach((attributeName) => {
      const normalizedAttribute = camelize(attributeName);
      propsValues[normalizedAttribute] = vm.props[normalizedAttribute];
    });

    if (vm.vnode.props?.class) {
      propsValues.class = vm.vnode.props?.class;
    }

    return parseVariant(propsValues as ComponentOptions, componentGlobalConfiguration, defaultConfiguration);
  });
}
