import { computed, getCurrentInstance, WritableComputedRef } from 'vue';

export default function useVModel<P extends Record<string, unknown>, K extends keyof P, Name extends string>(
  props: P,
  key?: K,
  emit?: (name: Name, ...args: any[]) => void,
): WritableComputedRef<P[K]> {
  const vm = getCurrentInstance();
  // @ts-expect-error mis-alignment with @vue/composition-api
  const theEmit = emit || vm?.emit || vm?.$emit?.bind(vm);
  const theKey: K = key || ('modelValue' as K);

  const event = `update:${theKey}`;

  return computed<P[K]>({
    get() {
      return props[theKey];
    },
    set(value) {
      theEmit(event, value);
    },
  });
}
