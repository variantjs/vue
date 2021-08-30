import { nextTick, ref } from 'vue';
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

    it('returns flattened options', () => {
      useSetup(() => {
        const { flattenedOptions } = useFetchsOptions(
          ref([
            { text: 'A', value: 'A' },
            {
              text: 'B', value: 'B', children: ['C'],
            },
          ]),
          textAttribute,
          valueAttribute,
          normalize,
          searchQuery,
          fetchFn,
          fetchDelay,
          fetchMinimumInputLength,
          fetchMinimumInputLengthText,
        );

        expect(flattenedOptions.value).toEqual(
          [
            { value: 'A', text: 'A', raw: { text: 'A', value: 'A' } },
            { value: 'C', text: 'C', raw: 'C' },
          ],
        );
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

  describe('with fetch function', () => {
    beforeEach(() => {
      options.value = [];
      fetchFn.value = () => new Promise((resolve) => resolve({
        results: ['A', 'B'],
      }));
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('returns normalized options', () => {
      useSetup(async () => {
        const { normalizedOptions, fetchOptions } = useFetchsOptions(
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

        expect(normalizedOptions.value).toEqual([]);

        fetchOptions();

        await nextTick();

        expect(normalizedOptions.value).toEqual([
          { raw: 'A', text: 'A', value: 'A' },
          { raw: 'B', text: 'B', value: 'B' },
        ]);
      });
    });

    it('handles undefined options', () => {
      useSetup(async () => {
        fetchFn.value = () => new Promise((resolve) => resolve({
          results: undefined!,
        }));

        const { fetchOptions, normalizedOptions } = useFetchsOptions(
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

        expect(normalizedOptions.value).toEqual([]);

        fetchOptions();

        await nextTick();

        expect(normalizedOptions.value).toEqual([
          { raw: 'A', text: 'A', value: 'A' },
          { raw: 'B', text: 'B', value: 'B' },
        ]);
      });
    });

    it('accepts a custom `textAttribute`', () => {
      useSetup(async () => {
        fetchFn.value = () => new Promise((resolve) => resolve({
          results: [
            { label: 'Letter A', value: 'A' },
            { label: 'Letter B', value: 'B' },
          ],
        }));

        const { normalizedOptions, fetchOptions } = useFetchsOptions(
          options,
          ref('label'),
          valueAttribute,
          normalize,
          searchQuery,
          fetchFn,
          fetchDelay,
          fetchMinimumInputLength,
          fetchMinimumInputLengthText,
        );

        expect(normalizedOptions.value).toEqual([]);

        fetchOptions();

        await nextTick();

        expect(normalizedOptions.value).toEqual([
          { raw: { label: 'Letter A', value: 'A' }, text: 'Letter A', value: 'A' },
          { raw: { label: 'Letter B', value: 'B' }, text: 'Letter B', value: 'B' },
        ]);
      });
    });

    it('accepts a custom `valueAttribute`', () => {
      useSetup(async () => {
        fetchFn.value = () => new Promise((resolve) => resolve({
          results: [
            { text: 'A', identifier: 'a' },
            { text: 'B', identifier: 'b' },
          ],
        }));

        const { normalizedOptions, fetchOptions } = useFetchsOptions(
          options,
          textAttribute,
          ref('identifier'),
          normalize,
          searchQuery,
          fetchFn,
          fetchDelay,
          fetchMinimumInputLength,
          fetchMinimumInputLengthText,
        );

        expect(normalizedOptions.value).toEqual([]);

        fetchOptions();

        await nextTick();

        expect(normalizedOptions.value).toEqual([
          { raw: { text: 'A', identifier: 'a' }, text: 'A', value: 'a' },
          { raw: { text: 'B', identifier: 'b' }, text: 'B', value: 'b' },
        ]);
      });
    });

    it('doesnt normalize the options if normalize is `false`', () => {
      useSetup(async () => {
        const { normalizedOptions, fetchOptions } = useFetchsOptions(
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

        expect(normalizedOptions.value).toEqual([]);

        fetchOptions();

        await nextTick();

        expect(normalizedOptions.value).toEqual(options.value);
      });
    });

    describe('with a custom delay', () => {
      beforeEach(() => {
        fetchDelay.value = 200;
        jest.useFakeTimers();
      });

      afterEach(() => {
        jest.useRealTimers();
      });

      it('fetchs after 200ms', () => {
        const fetchFunctionMock = jest.fn();

        fetchFn.value = fetchFunctionMock;

        searchQuery.value = 'test ';

        useSetup(async () => {
          const { normalizedOptions, fetchOptions } = useFetchsOptions(
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

          expect(normalizedOptions.value).toEqual([]);

          fetchOptions();

          expect(fetchFunctionMock).not.toHaveBeenCalled();

          jest.advanceTimersByTime(199);

          expect(fetchFunctionMock).not.toHaveBeenCalled();

          jest.advanceTimersByTime(1);

          expect(fetchFunctionMock).toHaveBeenCalled();
        });
      });

      it('throtles the search', () => {
        const fetchFunctionMock = jest.fn();

        fetchFn.value = fetchFunctionMock;

        searchQuery.value = 'test ';

        useSetup(async () => {
          const { normalizedOptions, fetchOptions } = useFetchsOptions(
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

          expect(normalizedOptions.value).toEqual([]);

          fetchOptions();

          expect(fetchFunctionMock).not.toHaveBeenCalled();

          jest.advanceTimersByTime(199);

          expect(fetchFunctionMock).not.toHaveBeenCalled();

          // Since its throttled it will reset the counter
          fetchOptions();

          jest.advanceTimersByTime(199);

          expect(fetchFunctionMock).not.toHaveBeenCalled();

          jest.advanceTimersByTime(1);

          expect(fetchFunctionMock).toHaveBeenCalled();
        });
      });
    });

    describe('with a minimum input length', () => {
      beforeEach(() => {
        fetchMinimumInputLength.value = 3;
      });

      it('doesnt fetch if no query', () => {
        const fetchFunctionMock = jest.fn();

        fetchFn.value = fetchFunctionMock;

        useSetup(async () => {
          const { normalizedOptions, fetchOptions } = useFetchsOptions(
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

          expect(normalizedOptions.value).toEqual([]);

          fetchOptions();

          expect(fetchFunctionMock).not.toHaveBeenCalled();
        });
      });

      it('determines that needsMoreCharsToFetch if query is shorter that the min input length', () => {
        const fetchFunctionMock = jest.fn();

        fetchFn.value = fetchFunctionMock;

        searchQuery.value = 'te';

        useSetup(async () => {
          const { needsMoreCharsToFetch } = useFetchsOptions(
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

          expect(needsMoreCharsToFetch.value).toBe(true);
        });
      });

      it('determines that doesnt needsMoreCharsToFetch if query is exactly the min input length', () => {
        const fetchFunctionMock = jest.fn();

        fetchFn.value = fetchFunctionMock;

        searchQuery.value = 'tes';

        useSetup(async () => {
          const { needsMoreCharsToFetch } = useFetchsOptions(
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

          expect(needsMoreCharsToFetch.value).toBe(false);
        });
      });

      it('doesnt fetch if the query is shorter than the min input length', () => {
        const fetchFunctionMock = jest.fn();

        fetchFn.value = fetchFunctionMock;

        searchQuery.value = 'te';

        useSetup(async () => {
          const { normalizedOptions, fetchOptions } = useFetchsOptions(
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

          expect(normalizedOptions.value).toEqual([]);

          fetchOptions();

          expect(fetchFunctionMock).not.toHaveBeenCalled();
        });
      });

      it('fetchs if the query is exactly the min input length', () => {
        const fetchFunctionMock = jest.fn();

        fetchFn.value = fetchFunctionMock;

        searchQuery.value = 'tes';

        useSetup(async () => {
          const { normalizedOptions, fetchOptions } = useFetchsOptions(
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

          expect(normalizedOptions.value).toEqual([]);

          fetchOptions();

          expect(fetchFunctionMock).toHaveBeenCalled();
        });
      });

      it('fetchs if the query is larger that the min input length', () => {
        const fetchFunctionMock = jest.fn();

        fetchFn.value = fetchFunctionMock;

        searchQuery.value = 'te';

        useSetup(async () => {
          const { normalizedOptions, fetchOptions } = useFetchsOptions(
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

          expect(normalizedOptions.value).toEqual([]);

          fetchOptions();

          expect(fetchFunctionMock).toHaveBeenCalled();
        });
      });

      it('builds the fetch minimum input length text', () => {
        useSetup(() => {
          const { needsMoreCharsMessage } = useFetchsOptions(
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

          expect(needsMoreCharsMessage.value).toBe('Please enter 3 or more characters');
        });
      });

      it('accepts a string as the minimum input length text', () => {
        fetchMinimumInputLengthText.value = 'test';
        useSetup(() => {
          const { needsMoreCharsMessage } = useFetchsOptions(
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

          expect(needsMoreCharsMessage.value).toBe('test');
        });
      });

      it('pass the minimum input length text and the query to the fetchMinimumInputLengthText function ', () => {
        const fetchMinimumInputLengthTextMock = jest.fn().mockImplementation(() => 'test');

        fetchMinimumInputLengthText.value = fetchMinimumInputLengthTextMock;

        searchQuery.value = 'te';

        useSetup(() => {
          const { needsMoreCharsMessage } = useFetchsOptions(
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

          expect(needsMoreCharsMessage.value).toBe('test');

          expect(fetchMinimumInputLengthTextMock).toHaveBeenCalledWith(3, 'te');
        });
      });
    });

    describe('with search query', () => {
      it('filters by the search query', () => {
        const fetchFunctionMock = jest.fn();

        fetchFn.value = fetchFunctionMock;

        searchQuery.value = 'test ';

        useSetup(async () => {
          const { normalizedOptions, fetchOptions } = useFetchsOptions(
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

          expect(normalizedOptions.value).toEqual([]);

          fetchOptions();

          expect(fetchFunctionMock).toHaveBeenCalledWith('test ');
        });
      });
    });
  });
});
