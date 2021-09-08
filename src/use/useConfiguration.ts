import {
  computed, inject, camelize, getCurrentInstance, ComponentInternalInstance, ComputedRef, watch, reactive, toRaw,
} from 'vue';
import {
  Data, get, isEqual, isPrimitive, parseVariant, pick,
} from '@variantjs/core';
import { VariantJSConfiguration } from '../types';

export const extractDefinedProps = (vm: ComponentInternalInstance): string[] => {
  const validProps = Object.keys(vm.props);

  const definedProps = Object.keys(vm.vnode.props || {})
    .map((propName) => camelize(propName))
    .filter((propName) => validProps.includes(propName) && propName !== 'modelValue');

  return definedProps;
};

export function useAttributes<ComponentOptions extends Data>(configuration: ComponentOptions): Data {
  const vm = getCurrentInstance()!;

  const attributes: ComputedRef<Data> = computed<Data>(():Data => {
    const availableProps = Object.keys(vm.props);

    return {
      ...pick(configuration, (value, key) => isPrimitive(value) && !availableProps.includes(String(key))),
      ...vm.attrs,
    };
  });

  return attributes.value;
}

export function useConfigurationParts<ComponentOptions extends Data>(): {
  componentGlobalConfiguration?: ComponentOptions
  propsValues: ComputedRef<Data>
} {
  const vm = getCurrentInstance()!;

  const variantGlobalConfiguration = inject<VariantJSConfiguration>('configuration', {});

  const componentGlobalConfiguration = get<VariantJSConfiguration, ComponentOptions>(variantGlobalConfiguration, vm?.type.name as keyof VariantJSConfiguration, {});

  const propsValues = computed(() => {
    const values: Data = {};

    extractDefinedProps(vm).forEach((attributeName) => {
      const normalizedAttribute = camelize(attributeName);
      values[normalizedAttribute] = vm.props[normalizedAttribute];
    });

    return values;
  });

  return {
    componentGlobalConfiguration,
    propsValues: propsValues as ComputedRef<Data>,
  };
}

export default function useConfiguration<ComponentOptions extends Data>(defaultConfiguration: ComponentOptions): {
  configuration: ComponentOptions,
  attributes: Data,
} {
  const vm = getCurrentInstance()!;

  const { propsValues, componentGlobalConfiguration } = useConfigurationParts<ComponentOptions>();

  const configuration = computed(() => {
    const props = { ...vm.props };
    delete props.modelValue;
    return {
      ...props,
      ...parseVariant(
        propsValues.value,
        componentGlobalConfiguration,
        defaultConfiguration,
      ),
    };
  });

  const attributes = useAttributes(configuration.value);

  return {
    configuration: configuration.value as ComponentOptions,
    attributes,
  };
}
