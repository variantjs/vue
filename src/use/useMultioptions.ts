import {
  flattenOptions,
  InputOptions, NormalizedOption, NormalizedOptions, normalizeOptions,
} from '@variantjs/core';
import { computed, ComputedRef } from 'vue';
import { KeysOfType } from '../types';

export default function useMultioptions<
  P extends Record<string, unknown>,
  K extends KeysOfType<P, InputOptions | undefined>,
>(
  props: P,
  key: K,
): {
    normalizedOptions: ComputedRef<NormalizedOptions>
    flattenedOptions: ComputedRef<NormalizedOption[]>
  } {
  const normalizedOptions = computed<NormalizedOptions>(() => (props[key] !== undefined ? normalizeOptions(props[key]) : []));

  // Flattened array with all posible options
  const flattenedOptions = computed((): NormalizedOption[] => flattenOptions(normalizedOptions.value));

  return {
    normalizedOptions,
    flattenedOptions,
  };
}
