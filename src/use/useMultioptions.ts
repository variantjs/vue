import { InputOptions, NormalizedOptions, normalizeOptions } from '@variantjs/core';
import { computed, ComputedRef } from 'vue';

type KeysOfType<T, TProp> = { [P in keyof T]: T[P] extends TProp? P : never }[keyof T];

export default function useMultioptions<P extends Record<string, unknown>, K extends KeysOfType<P, InputOptions | undefined>>(
  props: P,
  key: K,
): ComputedRef<NormalizedOptions> {
  return computed<NormalizedOptions>(() => (props[key] !== undefined ? normalizeOptions(props[key]) : []));
}
