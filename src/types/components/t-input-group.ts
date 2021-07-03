import { WithVariantPropsAndClassesList, TCardConfigKeys } from '@variantjs/core';
import { HTMLAttributes } from 'vue';
import { Data } from '../misc';

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
}, TCardConfigKeys> & HTMLAttributes & Data;
