import { InputOptions, WithVariantProps } from '@variantjs/core';
import { SelectHTMLAttributes } from '@vue/runtime-dom';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TSelectValue = string | number | boolean | undefined | null | Date | Function | symbol | TSelectValue[];

export type TSelectProps = WithVariantProps<{
  modelValue?: TSelectValue,
  options?: InputOptions
} & SelectHTMLAttributes>;
