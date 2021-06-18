import { CSSClass, Variants, WithVariantProps } from '@variantjs/core';
import { ComponentPropsOptions, PropType } from 'vue';
import { TButtonOptions } from './components/t-button';
import { TCheckboxOptions } from './components/t-checkbox';
import { TInputOptions } from './components/t-input';
import { TRadioOptions } from './components/t-radio';
import { TSelectOptions } from './components/t-select';
import { TTextareaOptions } from './components/t-textarea';

type VariantJSProps<ComponentOptions extends WithVariantProps<Record<string, unknown>> = {
  classes?: CSSClass;
  fixedClasses?: CSSClass;
  variants?: Variants<Record<string, unknown>>;
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

type VariantJSConfiguration = {
  TInput?: TInputOptions
  TSelect?: TSelectOptions
  TRadio?: TRadioOptions
  TCheckbox?: TCheckboxOptions
  TButton?: TButtonOptions
  TTextarea?: TTextareaOptions
};

export { VariantJSConfiguration, VariantJSProps };
