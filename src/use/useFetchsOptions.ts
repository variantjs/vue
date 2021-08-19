import {
  debounce, filterOptions, flattenOptions, InputOptions, NormalizedOption, NormalizedOptions, normalizeOptions,
} from '@variantjs/core';
import {
  computed, Ref, ref, ComputedRef, getCurrentInstance, watch,
} from 'vue';
import { FetchedOptions, FetchOptionsFn, MinimumInputLengthTextProp } from '../types';

export default function useFetchsOptions(
  options: Ref<InputOptions | undefined>,
  textAttribute: Ref<string | undefined>,
  valueAttribute: Ref<string | undefined>,
  normalize: Ref<boolean>,
  searchQuery: Ref<string | undefined>,
  fetchFn: Ref<FetchOptionsFn | undefined>,
  fetchDelay: Ref<number | undefined>,
  fetchMinimumInputLength: Ref<number | undefined>,
  fetchMinimumInputLengthText: ComputedRef<MinimumInputLengthTextProp>,
): {
    normalizedOptions: ComputedRef<NormalizedOptions>
    flattenedOptions: ComputedRef<NormalizedOption[]>
    fetchsOptions: ComputedRef<boolean>,
    needsMoreCharsToFetch: ComputedRef<boolean>,
    needsMoreCharsMessage: ComputedRef<string>,
    fetchingOptions: Ref<boolean>,
    fetchedOptionsHasMorePages: Ref<boolean>,
    optionsWereFetched: Ref<boolean>,
    fetchOptions: () => void,
  } {
  const fetchedOptions = ref<InputOptions>(options.value || []);

  const optionsWereFetched = ref<boolean>(false);

  const normalizedOptions = computed<NormalizedOptions>(() => {
    if (typeof fetchFn.value !== 'function') {
      const normalized = normalize.value
        ? normalizeOptions(options.value, textAttribute.value, valueAttribute.value)
        : options.value as NormalizedOptions;

      if (searchQuery.value) {
        return filterOptions(normalized, searchQuery.value);
      }

      return normalized;
    }

    return normalize.value
      ? normalizeOptions(fetchedOptions.value, textAttribute.value, valueAttribute.value)
      : fetchedOptions.value as NormalizedOptions;
  });

  const flattenedOptions = computed<NormalizedOption[]>(() => flattenOptions(normalizedOptions.value));

  const { emit } = getCurrentInstance()!;

  const needsMoreCharsToFetch = computed<boolean>(() => {
    if (!fetchMinimumInputLength.value) {
      return false;
    }

    return !searchQuery.value || searchQuery.value.length < fetchMinimumInputLength.value;
  });

  const fetchsOptions = computed<boolean>(() => {
    if (fetchFn.value === undefined) {
      return false;
    }

    return !needsMoreCharsToFetch.value;
  });

  const fetchingOptions = ref<boolean>(false);

  const fetchedOptionsHasMorePages = ref<boolean>(false);

  const fetchOptionsFn = (): void => {
    fetchFn.value!(searchQuery.value)
      .then((response: FetchedOptions | any) => {
        if (typeof response === 'object' && Object.prototype.hasOwnProperty.call(response, 'results')) {
          const {
            results,
            hasMorePages,
          } = response;

          if (Array.isArray(results) || results === undefined || typeof results === 'object') {
            fetchedOptions.value = results;
          } else {
            throw new Error(`Response.results must be an array or object, got ${typeof results}`);
          }

          fetchedOptionsHasMorePages.value = !!hasMorePages;
        } else {
          throw new Error('Options response must be an object with `results` property.');
        }

        optionsWereFetched.value = true;

        emit('fetch-options-success', response);
      }).catch((error) => {
        emit('fetch-options-error', error);
      }).then(() => {
        fetchingOptions.value = false;
      });
  };

  const debouncedFetchOptions = debounce(fetchOptionsFn, fetchDelay.value);

  const fetchOptions = () => {
    if (!fetchsOptions.value) {
      debouncedFetchOptions.cancel();
      fetchingOptions.value = false;
      return;
    }

    fetchingOptions.value = true;

    debouncedFetchOptions();
  };

  watch(searchQuery, () => {
    optionsWereFetched.value = false;
    fetchOptions();
  });

  const needsMoreCharsMessage = computed<string>((): string => {
    if (typeof fetchMinimumInputLengthText.value === 'string') {
      return fetchMinimumInputLengthText.value;
    }

    return fetchMinimumInputLengthText.value(fetchMinimumInputLength.value!, searchQuery.value);
  });

  return {
    normalizedOptions,
    flattenedOptions,
    fetchsOptions,
    needsMoreCharsToFetch,
    needsMoreCharsMessage,
    fetchingOptions,
    fetchedOptionsHasMorePages,
    optionsWereFetched,
    fetchOptions,
  };
}
