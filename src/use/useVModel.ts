import { Data } from '@variantjs/core';
import { computed, getCurrentInstance, WritableComputedRef } from 'vue';

export default function useVModel<P extends Data, K extends keyof P>(
  props: P,
  key: K,
): WritableComputedRef<P[K]> {
  const vm = getCurrentInstance();

  return computed<P[K]>({
    get(): P[K] {
      return props[key];
    },
    set(value): void {
      vm?.emit(`update:${key}`, value);
    },
  });
}
