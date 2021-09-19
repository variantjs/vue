import { Data, WithVariantProps } from '@variantjs/core';
import { InputHTMLAttributes } from 'vue';

export type TInputValue = string | number | string[] | undefined;

export type TInputOptions = WithVariantProps<{
  modelValue?: TInputValue,
} & InputHTMLAttributes & Data>;
