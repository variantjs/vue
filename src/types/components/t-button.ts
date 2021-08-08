import { Data, WithVariantProps } from '@variantjs/core';
import { ButtonHTMLAttributes } from 'vue';
import { VueRouteAriaCurrentValue, VueRouteRouteLocationRaw } from '../vueRouter';

type RouterLinkProps = {
  to?: VueRouteRouteLocationRaw,
  replace?: boolean,
  activeClass?: string,
  exactActiveClass?: string,
  custom?: boolean,
  ariaCurrentValue?: VueRouteAriaCurrentValue,
};

export type TButtonOptions = WithVariantProps<{
  tagName?: string
  href?: string
} & RouterLinkProps> & ButtonHTMLAttributes & Data;
