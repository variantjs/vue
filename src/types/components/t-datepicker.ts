import {
  Data, DateConditions, DateFormatter, DateLocale, DateParser, DateValue, TDatepickerClassesValidKeys, WeekDay, WithVariantPropsAndClassesList,
} from '@variantjs/core';
import { HTMLAttributes, InputHTMLAttributes } from 'vue';
import { Placement, Options } from '@popperjs/core';

export type TDatepickerSingleValue = DateValue | undefined | null;

export type TDatepickerValue = TDatepickerSingleValue | Array<TDatepickerSingleValue>;

export enum TDatepickerView {
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

export type TDatepickerOptions = WithVariantPropsAndClassesList<{
  modelValue?: TDatepickerValue,
  initialDate?: TDatepickerValue,
  initialTime?: TDatepickerSingleValue,
  amPm?: boolean,
  dateFormat?: string,
  userFormat?: string,
  weekStart?: WeekDay,
  dropdownPlacement?: Placement,
  dropdownPopperOptions?: Options,
  monthsPerView?: number,
  multiple?: boolean,
  disabled?: boolean,
  readonly?: boolean,
  required?: boolean,
  placeholder?: string,
  range?: boolean,
  highlightDates?: DateConditions,
  disabledDates: DateConditions,
  showDaysForOtherMonth?: boolean,
  dateParser?: DateParser,
  dateFormatter?: DateFormatter,
  locale?: DateLocale,
  initialView?: TDatepickerView,
  toggleOnFocus?: boolean,
  toggleOnClick?: boolean,
  toggleOnHover?: boolean,
  hideOnLeaveTimeout?: number,
  closeOnSelect?: boolean,
  show?: boolean,
  userInputName?: string,
  userInputType?: string,
  userInputAttributes?: InputHTMLAttributes & Data,
  name?: string,
  formInputAttributes?: InputHTMLAttributes & Data,
  addFormInput?: boolean,
} & HTMLAttributes & Data, TDatepickerClassesValidKeys>;
