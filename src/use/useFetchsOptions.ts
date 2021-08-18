import { debounce, NormalizedOptions, normalizeOptions } from '@variantjs/core';
import {
  computed, Ref, ref, ComputedRef, getCurrentInstance, watch,
} from 'vue';
import { FetchedOptions, FetchOptionsFn } from '../types';

export default function useFetchsOptions(
  fn: Ref<FetchOptionsFn | undefined>,
  query: Ref<string | undefined>,
  delay: Ref<number | undefined>,
  minimumInputLength: Ref<number | undefined>,
): {
    fetchsOptions: ComputedRef<boolean>,
    fetchedOptions: Ref<NormalizedOptions>,
    fetchingOptions: Ref<boolean>,
    fetchedOptionsHasMorePages: Ref<boolean>,
    fetchOptions: () => void,
  } {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { emit } = getCurrentInstance()!;

  const fetchsOptions = computed<boolean>(() => {
    if (fn.value === undefined) {
      return false;
    }

    if (minimumInputLength.value === undefined) {
      return true;
    }

    return query.value !== undefined && query.value.length >= minimumInputLength.value;
  });

  const fetchedOptions = ref<NormalizedOptions>([]);

  const fetchingOptions = ref<boolean>(false);

  const fetchedOptionsHasMorePages = ref<boolean>(false);

  const fetchOptionsFn = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fn.value!(query.value)
      .then((response: FetchedOptions | any) => {
        if (typeof response === 'object' && Object.prototype.hasOwnProperty.call(response, 'results')) {
          const {
            results,
            hasMorePages,
          } = response;

          if (Array.isArray(results) || results === undefined || typeof results === 'object') {
            fetchedOptions.value = normalizeOptions(results);
          } else {
            throw new Error(`Response.results must be an array or object, got ${typeof results}`);
          }

          fetchedOptionsHasMorePages.value = !!hasMorePages;
        } else {
          throw new Error('Options response must be an object with `results` property.');
        }

        emit('fetch-options-success', response);
      }).catch((error) => {
        emit('fetch-options-error', error);
      }).then(() => {
        fetchingOptions.value = false;
      });
  };

  const debouncedFetchOptions = debounce(fetchOptionsFn, delay.value);

  const fetchOptions = () => {
    if (!fetchsOptions.value) {
      debouncedFetchOptions.cancel();
      fetchingOptions.value = false;
      return;
    }

    fetchingOptions.value = true;

    debouncedFetchOptions();
  };

  watch(query, () => {
    fetchOptions();
  });

  return {
    fetchsOptions,
    fetchedOptions,
    fetchingOptions,
    fetchedOptionsHasMorePages,
    fetchOptions,
  };
}
