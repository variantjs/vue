import { WithVariantProps } from '@variantjs/core';
import { InputHTMLAttributes } from '@vue/runtime-dom';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TCheckboxValue = string | number | boolean | undefined | null | Date | Function | symbol | TCheckboxValue[];

export type TCheckboxOptions = WithVariantProps<{
  modelValue?: TCheckboxValue
} & InputHTMLAttributes & {
  type: 'checkbox'
} & Record<string, unknown>>;
