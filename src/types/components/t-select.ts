import { Data, InputOptions, WithVariantProps } from '@variantjs/core';
import { SelectHTMLAttributes } from 'vue';
import { Truthy } from '../misc';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TSelectValue = string | number | boolean | undefined | null | Date | Function | symbol | TSelectValue[];

export type TSelectOptions = WithVariantProps<{
  modelValue?: TSelectValue,
  options?: InputOptions,
  multiple?: Truthy,
  valueAttribute?: string
  textAttribute?: string
}> & SelectHTMLAttributes & Data;
