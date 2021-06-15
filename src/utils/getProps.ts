import { CSSClass, Variants } from '@variantjs/core';
import { PropType } from 'vue';
import { ComponentWithVariantsProps } from '../types';

const getProps = <ComponentOptions extends Record<string, unknown>>() : ComponentWithVariantsProps => ({
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

export default getProps;
