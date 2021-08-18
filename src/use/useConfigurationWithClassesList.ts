import {
  computed, inject, camelize, getCurrentInstance, ComputedRef,
} from 'vue';
import {
  Data, get, isPrimitive, parseVariantWithClassesList, pick,
} from '@variantjs/core';
import { VariantJSConfiguration } from '../types';
import { extractDefinedProps } from './useConfiguration';

export default function useConfigurationWithClassesList<ComponentOptions extends Data>(defaultConfiguration: ComponentOptions, classesListKeys: string[]): {
  configuration: ComputedRef<ComponentOptions>,
  attributes: ComputedRef<Data>
} {
  const vm = getCurrentInstance()!;

  const variantGlobalConfiguration = inject<VariantJSConfiguration>('configuration', {});
  const componentGlobalConfiguration = get<VariantJSConfiguration, ComponentOptions>(variantGlobalConfiguration, vm?.type.name as keyof VariantJSConfiguration, {});

  const configuration: ComputedRef<ComponentOptions> = computed(() => {
    const propsValues: Data = {};

    extractDefinedProps(vm).forEach((attributeName) => {
      const normalizedAttribute = camelize(attributeName);
      propsValues[normalizedAttribute] = vm.props[normalizedAttribute];
    });

    const result = parseVariantWithClassesList(propsValues as ComponentOptions, classesListKeys, componentGlobalConfiguration, defaultConfiguration);

    return {
      ...vm.props,
      ...result,
    };
  });

  const attributes: ComputedRef<Data> = computed<Data>(():Data => {
    const availableProps = Object.keys(vm.props);

    return pick(configuration.value, (value, key) => isPrimitive(value) && !availableProps.includes(String(key)));
  });

  return { configuration, attributes };
}
