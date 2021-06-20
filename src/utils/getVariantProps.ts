import {
  CSSClass, CSSRawClassesList, Variants, VariantsWithClassesList,
} from '@variantjs/core';
import { PropType } from 'vue';
import { Data, VariantJSProps, VariantJSWithClassesListProps } from '../types';

const getVariantProps = <ComponentOptions extends Data>() : VariantJSProps => ({
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

const getVariantPropsWithClassesList = <ComponentOptions extends Data, C extends CSSRawClassesList = CSSRawClassesList, C2 extends CSSRawClassesList = CSSRawClassesList>() : VariantJSWithClassesListProps => ({
  classes: {
    type: [String, Array, Object] as PropType<C>,
    default: undefined,
  },
  fixedClasses: {
    type: [String, Array, Object] as PropType<C2>,
    default: undefined,
  },
  variants: {
    type: Object as PropType<VariantsWithClassesList<ComponentOptions, C, C2>>,
    default: undefined,
  },
  variant: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
});

export { getVariantProps, getVariantPropsWithClassesList };
