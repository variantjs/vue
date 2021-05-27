import { WithVariantProps } from '@variantjs/core';
import { InputHTMLAttributes } from '@vue/runtime-dom';
import { PropType } from 'vue';
import { ComponentWithVariantsProps } from '.';

export type TInputValue = string | number | undefined | null;

export type TInputOptions = WithVariantProps<{
  modelValue?: TInputValue,
} & InputHTMLAttributes & Record<string, unknown>>;

export type TInputProps = ComponentWithVariantsProps<TInputOptions, {
  modelValue: {
    type: PropType<TInputValue>;
    default: undefined;
  }
}>;

// export type TInputOptions = {
//   modelValue?: TInputValue,
// } & InputHTMLAttributes & Record<string, unknown>;

// export type TInputProps = {
//   modelValue: {
//     type: PropType<TInputValue>;
//     default: undefined;
//   }
// };
