import { computed } from 'vue';
import useMulipleableVModel from '../../use/useMulipleableVModel';
import { useSetup } from './useSetup';

describe('useMulipleableVModel.spec', () => {
  it('should return an empty array if multiple and no value', () => {
    const configuration = computed(() => ({ multiple: true }));
    useSetup(() => {
      const { localValue } = useMulipleableVModel({
        modelValue: undefined,
      }, 'modelValue', configuration);
      expect(localValue.value).toEqual([]);
    });
  });

  it('should return an array if multiple is an empty string', () => {
    const configuration = computed(() => ({ multiple: '' }));

    useSetup(() => {
      const { localValue } = useMulipleableVModel({
        modelValue: undefined,
      }, 'modelValue', configuration);
      expect(localValue.value).toEqual([]);
    });
  });
  it('should return an array if multiple is `true` string', () => {
    const configuration = computed(() => ({ multiple: 'true' }));
    useSetup(() => {
      const { localValue } = useMulipleableVModel({
        modelValue: undefined,
      }, 'modelValue', configuration);
      expect(localValue.value).toEqual([]);
    });
  });

  it('should return an array if multiple is `false` string', () => {
    const configuration = computed(() => ({ multiple: 'false' }));
    useSetup(() => {
      const { localValue } = useMulipleableVModel({
        modelValue: undefined,
      }, 'modelValue', configuration);
      expect(localValue.value).toEqual([]);
    });
  });

  it('should return undefined multiple is `false`', () => {
    const configuration = computed(() => ({ multiple: false }));
    useSetup(() => {
      const { localValue } = useMulipleableVModel({
        modelValue: undefined,
      }, 'modelValue', configuration);
      expect(localValue.value).toBeUndefined();
    });
  });

  it('should return the default value', () => {
    const configuration = computed(() => ({ multiple: true }));
    useSetup(() => {
      const { localValue } = useMulipleableVModel({
        modelValue: 'default',
      }, 'modelValue', configuration);
      expect(localValue.value).toBe('default');
    });
  });
});
