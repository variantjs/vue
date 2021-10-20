import { WithVariantPropsAndClassesList, TToggleClassesValidKeys, Data } from '@variantjs/core';
import { HTMLAttributes } from 'vue';
import { TCheckboxValue } from './t-checkbox';

export type TToggleValue = TCheckboxValue;

export type TToggleOptions = WithVariantPropsAndClassesList<{
  name?: string,
  modelValue?: TToggleValue,
  value?: TToggleValue,
  uncheckedValue?: TToggleValue,
  checked?: boolean,
} & HTMLAttributes & Data, TToggleClassesValidKeys>;
