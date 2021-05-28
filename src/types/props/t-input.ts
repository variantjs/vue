import { CSSClass, WithVariantProps } from '@variantjs/core';
import { InputHTMLAttributes } from '@vue/runtime-dom';
import { PropType } from 'vue';
import { ComponentWithVariantsProps, VariantComputedAttributes } from '.';

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

export type TInputComputedAttributes = VariantComputedAttributes<{
  localValue: {
    get: () => TInputValue,
    set: (value: TInputValue) => void,
  }
}>;

export type TInputMethods = {
  test4:() => CSSClass,
};
