/* eslint-disable no-param-reassign */
import {
  addToArray, isEqual, NormalizedOption, substractFromArray,
} from '@variantjs/core';
import {
  computed, ComputedRef, Ref, ref, watch,
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

  const getSelectedOption = (currentSelectedOption?: SelectedOption): SelectedOption => {
    let allOptions: NormalizedOption[] = options.value;

    // If the option is part of the current selected option is desired to use
    // those option since its possible that the options is not in the list
    // For example: an option that was selected from an ajax list but was removed
    if (Array.isArray(currentSelectedOption)) {
      allOptions = allOptions
        // Remove the options that are also on the current selected option list
        .filter((option) => !currentSelectedOption.some((selectedOption) => isEqual(selectedOption.value, option.value)))
        // Concat the current selected option list
        .concat(currentSelectedOption);
    } else if (currentSelectedOption !== undefined) {
      allOptions = allOptions
        // Remove the selected option if already exists in the list so it
        // can be replaced with the selected option
        .filter((option) => !isEqual(currentSelectedOption.value, option.value))
        .concat([currentSelectedOption]);
    }

    if (multiple.value === true) {
      if (Array.isArray(localValue.value)) {
        return allOptions.filter((option) => optionIsSelected(option));
      }

      return [];
    }

    return allOptions.find((option) => optionIsSelected(option));
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
      } else {
        localValue.value = undefined;
      }
    } else if (multiple.value === true) {
      if (Array.isArray(localValue.value)) {
        localValue.value = addToArray(localValue.value, option.value);
      } else {
        localValue.value = [option.value];
      }
    } else {
      localValue.value = option.value;
    }
  };

  watch([options, localValue], () => {
    selectedOption.value = getSelectedOption(selectedOption.value);
  });

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
