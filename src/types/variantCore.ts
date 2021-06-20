import {
  CSSClass, CSSRawClassesList, Variants, VariantsWithClassesList, WithVariantProps, WithVariantPropsAndClassesList,
} from '@variantjs/core';
import { ComponentPropsOptions, PropType } from 'vue';
import { TButtonOptions } from './components/t-button';
import { TCardOptions } from './components/t-card';
import { TCheckboxOptions } from './components/t-checkbox';
import { TInputOptions } from './components/t-input';
import { TRadioOptions } from './components/t-radio';
import { TSelectOptions } from './components/t-select';
import { TTagOptions } from './components/t-tag';
import { TTextareaOptions } from './components/t-textarea';
import { Data } from './misc';

type VariantJSProps<ComponentOptions extends WithVariantProps<Data> = {
  classes?: CSSClass;
  fixedClasses?: CSSClass;
  variants?: Variants<Data>;
  variant?: string;
  class?: string;
}, PropsOptions extends Readonly<ComponentPropsOptions> = {
  classes: {
    type: PropType<CSSClass>;
    default: undefined;
  },
  fixedClasses: {
    type: PropType<CSSClass>;
    default: undefined;
  },
  variants: {
    type: PropType<Variants<ComponentOptions>>;
    default: undefined;
  },
  variant: {
    type:PropType<string | undefined>;
    default: undefined;
  },
}> = PropsOptions & {
  classes: {
    type: PropType<CSSClass>;
    default: undefined;
  },
  fixedClasses: {
    type: PropType<CSSClass>;
    default: undefined;
  },
  variants: {
    type: PropType<Variants<ComponentOptions>>;
    default: undefined;
  },
  variant: {
    type:PropType<string | undefined>;
    default: undefined;
  },
};

type VariantJSWithClassesListProps<C extends CSSRawClassesList = CSSRawClassesList, C2 extends CSSRawClassesList = CSSRawClassesList, ComponentOptions extends WithVariantPropsAndClassesList<Data, C, C2> = {
  classes?: C;
  fixedClasses?: C2;
  variants?: VariantsWithClassesList<Data, C, C2>;
  variant?: string;
  class?: string;
}, PropsOptions extends Readonly<ComponentPropsOptions> = {
  classes: {
    type: PropType<C>;
    default: undefined;
  },
  fixedClasses: {
    type: PropType<C2>;
    default: undefined;
  },
  variants: {
    type: PropType<VariantsWithClassesList<ComponentOptions, C, C2>>;
    default: undefined;
  },
  variant: {
    type:PropType<string | undefined>;
    default: undefined;
  },
}> = PropsOptions & {
  classes: {
    type: PropType<C>;
    default: undefined;
  },
  fixedClasses: {
    type: PropType<C2>;
    default: undefined;
  },
  variants: {
    type: PropType<VariantsWithClassesList<ComponentOptions, C, C2>>;
    default: undefined;
  },
  variant: {
    type:PropType<string | undefined>;
    default: undefined;
  },
};

type VariantJSConfiguration = {
  TInput?: TInputOptions
  TSelect?: TSelectOptions
  TRadio?: TRadioOptions
  TCheckbox?: TCheckboxOptions
  TButton?: TButtonOptions
  TTextarea?: TTextareaOptions
  TTag?: TTagOptions
  TCard?: TCardOptions
};

export { VariantJSConfiguration, VariantJSProps, VariantJSWithClassesListProps };
