import { WithVariantPropsAndClassesList, TCardClassesValidKeys, Data } from '@variantjs/core';
import { HTMLAttributes } from 'vue';

export type TCardOptions = WithVariantPropsAndClassesList<{
  tagName?: string
  body?: string
  header?: string
  footer?: string
} & HTMLAttributes & Data, TCardClassesValidKeys>;
