import { ref } from 'vue';
import useMultioptions from '../../use/useMultioptions';
import { useSetup } from './useSetup';

describe('useMultioptions', () => {
  const options = ref(['A', 'B']);
  const textAttribute = ref(undefined);
  const valueAttribute = ref(undefined);
  const normalize = ref(true);
  it('returns normalized options', () => {
    useSetup(() => {
      const { normalizedOptions } = useMultioptions(
        options,
        textAttribute,
        valueAttribute,
        normalize,
      );

      expect(normalizedOptions.value).toEqual([
        { raw: 'A', text: 'A', value: 'A' },
        { raw: 'B', text: 'B', value: 'B' },
      ]);
    });
  });

  it('returns flattened options', () => {
    useSetup(() => {
      const { flattenedOptions } = useMultioptions(
        ref([
          { text: 'A', value: 'A' },
          {
            text: 'B', value: 'B', children: ['C'],
          },
        ]),
        textAttribute,
        valueAttribute,
        normalize,
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
      const { normalizedOptions } = useMultioptions(
        ref(undefined),
        textAttribute,
        valueAttribute,
        normalize,
      );

      expect(normalizedOptions.value).toEqual([]);
    });
  });

  it('accepts a custom `textAttribute`', () => {
    useSetup(() => {
      const { normalizedOptions } = useMultioptions(
        ref([
          { label: 'Letter A', value: 'A' },
          { label: 'Letter B', value: 'B' },
        ]),
        ref('label'),
        valueAttribute,
        normalize,
      );

      expect(normalizedOptions.value).toEqual([
        { raw: { label: 'Letter A', value: 'A' }, text: 'Letter A', value: 'A' },
        { raw: { label: 'Letter B', value: 'B' }, text: 'Letter B', value: 'B' },
      ]);
    });
  });

  it('accepts a custom `valueAttribute`', () => {
    useSetup(() => {
      const { normalizedOptions } = useMultioptions(
        ref([
          { text: 'A', identifier: 'a' },
          { text: 'B', identifier: 'b' },
        ]),
        textAttribute,
        ref('identifier'),
        normalize,
      );

      expect(normalizedOptions.value).toEqual([
        { raw: { text: 'A', identifier: 'a' }, text: 'A', value: 'a' },
        { raw: { text: 'B', identifier: 'b' }, text: 'B', value: 'b' },
      ]);
    });
  });

  it('doesnt normalize the options if normalize is `false`', () => {
    useSetup(() => {
      const { normalizedOptions } = useMultioptions(
        options,
        textAttribute,
        valueAttribute,
        ref(false),
      );

      expect(normalizedOptions.value).toEqual(options.value);
    });
  });
});
