import { WithVariantProps } from '@variantjs/core';
import { InputHTMLAttributes } from 'vue';

export type TInputValue = string | number | undefined | null;

export type TInputOptions = WithVariantProps<{
  modelValue?: TInputValue,
} & InputHTMLAttributes & Record<string, unknown>>;
