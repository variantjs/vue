import { computed, getCurrentInstance, WritableComputedRef } from 'vue';
import { Data } from '../types';

export default function useVModel<P extends Data, K extends keyof P>(
  props: P,
  key: K,
): WritableComputedRef<P[K]> {
  const vm = getCurrentInstance();

  return computed<P[K]>({
    get() {
      return props[key];
    },
    set(value) {
      vm?.emit(`update:${key}`, value);
    },
  });
}
