import { ObjectWithClassName } from '@variantjs/core';
import {
  computed, getCurrentInstance, ComputedRef,
} from 'vue';
import { Data } from '../types';
import useConfiguration from './useConfiguration';

export default function useAttributes<ComponentOptions extends ObjectWithClassName>(defaultConfiguration: ComponentOptions): ComputedRef<Data> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const vm = getCurrentInstance()!;

  const configuration = useConfiguration<ComponentOptions>(defaultConfiguration);

  const result = computed(() => {
    const attributes: Data = { ...configuration.value };

    // Attributes are everything from the configuration that is not a prop
    const validProps = Object.keys(vm.props);
    validProps.forEach((propName) => {
      delete attributes[propName];
    });

    return attributes;
  });

  return result;
}
