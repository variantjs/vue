/* eslint-disable no-param-reassign */
import {
  addToArray, isEqual, NormalizedOption, substractFromArray, WithVariantPropsAndClassesList,
} from '@variantjs/core';
import {
  computed, ComputedRef, WritableComputedRef,
} from 'vue';
import { Data } from '../types';

export default function useSelectedOption<C extends WithVariantPropsAndClassesList<Data, string>>(
  options: ComputedRef<NormalizedOption[]>,
  localValue: WritableComputedRef<any>,
  configuration: ComputedRef<C>,
): {
    selectedOption: ComputedRef<NormalizedOption | undefined>,
    optionIsSelected: (option: NormalizedOption) => boolean,
    toggleOption: (option: NormalizedOption) => void,
  } {
  const selectedOption = computed((): NormalizedOption | undefined => options.value.find((option) => isEqual(option.value, localValue.value)));

  const optionIsSelected = (option: NormalizedOption): boolean => {
    if (configuration.value.multiple === true && Array.isArray(localValue.value)) {
      return localValue.value.some((value) => isEqual(value, option.value));
    }

    return isEqual(localValue.value, option.value);
  };

  const toggleOption = (option: NormalizedOption): void => {
    if (optionIsSelected(option)) {
      if (Array.isArray(localValue.value)) {
        localValue.value = substractFromArray(localValue.value, option.value);
      } else {
        localValue.value = null;
      }
    } else if (Array.isArray(localValue.value)) {
      localValue.value = addToArray(localValue.value, option.value);
    } else {
      localValue.value = option.value;
    }
  };

  return {
    selectedOption,
    optionIsSelected,
    toggleOption,
  };
}
