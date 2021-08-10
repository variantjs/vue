/* eslint-disable no-param-reassign */
import {
  addToArray, Data, isEqual, NormalizedOption, substractFromArray, WithVariantPropsAndClassesList,
} from '@variantjs/core';
import {
  computed, ComputedRef, Ref,
} from 'vue';

export default function useSelectableOption<C extends WithVariantPropsAndClassesList<Data, string>>(
  options: ComputedRef<NormalizedOption[]>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localValue: Ref<any>,
  configuration: ComputedRef<C>,
): {
    selectedOption: ComputedRef<NormalizedOption | undefined>,
    selectOption: (option: NormalizedOption) => void,
    toggleOption: (option: NormalizedOption) => void,
    optionIsSelected: (option: NormalizedOption) => boolean,
  } {
  const selectedOption = computed((): NormalizedOption | undefined => options.value.find((option) => isEqual(option.value, localValue.value)));

  const optionIsSelected = (option: NormalizedOption): boolean => {
    if (configuration.value.multiple === true && Array.isArray(localValue.value)) {
      return localValue.value.some((value) => isEqual(value, option.value));
    }

    return isEqual(localValue.value, option.value);
  };

  const selectOption = (option: NormalizedOption): void => {
    if (optionIsSelected(option)) {
      return;
    }

    if (Array.isArray(localValue.value)) {
      localValue.value = addToArray(localValue.value, option.value);
    } else {
      localValue.value = option.value;
    }
  };

  const toggleOption = (option: NormalizedOption): void => {
    if (optionIsSelected(option)) {
      if (Array.isArray(localValue.value)) {
        localValue.value = substractFromArray(localValue.value, option.value);
      } else {
        localValue.value = undefined;
      }
    } else if (Array.isArray(localValue.value)) {
      localValue.value = addToArray(localValue.value, option.value);
    } else {
      localValue.value = option.value;
    }
  };

  return {
    selectedOption,
    selectOption,
    toggleOption,
    optionIsSelected,
  };
}
