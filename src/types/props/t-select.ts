import { InputOptions, WithVariantProps } from '@variantjs/core';
import { SelectHTMLAttributes } from '@vue/runtime-dom';
import { ComponentPropsOptions } from 'vue';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TSelectValue = string | number | boolean | undefined | null | Date | Function | symbol | TSelectValue[];

export type TSelectProps = WithVariantProps<ComponentPropsOptions<{
  modelValue?: TSelectValue,
  options?: InputOptions
}> & SelectHTMLAttributes & Record<string, unknown>>;
