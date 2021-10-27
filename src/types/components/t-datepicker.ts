import {
  Data, TDatepickerClassesValidKeys, WithVariantPropsAndClassesList,
} from '@variantjs/core';
import { HTMLAttributes } from 'vue';
import { Placement, Options } from '@popperjs/core';

type TDatepickerSingleValue = Date | string | number | undefined;

export type TDatepickerValue = TDatepickerSingleValue | Array<TDatepickerSingleValue>;

export type TDatepickerOptions = WithVariantPropsAndClassesList<{
  modelValue?: TDatepickerValue,
  weekStart?: number,
  dropdownPlacement?: Placement,
  dropdownPopperOptions?: Options,
} & HTMLAttributes & Data, TDatepickerClassesValidKeys>;
