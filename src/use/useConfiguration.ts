import {
  computed, inject, camelize, getCurrentInstance, ComponentInternalInstance, ComputedRef,
} from 'vue';
import {
  Data, get, isPrimitive, parseVariant, pick,
} from '@variantjs/core';
import { VariantJSConfiguration } from '../types';

export const extractDefinedProps = (vm: ComponentInternalInstance): string[] => {
  const validProps = Object.keys(vm.props);

  const definedProps = Object.keys(vm.vnode.props || {})
    .map((propName) => camelize(propName))
    .filter((propName) => validProps.includes(propName));

  return definedProps;
};

export default function useConfiguration<ComponentOptions extends Data>(defaultConfiguration: ComponentOptions): {
  configuration: ComputedRef<ComponentOptions>,
  attributes: ComputedRef<Data>
} {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const vm = getCurrentInstance()!;

  const variantGlobalConfiguration = inject<VariantJSConfiguration>('configuration', {});
  const componentGlobalConfiguration = get<VariantJSConfiguration, ComponentOptions>(variantGlobalConfiguration, vm?.type.name as keyof VariantJSConfiguration, {});

  const configuration: ComputedRef<ComponentOptions> = computed(() => {
    const propsValues: Data = {};

    extractDefinedProps(vm).forEach((attributeName) => {
      const normalizedAttribute = camelize(attributeName);
      propsValues[normalizedAttribute] = vm.props[normalizedAttribute];
    });

    const result = parseVariant(propsValues as ComponentOptions, componentGlobalConfiguration, defaultConfiguration);

    return {
      ...vm.props,
      ...result,
    };
  });

  const attributes: ComputedRef<Data> = computed<Data>(():Data => {
    const availableProps = Object.keys(vm.props);

    return pick(configuration.value, (value, key) => isPrimitive(value) && !availableProps.includes(String(key)));
  });

  return {
    configuration,
    attributes,
  };
}
