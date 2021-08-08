import useMultioptions from '../../use/useMultioptions';
import { useSetup } from './useSetup';

describe('useMultioptions', () => {
  it('returns normalized options', () => {
    useSetup(() => {
      const { normalizedOptions } = useMultioptions({
        options: ['A', 'B'],
      }, 'options');

      expect(normalizedOptions.value).toEqual([
        { raw: 'A', text: 'A', value: 'A' },
        { raw: 'B', text: 'B', value: 'B' },
      ]);
    });
  });

  it('handles undefined values', () => {
    useSetup(() => {
      const { normalizedOptions } = useMultioptions({
        options: undefined,
      }, 'options');

      expect(normalizedOptions.value).toEqual([]);
    });
  });
});
