import { WithVariantProps } from '@variantjs/core';
import { InputHTMLAttributes } from '@vue/runtime-dom';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TRadioValue = string | number | boolean | undefined | null | Date | Function | symbol | TRadioValue[];

export type TRadioProps = WithVariantProps<{
  modelValue?: TRadioValue
} & InputHTMLAttributes & {
  type: 'radio'
}>;
