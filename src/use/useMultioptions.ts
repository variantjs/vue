import {
  flattenOptions,
  InputOptions, NormalizedOption, NormalizedOptions, normalizeOptions,
} from '@variantjs/core';
import { computed, ComputedRef } from 'vue';
import { KeysOfType } from '../types';

export default function useMultioptions<
  P extends Record<string, unknown>,
  K extends KeysOfType<P, InputOptions | undefined>,
  K2 extends keyof P,
>(
  props: P,
  key: K,
  textAttribute?: K2,
  valueAttribute?: K2,
): {
    normalizedOptions: ComputedRef<NormalizedOptions>
    flattenedOptions: ComputedRef<NormalizedOption[]>
  } {
  const normalizedOptions = computed<NormalizedOptions>(() => (
    props[key] !== undefined
      ? normalizeOptions(
        props[key],
        textAttribute ? props[textAttribute] : undefined,
        valueAttribute ? props[valueAttribute] : undefined,
      )
      : []
  ));

  // Flattened array with all posible options
  const flattenedOptions = computed((): NormalizedOption[] => flattenOptions(normalizedOptions.value));

  return {
    normalizedOptions,
    flattenedOptions,
  };
}
