import { Data } from '@variantjs/core';
import {
  computed, ref, getCurrentInstance, Ref,
} from 'vue';
import { Truthy } from '../types';

export default function useMulipleableVModel<P extends Data & {
  multiple?: Truthy
}, K extends keyof P>(
  props: P,
  key: K,
): {
    localValue: Ref<P[K]>;
    clearValue: () => void
  } {
  const vm = getCurrentInstance();

  const getDefaultValue = (): P[K] => {
    const isMultiple = props.multiple !== null && props.multiple !== undefined && props.multiple !== false;

    if (isMultiple) {
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

  return {
    localValue,
    clearValue,
  };
}
