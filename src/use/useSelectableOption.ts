/* eslint-disable no-param-reassign */
import {
  addToArray, isEqual, NormalizedOption, substractFromArray,
} from '@variantjs/core';
import {
  computed, ComputedRef, Ref, ref,
} from 'vue';

type SelectedOption = NormalizedOption | NormalizedOption[] | undefined;

export default function useSelectableOption(
  options: Ref<NormalizedOption[]>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localValue: Ref<any>,
  multiple: Ref<boolean>,
): {
    selectedOption: Ref<SelectedOption>,
    hasSelectedOption: ComputedRef<boolean>,
    selectOption: (option: NormalizedOption) => void,
    toggleOption: (option: NormalizedOption) => void,
    optionIsSelected: (option: NormalizedOption) => boolean,
  } {
  const optionIsSelected = (option: NormalizedOption): boolean => {
    if (multiple.value === true) {
      return Array.isArray(localValue.value)
          && localValue.value.some((value) => isEqual(value, option.value));
    }

    return isEqual(localValue.value, option.value);
  };

  const getSelectedOption = (): SelectedOption => {
    if (multiple.value === true) {
      if (!Array.isArray(localValue.value)) {
        return [];
      }

      return options.value.filter((option) => optionIsSelected(option));
    }

    return options.value.find((option) => optionIsSelected(option));
  };

  const selectedOption = ref<SelectedOption>(getSelectedOption());

  const selectOption = (option: NormalizedOption): void => {
    if (optionIsSelected(option)) {
      return;
    }

    if (multiple.value === true) {
      if (Array.isArray(localValue.value)) {
        localValue.value = addToArray(localValue.value, option.value);
        selectedOption.value = addToArray(selectedOption.value, option);
      } else {
        localValue.value = [option.value];
        selectedOption.value = [option];
      }
    } else {
      localValue.value = option.value;
      selectedOption.value = option;
    }
  };

  const toggleOption = (option: NormalizedOption): void => {
    if (optionIsSelected(option)) {
      if (multiple.value === true) {
        localValue.value = substractFromArray(localValue.value, option.value);
        selectedOption.value = substractFromArray(selectedOption.value, option);
      } else {
        localValue.value = undefined;
        selectedOption.value = undefined;
      }
    } else if (multiple.value === true) {
      if (Array.isArray(localValue.value)) {
        localValue.value = addToArray(localValue.value, option.value);
        selectedOption.value = addToArray(selectedOption.value, option);
      } else {
        localValue.value = [option.value];
        selectedOption.value = [option];
        selectedOption.value = option;
      }
    } else {
      localValue.value = option.value;
      selectedOption.value = option;
    }
  };

  const hasSelectedOption = computed((): boolean => {
    if (multiple.value === true) {
      return (selectedOption.value as NormalizedOption[]).length > 0;
    }

    return selectedOption.value !== undefined;
  });

  return {
    selectedOption,
    hasSelectedOption,
    selectOption,
    toggleOption,
    optionIsSelected,
  };
}
