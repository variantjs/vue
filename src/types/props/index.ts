import { CSSClass, Variants, WithVariantProps } from '@variantjs/core';
import { ComponentPropsOptions, ComputedOptions, PropType } from 'vue';

export * from './t-input';
export * from './t-radio';
export * from './t-checkbox';
export * from './t-select';
export * from './t-wrapped-radio';

export declare type ComponentWithVariantsProps<ComponentOptions extends WithVariantProps<Record<string, unknown>>, PropsOptions extends Readonly<ComponentPropsOptions>> = PropsOptions & {
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
  definedProps: {
    type: PropType<(keyof PropsOptions)[]>;
    default: (props: PropsOptions) => (keyof PropsOptions)[];
  },
};

export declare type VariantComputedAttributes<C extends ComputedOptions> = {
  configuration: () => Record<string, unknown>,
  attributes: () => Record<string, unknown>,
} & C;
