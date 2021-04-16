import { WithVariantProps } from '@variantjs/core';
import { InputHTMLAttributes } from '@vue/runtime-dom';

export type TInputValue = string | number | undefined | null;

export type TInputProps = WithVariantProps<{
  modelValue?: TInputValue
} & InputHTMLAttributes>;
