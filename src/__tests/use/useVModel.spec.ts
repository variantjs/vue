import useVModel from '../../use/useVModel';
import { useSetup } from './useSetup';

describe('useVModel', () => {
  const defaultValue = 'default';

  it('should work with default value', () => {
    useSetup(() => {
      const data = useVModel({
        modelValue: defaultValue,
      }, 'modelValue');
      expect(data.value).toBe(defaultValue);
    });
  });

  it('should work with a different value from the default', () => {
    useSetup(() => {
      const data = useVModel({
        otherValue: defaultValue,
      }, 'otherValue');
      expect(data.value).toBe(defaultValue);
    });
  });
});
