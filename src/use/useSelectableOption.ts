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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  watch(localValue, (newValue: any) => {
    if (multiple.value === true) {
      if (!Array.isArray(newValue)) {
        selectedOption.value = [];
      } else {
        selectedOption.value = newValue.map((value) => {
          if (Array.isArray(selectedOption.value)) {
            return selectedOption.value.find((option) => isEqual(option.value, value))
              || options.value.find((option) => isEqual(value, option.value));
          }

          return options.value.find((option) => isEqual(value, option.value));
        }).filter((option: NormalizedOption | undefined) => option !== undefined) as NormalizedOption[];
      }
    } else {
      let newSelectedOption: NormalizedOption | undefined;

      if (Array.isArray(selectedOption.value)) {
        newSelectedOption = selectedOption.value.find((option) => isEqual(option.value, newValue))
          || options.value.find((option) => isEqual(newValue, option.value));
      } else {
        newSelectedOption = options.value.find((option) => isEqual(newValue, option.value));
      }

      selectedOption.value = newSelectedOption;
    }
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
