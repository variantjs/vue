import { InputOptions, WithVariantProps } from '@variantjs/core';
import { SelectHTMLAttributes } from '@vue/runtime-dom';
import { ComponentPropsOptions } from 'vue';
import { Booleanish } from '../misc';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TSelectValue = string | number | boolean | undefined | null | Date | Function | symbol | TSelectValue[];

export type TSelectOptions = WithVariantProps<ComponentPropsOptions<{
  modelValue?: TSelectValue,
  options?: InputOptions
  multiple?: Booleanish
}> & SelectHTMLAttributes & Record<string, unknown>>;
