import { isPrimitive, pick } from '@variantjs/core';
import {
  computed, getCurrentInstance, ComputedRef,
} from 'vue';
import { Data } from '../types';

export default function useAttributes<ComponentOptions extends Data>(configuration: ComputedRef<ComponentOptions>): ComputedRef<Data> {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const vm = getCurrentInstance()!;

  const result = computed(() => {
    const availableProps = Object.keys(vm.props);
    const attributes = pick(configuration.value, (value, key) => isPrimitive(value) && !availableProps.includes(String(key)));
    return attributes;
  });

  return result;
}
