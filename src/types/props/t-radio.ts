import { WithVariantProps } from '@variantjs/core';
import { InputHTMLAttributes } from '@vue/runtime-dom';
import { ObjectWithProperties } from '../helpers';

// eslint-disable-next-line @typescript-eslint/ban-types
type TRadioNativeValue = string | number | boolean | undefined | null | Date | Function | symbol | TRadioValue[];

export type TRadioValue = TRadioNativeValue | TRadioNativeValue[] | ObjectWithProperties<TRadioNativeValue>;

export type TRadioOptions = WithVariantProps<{
  modelValue?: TRadioValue
} & InputHTMLAttributes & {
  type?: 'radio'
} & Record<string, unknown>>;
