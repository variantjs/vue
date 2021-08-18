import { isEqual, NormalizedOption } from '@variantjs/core';
import {
  computed, ComputedRef, Ref, ref, watch,
} from 'vue';

export default function useActivableOption(
  options: ComputedRef<NormalizedOption[]>,
  localValue: Ref,
): {
    activeOption: Ref<NormalizedOption | null>,
    initActiveOption: () => void,
    optionIsActive: (option: NormalizedOption) => boolean,
    setActiveOption: (option: NormalizedOption) => void,
    setNextOptionActive: () => void,
    setPrevOptionActive: () => void,
  } {
  const getActiveOption = (): NormalizedOption | null => {
    const selectedOption = options.value.find((option: NormalizedOption) => isEqual(option.value, localValue.value));

    if (selectedOption !== undefined) {
      return selectedOption;
    }

    if (options.value.length > 0) {
      return options.value[0];
    }

    return null;
  };

  const activeOption = ref<NormalizedOption | null>(getActiveOption());

  const activeOptionIndex = computed((): number => {
    if (activeOption.value === null) {
      return 0;
    }

    const index = options.value.findIndex((option) => isEqual(option.value, (activeOption.value as NormalizedOption).value));

    return index < 0 ? 0 : index;
  });

  const optionIsActive = (option: NormalizedOption): boolean => (activeOption.value === null ? false : isEqual(activeOption.value.value, option.value));

  const setActiveOption = (option: NormalizedOption): void => {
    activeOption.value = option;
  };

  const setNextOptionActive = (): void => {
    if (activeOptionIndex.value >= options.value.length - 1) {
      return;
    }

    const newActiveOption = options.value[activeOptionIndex.value + 1];
    setActiveOption(newActiveOption);
  };

  const setPrevOptionActive = (): void => {
    if (activeOptionIndex.value === 0) {
      return;
    }

    const newActiveOption = options.value[activeOptionIndex.value - 1];

    setActiveOption(newActiveOption);
  };

  const initActiveOption = (): void => {
    activeOption.value = getActiveOption();
  };

  watch(options, () => {
    initActiveOption();
  });

  return {
    activeOption,
    initActiveOption,
    optionIsActive,
    setActiveOption,
    setNextOptionActive,
    setPrevOptionActive,
  };
}
