import { computed, getCurrentInstance, WritableComputedRef } from 'vue';
import { Data, Truthy } from '../types';

export default function useMulipleableVModel<P extends Data & {
  multiple?: Truthy
}, K extends keyof P>(
  props: P,
  key: K,
): WritableComputedRef<P[K] | Array<unknown> > {
  const vm = getCurrentInstance();

  return computed<P[K] | Array<unknown>>({
    get() {
      const isMultiple = props.multiple !== null && props.multiple !== undefined && props.multiple !== false;
      const value = props[key];
      if (value === undefined && isMultiple) {
        return [];
      }
      return value;
    },
    set(value) {
      vm?.emit(`update:${key}`, value);
    },
  });
}
