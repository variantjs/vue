import { WithVariantProps } from '@variantjs/core';
import { InputHTMLAttributes } from 'vue';
import { ObjectWithProperties } from '../helpers';

// eslint-disable-next-line @typescript-eslint/ban-types
type TRadioSimpleValue = string | number | boolean | undefined | null | Date | Function | symbol;
export type TRadioValue = TRadioSimpleValue | TRadioSimpleValue[] | ObjectWithProperties<TRadioSimpleValue>;

export type TRadioOptions = WithVariantProps<{
  modelValue?: TRadioValue
} & InputHTMLAttributes & {
  type?: 'radio'
} & Record<string, unknown>>;
