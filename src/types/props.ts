import { TWrappedRadioClassesList, WithVariantProps, WithVariantPropsAndClassesList } from '@variantjs/core';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TRadioValue = string | number | boolean | undefined | null | Date | Function | symbol | TRadioValue[];

export type TRadioProps = WithVariantProps<{
  modelValue?: TRadioValue
}>;

export type TWrappedRadioValue = TRadioValue;

export type TWrappedRadioProps = WithVariantPropsAndClassesList<{
  modelValue?: TWrappedRadioValue
  label?: string,
  labelTag?: string,
  wrapperTag?: string,
  inputWrapperTag?: string,
}, TWrappedRadioClassesList, TWrappedRadioClassesList>;

export type TInputValue = string | number | undefined | null;

export type TInputProps = WithVariantProps<{
  modelValue?: TInputValue
}>;
