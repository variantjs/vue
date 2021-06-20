import { CSSClass, WithVariantPropsAndClassesList } from '@variantjs/core';
import { HTMLAttributes } from 'vue';
import { Data } from '../misc';

export type TCardOptions = WithVariantPropsAndClassesList<{
  tagName?: string
  body?: string
  header?: string
  footer?: string
}, {
  wrapper?: CSSClass,
  body?: CSSClass,
  header?: CSSClass,
  footer?: CSSClass,
}> & HTMLAttributes & Data;
