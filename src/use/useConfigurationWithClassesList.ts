import {
  computed, inject, camelize, getCurrentInstance, ComputedRef,
} from 'vue';
import { get, parseVariantWithClassesList } from '@variantjs/core';
import { Data, VariantJSConfiguration } from '../types';
import { extractDefinedProps } from './useConfiguration';

export default function useConfigurationWithClassesList<ComponentOptions extends Data>(defaultConfiguration: ComponentOptions, classesListKeys: Array<string>): ComputedRef<ComponentOptions> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const vm = getCurrentInstance()!;

  const variantGlobalConfiguration = inject<VariantJSConfiguration>('configuration', {});
  const componentGlobalConfiguration = get<VariantJSConfiguration, ComponentOptions>(variantGlobalConfiguration, vm?.type.name as keyof VariantJSConfiguration, {});

  return computed(() => {
    const propsValues: Data = {};

    extractDefinedProps(vm).forEach((attributeName) => {
      const normalizedAttribute = camelize(attributeName);
      propsValues[normalizedAttribute] = vm.props[normalizedAttribute];
    });

    return parseVariantWithClassesList(propsValues as ComponentOptions, classesListKeys, componentGlobalConfiguration, defaultConfiguration);
  });
}
