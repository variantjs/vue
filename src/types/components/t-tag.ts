import { WithVariantProps } from '@variantjs/core';
import { HTMLAttributes } from 'vue';
import { Data } from '../misc';

export type TTagOptions = WithVariantProps<{
  tagName?: string
  text?: string
}> & HTMLAttributes & Data;
