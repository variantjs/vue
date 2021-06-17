import { WithVariantProps } from '@variantjs/core';
import { ButtonHTMLAttributes, ComponentPropsOptions } from 'vue';

export type TButtonOptions = WithVariantProps<ComponentPropsOptions<{
  tagName?: string
}> & ButtonHTMLAttributes & Record<string, unknown>>;
