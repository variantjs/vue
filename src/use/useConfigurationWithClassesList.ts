import {
  computed, getCurrentInstance,
} from 'vue';
import { Data, parseVariantWithClassesList } from '@variantjs/core';
import { useAttributes, useConfigurationParts } from './useConfiguration';

export default function useConfigurationWithClassesList<ComponentOptions extends Data>(defaultConfiguration: ComponentOptions, classesListKeys: string[]): {
  configuration: ComponentOptions,
  attributes: Data,
} {
  const vm = getCurrentInstance()!;

  const { propsValues, componentGlobalConfiguration } = useConfigurationParts<ComponentOptions>();

  const configuration = computed(() => ({
    ...vm.props,
    ...parseVariantWithClassesList(
      propsValues.value,
      classesListKeys,
      componentGlobalConfiguration,
      defaultConfiguration,
    ),
  }));

  const attributes = useAttributes(configuration.value);

  return {
    configuration: configuration.value as ComponentOptions,
    attributes,
  };
}
