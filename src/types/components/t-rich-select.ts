import {
  Data, InputOptions, Measure, TRichSelectClassesValidKeys, WithVariantPropsAndClassesList,
} from '@variantjs/core';
import { HTMLAttributes } from 'vue';
import { Placement, Options } from '@popperjs/core';
import { TSelectValue } from './t-select';
import { FetchOptionsFn } from '../misc';

export type MinimumInputLengthTextProp = ((minimumInputLength: number, query?: string) => string) | string;

export type TRichSelectOptions = WithVariantPropsAndClassesList<{
  modelValue?: TSelectValue,
  options?: InputOptions
  multiple?: boolean
  normalizeOptions?: boolean,
  valueAttribute?: string,
  textAttribute?: string,
  delay?: number,
  fetchOptions?: FetchOptionsFn,
  minimumInputLength?: number,
  minimumInputLengthText?: MinimumInputLengthTextProp,
  minimumResultsForSearch?: number,
  hideSearchBox?: boolean,
  toggleOnFocus?: boolean,
  toggleOnClick?: boolean,
  closeOnSelect?: boolean,
  selectOnClose?: boolean,
  clearable?: boolean,
  placeholder?: string,
  searchBoxPlaceholder?: string,
  noResultsText?: string,
  searchingText?: string,
  loadingMoreResultsText?: string,
  maxHeight?: Measure | null,
  dropdownPlacement?: Placement,
  dropdownPopperOptions?: Options,
}, TRichSelectClassesValidKeys> & HTMLAttributes & Data;
