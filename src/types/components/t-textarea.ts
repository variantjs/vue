import { WithVariantProps } from '@variantjs/core';
import { InputHTMLAttributes } from '@vue/runtime-dom';

export type TTextareaValue = string | number | undefined | null;

export type TTextareaOptions = WithVariantProps<{
  modelValue?: TTextareaValue,
} & InputHTMLAttributes & Record<string, unknown>>;
