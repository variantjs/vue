import { Data } from '@variantjs/core';
import {
  computed, ref, getCurrentInstance, Ref, watch, ComputedRef,
} from 'vue';

export default function useMulipleableVModel<P extends Data, K extends keyof P, C extends ComputedRef<Data>>(
  props: P,
  key: K,
  configuration: C,
): {
    localValue: Ref<P[K]>;
    clearValue: () => void
  } {
  const vm = getCurrentInstance();

  const isMultiple = computed<boolean>((): boolean => (configuration === undefined ? false : configuration.value.multiple !== null && configuration.value.multiple !== undefined && configuration.value.multiple !== false));

  const getDefaultValue = (): P[K] => {
    if (isMultiple.value) {
      return [] as P[K];
    }

    return undefined as P[K];
  };

  const localValue = props[key] === undefined
    ? ref(getDefaultValue()) as Ref<P[K]>
    : computed<P[K]>({
      get() {
        const value = props[key];

        if (value === undefined) {
          return getDefaultValue();
        }

        return value;
      },
      set(value) {
        vm?.emit(`update:${key}`, value);
      },
    });

  const clearValue = () : void => {
    localValue.value = getDefaultValue();
  };

  watch(isMultiple, () => {
    clearValue();
  });

  return {
    localValue,
    clearValue,
  };
}
