import { TWrappedRadioClassesList, WithVariantPropsAndClassesList } from '@variantjs/core';
import { TRadioValue } from './t-radio';

export type TWrappedRadioValue = TRadioValue;

export type TWrappedRadioProps = WithVariantPropsAndClassesList<{
  modelValue?: TWrappedRadioValue
  label?: string,
  labelTag?: string,
  wrapperTag?: string,
  inputWrapperTag?: string,
}, TWrappedRadioClassesList, TWrappedRadioClassesList>;
