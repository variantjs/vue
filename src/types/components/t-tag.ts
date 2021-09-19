import { Data, WithVariantProps } from '@variantjs/core';
import { HTMLAttributes } from 'vue';

export type TTagOptions = WithVariantProps<{
  tagName?: string
  text?: string
} & HTMLAttributes & Data>;
