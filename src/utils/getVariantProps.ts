import { CSSClass, Variants } from '@variantjs/core';
import { PropType } from 'vue';
import { VariantJSProps } from '../types';

const getVariantProps = <ComponentOptions extends Record<string, unknown>>() : VariantJSProps => ({
  classes: {
    type: [String, Array, Object] as PropType<CSSClass>,
    default: undefined,
  },
  fixedClasses: {
    type: [String, Array, Object] as PropType<CSSClass>,
    default: undefined,
  },
  variants: {
    type: Object as PropType<Variants<ComponentOptions>>,
    default: undefined,
  },
  variant: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
});

export default getVariantProps;
