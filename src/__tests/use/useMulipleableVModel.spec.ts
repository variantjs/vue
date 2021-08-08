import useMulipleableVModel from '../../use/useMulipleableVModel';
import { useSetup } from './useSetup';

describe('useMulipleableVModel.spec', () => {
  it('should return an empty array if multiple and no value', () => {
    useSetup(() => {
      const { localValue } = useMulipleableVModel({
        modelValue: undefined,
        multiple: true,
      }, 'modelValue');
      expect(localValue.value).toEqual([]);
    });
  });

  it('should return an array if multiple is an empty string', () => {
    useSetup(() => {
      const { localValue } = useMulipleableVModel({
        modelValue: undefined,
        multiple: '',
      }, 'modelValue');
      expect(localValue.value).toEqual([]);
    });
  });
  it('should return an array if multiple is `true` string', () => {
    useSetup(() => {
      const { localValue } = useMulipleableVModel({
        modelValue: undefined,
        multiple: 'true',
      }, 'modelValue');
      expect(localValue.value).toEqual([]);
    });
  });

  it('should return an array if multiple is `false` strin', () => {
    useSetup(() => {
      const { localValue } = useMulipleableVModel({
        modelValue: undefined,
        multiple: 'false',
      }, 'modelValue');
      expect(localValue.value).toEqual([]);
    });
  });

  it('should return undefined multiple is `false`', () => {
    useSetup(() => {
      const { localValue } = useMulipleableVModel({
        modelValue: undefined,
        multiple: false,
      }, 'modelValue');
      expect(localValue.value).toBeUndefined();
    });
  });

  it('should return the default value', () => {
    useSetup(() => {
      const { localValue } = useMulipleableVModel({
        modelValue: 'default',
        multiple: true,
      }, 'modelValue');
      expect(localValue.value).toBe('default');
    });
  });
});
