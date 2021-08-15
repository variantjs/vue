import { NormalizedOption } from '@variantjs/core';
import {
  ComputedRef, computed, ref, Ref,
} from 'vue';
import useSelectableOption from '../../use/useSelectableOption';
import { useSetup } from './useSetup';

describe('useSelectableOption', () => {
  const options: ComputedRef<NormalizedOption[]> = computed(() => [
    { value: 'a', text: 'Option A' },
    { value: 'b', text: 'Option B' },
    { value: 'c', text: 'Option C' },
  ]);

  const localValue: Ref = ref(null);

  const configuration: ComputedRef<any> = computed(() => ({}));

  beforeEach(() => {
    localValue.value = null;
  });

  it('contains an selectedOption ref and selectOption, toggleOption, optionIsSelected methods', () => {
    useSetup(() => {
      const {
        selectedOption, selectOption, toggleOption, optionIsSelected,
      } = useSelectableOption(
        options,
        localValue,
        configuration,
      );

      expect(typeof selectedOption).toBe('object');
      expect(typeof selectOption).toBe('function');
      expect(typeof toggleOption).toBe('function');
      expect(typeof optionIsSelected).toBe('function');
    });
  });
});
