import {
  Data, DateConditions, DateFormatter, DateLocale, DateParser, DateValue, TDatepickerClassesValidKeys, WithVariantPropsAndClassesList,
} from '@variantjs/core';
import { HTMLAttributes } from 'vue';
import { Placement, Options } from '@popperjs/core';

export type TDatepickerSingleValue = DateValue | undefined | null;

export type TDatepickerValue = TDatepickerSingleValue | Array<TDatepickerSingleValue>;

export type TDatepickerOptions = WithVariantPropsAndClassesList<{
  modelValue?: TDatepickerValue,
  initialDate?: TDatepickerValue,
  initialTime?: TDatepickerSingleValue,
  amPm?: boolean,
  dateFormat?: string,
  userFormat?: string,
  weekStart?: number,
  dropdownPlacement?: Placement,
  dropdownPopperOptions?: Options,
  monthsPerView?: number,
  multiple?: boolean,
  range?: boolean,
  highlightDates?: DateConditions,
  dateParser?: DateParser,
  dateFormatter?: DateFormatter,
  locale?: DateLocale,
} & HTMLAttributes & Data, TDatepickerClassesValidKeys>;