import { Data, WithVariantProps } from '@variantjs/core';
import { InputHTMLAttributes } from 'vue';
import { ObjectWithProperties } from '../helpers';

// eslint-disable-next-line @typescript-eslint/ban-types
type TCheckboxSimpleValue = string | number | boolean | undefined | null | Date | Function | symbol;
export type TCheckboxValue = TCheckboxSimpleValue | TCheckboxSimpleValue[] | ObjectWithProperties<TCheckboxSimpleValue>;

export type TCheckboxOptions = WithVariantProps<{
  modelValue?: TCheckboxValue
} & InputHTMLAttributes & {
  type?: 'checkbox'
} & Data>;
