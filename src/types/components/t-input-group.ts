import { WithVariantPropsAndClassesList, TInputGroupClassesValidKeys, Data } from '@variantjs/core';
import { HTMLAttributes } from 'vue';

export type TInputGroupValidChilElementsKeys = ('label' | 'default' | 'feedback' | 'description')[];

export type TInputGroupOptions = WithVariantPropsAndClassesList<{
  label?: string
  description?: string
  feedback?: string
  body?: string
  sortedElements?: TInputGroupValidChilElementsKeys,
  tagName?: string,
  bodyTagName?: string,
  labelTagName?: string,
  feedbackTagName?: string,
  descriptionTagName?: string,
}, TInputGroupClassesValidKeys> & HTMLAttributes & Data;
