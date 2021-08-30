import { ref } from 'vue';
import { FetchOptionsFn, MinimumInputLengthTextProp } from '../../types';
import useFetchsOptions from '../../use/useFetchsOptions';
import { useSetup } from './useSetup';

describe('useFetchsOptions', () => {
  const options = ref(['A', 'B']);
  const textAttribute = ref<string | undefined>(undefined);
  const valueAttribute = ref<string | undefined>(undefined);
  const normalize = ref<boolean>(true);
  const searchQuery = ref<string | undefined>(undefined);
  const fetchFn = ref<FetchOptionsFn | undefined>(undefined);
  const fetchDelay = ref<number | undefined>(undefined);
  const fetchMinimumInputLength = ref<number | undefined>(undefined);
  const fetchMinimumInputLengthText = ref<MinimumInputLengthTextProp>((minimumInputLength: number): string => `Please enter ${minimumInputLength} or more characters`);

  beforeEach(() => {
    options.value = ['A', 'B'];
    textAttribute.value = undefined;
    valueAttribute.value = undefined;
    normalize.value = true;
    searchQuery.value = undefined;
    fetchFn.value = undefined;
    fetchDelay.value = undefined;
    fetchMinimumInputLength.value = undefined;
    fetchMinimumInputLengthText.value = (minimumInputLength: number): string => `Please enter ${minimumInputLength} or more characters`;
  });

  describe('no fetch function', () => {
    it('returns normalized options', () => {
      useSetup(() => {
        const { normalizedOptions } = useFetchsOptions(
          options,
          textAttribute,
          valueAttribute,
          normalize,
          searchQuery,
          fetchFn,
          fetchDelay,
          fetchMinimumInputLength,
          fetchMinimumInputLengthText,
        );

        expect(normalizedOptions.value).toEqual([
          { raw: 'A', text: 'A', value: 'A' },
          { raw: 'B', text: 'B', value: 'B' },
        ]);
      });
    });

    it('handles undefined options', () => {
      useSetup(() => {
        const { normalizedOptions } = useFetchsOptions(
          ref(undefined),
          textAttribute,
          valueAttribute,
          normalize,
          searchQuery,
          fetchFn,
          fetchDelay,
          fetchMinimumInputLength,
          fetchMinimumInputLengthText,
        );

        expect(normalizedOptions.value).toEqual([]);
      });
    });

    it('accepts a custom `textAttribute`', () => {
      useSetup(() => {
        const { normalizedOptions } = useFetchsOptions(
          ref([
            { label: 'Letter A', value: 'A' },
            { label: 'Letter B', value: 'B' },
          ]),
          ref('label'),
          valueAttribute,
          normalize,
          searchQuery,
          fetchFn,
          fetchDelay,
          fetchMinimumInputLength,
          fetchMinimumInputLengthText,
        );

        expect(normalizedOptions.value).toEqual([
          { raw: { label: 'Letter A', value: 'A' }, text: 'Letter A', value: 'A' },
          { raw: { label: 'Letter B', value: 'B' }, text: 'Letter B', value: 'B' },
        ]);
      });
    });

    it('accepts a custom `valueAttribute`', () => {
      useSetup(() => {
        const { normalizedOptions } = useFetchsOptions(
          ref([
            { text: 'A', identifier: 'a' },
            { text: 'B', identifier: 'b' },
          ]),
          textAttribute,
          ref('identifier'),
          normalize,
          searchQuery,
          fetchFn,
          fetchDelay,
          fetchMinimumInputLength,
          fetchMinimumInputLengthText,
        );

        expect(normalizedOptions.value).toEqual([
          { raw: { text: 'A', identifier: 'a' }, text: 'A', value: 'a' },
          { raw: { text: 'B', identifier: 'b' }, text: 'B', value: 'b' },
        ]);
      });
    });

    it('doesnt normalize the options if normalize is `false`', () => {
      useSetup(() => {
        const { normalizedOptions } = useFetchsOptions(
          options,
          textAttribute,
          valueAttribute,
          ref(false),
          searchQuery,
          fetchFn,
          fetchDelay,
          fetchMinimumInputLength,
          fetchMinimumInputLengthText,
        );

        expect(normalizedOptions.value).toEqual(options.value);
      });
    });

    describe('with search query', () => {
      it('filters by the search query', () => {
        options.value = ['Option A', 'Option B', 'Option B2'];
        searchQuery.value = 'b ';
        useSetup(() => {
          const { normalizedOptions } = useFetchsOptions(
            options,
            textAttribute,
            valueAttribute,
            normalize,
            searchQuery,
            fetchFn,
            fetchDelay,
            fetchMinimumInputLength,
            fetchMinimumInputLengthText,
          );

          expect(normalizedOptions.value).toEqual([
            { raw: 'Option B', text: 'Option B', value: 'Option B' },
            { raw: 'Option B2', text: 'Option B2', value: 'Option B2' },
          ]);
        });
      });
    });
  });
});
