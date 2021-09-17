import { Data, WithVariantProps } from '@variantjs/core';
import { InputHTMLAttributes } from 'vue';

export type TTextareaValue = string | number | string[] | undefined;

export type TTextareaOptions = WithVariantProps<{
  modelValue?: TTextareaValue,
}> & InputHTMLAttributes & Data;
