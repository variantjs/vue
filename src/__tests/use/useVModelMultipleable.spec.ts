import useVModelMultipleable from '../../use/useVModelMulipleable';
import { useSetup } from './useSetup';

describe('useVModelMultipleable.spec', () => {
  it('should return an empty array if multiple and no value', () => {
    useSetup(() => {
      const data = useVModelMultipleable({
        modelValue: undefined,
        multiple: true,
      }, 'modelValue');
      expect(data.value).toEqual([]);
    });
  });

  it('should return an array if multiple is an empty string', () => {
    useSetup(() => {
      const data = useVModelMultipleable({
        modelValue: undefined,
        multiple: '',
      }, 'modelValue');
      expect(data.value).toEqual([]);
    });
  });
  it('should return an array if multiple is `true` string', () => {
    useSetup(() => {
      const data = useVModelMultipleable({
        modelValue: undefined,
        multiple: 'true',
      }, 'modelValue');
      expect(data.value).toEqual([]);
    });
  });

  it('should return an array if multiple is `false` strin', () => {
    useSetup(() => {
      const data = useVModelMultipleable({
        modelValue: undefined,
        multiple: 'false',
      }, 'modelValue');
      expect(data.value).toEqual([]);
    });
  });

  it('should return undefined multiple is `false`', () => {
    useSetup(() => {
      const data = useVModelMultipleable({
        modelValue: undefined,
        multiple: false,
      }, 'modelValue');
      expect(data.value).toBeUndefined();
    });
  });

  it('should return the default value', () => {
    useSetup(() => {
      const data = useVModelMultipleable({
        modelValue: 'default',
        multiple: true,
      }, 'modelValue');
      expect(data.value).toBe('default');
    });
  });
});
