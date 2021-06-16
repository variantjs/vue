import useMultioptions from '../../use/useMultioptions';
import { useSetup } from './useSetup';

describe('useMultioptions', () => {
  it('returns normalized options', () => {
    useSetup(() => {
      const data = useMultioptions({
        options: ['A', 'B'],
      }, 'options');

      expect(data.value).toEqual([
        { raw: 'A', text: 'A', value: 'A' },
        { raw: 'B', text: 'B', value: 'B' },
      ]);
    });
  });

  it('handles undefined values', () => {
    useSetup(() => {
      const data = useMultioptions({
        options: undefined,
      }, 'options');

      expect(data.value).toEqual([]);
    });
  });
});
