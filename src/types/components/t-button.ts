import { WithVariantProps } from '@variantjs/core';
import { ButtonHTMLAttributes } from 'vue';

export type TButtonOptions = WithVariantProps<ButtonHTMLAttributes & Record<string, unknown>>;
