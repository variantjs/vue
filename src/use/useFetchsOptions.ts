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
  fetchMinimumInputLengthText: Ref<MinimumInputLengthTextProp>,
): {
    normalizedOptions: ComputedRef<NormalizedOptions>
    flattenedOptions: ComputedRef<NormalizedOption[]>
    fetchsOptions: ComputedRef<boolean>,
    needsMoreCharsToFetch: ComputedRef<boolean>,
    needsMoreCharsMessage: ComputedRef<string>,
    fetchingOptions: Ref<boolean>,
    fetchingMoreOptions: Ref<boolean>,
    fetchedOptionsHaveMorePages: Ref<boolean>,
    optionsWereFetched: Ref<boolean>,
    fetchOptions: () => void,
    fetchMoreOptions: () => void,
    fetchOptionsCancel: () => void,
  } {
  const { emit } = getCurrentInstance()!;

  const getNormalizedOptions = (rawOptions: InputOptions): NormalizedOptions => (normalize.value
    ? normalizeOptions(rawOptions, textAttribute.value, valueAttribute.value)
    : rawOptions as NormalizedOptions);

  const fetchedOptions = ref<NormalizedOptions>(getNormalizedOptions(options.value || []));

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

    return fetchedOptions.value;
  });

  const flattenedOptions = computed<NormalizedOption[]>(() => flattenOptions(normalizedOptions.value));

  const fetchsOptions = computed<boolean>(() => fetchFn.value !== undefined);

  const needsMoreCharsToFetch = computed<boolean>(() => {
    if (!fetchsOptions.value) {
      return false;
    }

    if (!fetchMinimumInputLength.value) {
      return false;
    }

    return !searchQuery.value || searchQuery.value.length < fetchMinimumInputLength.value;
  });

  const fetchNextPage = ref<number | undefined>(undefined);

  const fetchingOptions = ref<boolean>(false);

  const fetchingMoreOptions = ref<boolean>(false);

  const fetchedOptionsHaveMorePages = computed<boolean>(() => fetchNextPage.value !== undefined);

  const fetchOptionsFn = ([nextPage]: [number | undefined]): void => {
    fetchFn.value!(searchQuery.value, nextPage)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((response: FetchedOptions | any) => {
        if (typeof response === 'object' && Object.prototype.hasOwnProperty.call(response, 'results')) {
          const {
            results,
            hasMorePages,
          } = response;

          if (!Array.isArray(results) && results !== undefined && typeof results !== 'object') {
            throw new Error(`Response.results must be an array or object, got ${typeof results}`);
          }

          if (nextPage !== undefined && nextPage >= 2) {
            fetchedOptions.value = fetchedOptions.value.concat(getNormalizedOptions(results));
          } else {
            fetchedOptions.value = getNormalizedOptions(results);
          }

          if (hasMorePages) {
            fetchNextPage.value = fetchNextPage.value === undefined ? 2 : fetchNextPage.value + 1;
          } else {
            fetchNextPage.value = undefined;
          }
        } else {
          throw new Error('Options response must be an object with `results` property.');
        }

        optionsWereFetched.value = true;

        emit('fetch-options-success', response);
      }).catch((error) => {
        emit('fetch-options-error', error);
      }).then(() => {
        fetchingOptions.value = false;
        fetchingMoreOptions.value = false;
      });
  };

  const debouncedFetchOptions = debounce(fetchOptionsFn, fetchDelay.value);

  const fetchOptionsCancel = () => {
    debouncedFetchOptions.cancel();
    fetchingOptions.value = false;
    fetchingMoreOptions.value = false;
  };

  const fetchOptions = (nextPage?: number) => {
    if (!fetchsOptions.value) {
      fetchOptionsCancel();
      return;
    }

    if (nextPage !== undefined && nextPage >= 2) {
      fetchingMoreOptions.value = true;
    } else {
      fetchingOptions.value = true;
    }

    debouncedFetchOptions(nextPage);
  };

  const fetchMoreOptions = () => {
    fetchOptions(fetchNextPage.value);
  };

  watch(searchQuery, () => {
    if (!fetchsOptions.value || needsMoreCharsToFetch.value) {
      return;
    }

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
    fetchingMoreOptions,
    fetchedOptionsHaveMorePages,
    optionsWereFetched,
    fetchOptions,
    fetchMoreOptions,
    fetchOptionsCancel,
  };
}
