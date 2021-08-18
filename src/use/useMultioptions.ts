import {
  flattenOptions, InputOptions, NormalizedOption, NormalizedOptions, normalizeOptions,
} from '@variantjs/core';
import { computed, ComputedRef, Ref } from 'vue';

export default function useMultioptions(
  options: Ref<InputOptions | undefined>,
  textAttribute: Ref<string | undefined>,
  valueAttribute: Ref<string | undefined>,
): {
    normalizedOptions: ComputedRef<NormalizedOptions>
    flattenedOptions: ComputedRef<NormalizedOption[]>
  } {
  const normalizedOptions = computed<NormalizedOptions>(() => normalizeOptions(
    options.value,
    textAttribute.value,
    valueAttribute.value,
  ));

  // Flattened array with all posible options
  const flattenedOptions = computed((): NormalizedOption[] => flattenOptions(normalizedOptions.value));

  return {
    normalizedOptions,
    flattenedOptions,
  };
}
