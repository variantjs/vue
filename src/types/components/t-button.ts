import { WithVariantProps } from '@variantjs/core';
import { ButtonHTMLAttributes, ComponentPropsOptions } from 'vue';
import { VueRouteAriaCurrentValue, VueRouteRouteLocationRaw } from '../vueRouter';

type RouterLinkProps = {
  to?: VueRouteRouteLocationRaw,
  replace?: boolean,
  activeClass?: string,
  exactActiveClass?: string,
  custom?: boolean,
  ariaCurrentValue?: VueRouteAriaCurrentValue,
};

export type TButtonOptions = WithVariantProps<ComponentPropsOptions<{
  tagName?: string
  href?: string
} & RouterLinkProps> & ButtonHTMLAttributes & Record<string, unknown>>;
