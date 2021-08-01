import { InputOptions, TRichSelectClassesValidKeys, WithVariantPropsAndClassesList } from '@variantjs/core';
import { HTMLAttributes } from 'vue';
import { Placement, Options } from '@popperjs/core';
import { Data } from '../misc';
import { TSelectValue } from './t-select';

export type AjaxResults = Promise<{
  results: InputOptions;
  hasMorePages?: boolean;
}>;

export type TRichSelectOptions = WithVariantPropsAndClassesList<{
  modelValue?: TSelectValue,
  options?: InputOptions
  multiple?: boolean
  valueAttribute?: string,
  textAttribute?: string,
  delay?: number,
  fetchOptions?: (query: string, nextPage?: number) => AjaxResults,
  minimumInputLength?: number,
  minimumInputLengthText?: ((minimumInputLength: number, query?: string) => string) | string,
  minimumResultsForSearch?: number,
  hideSearchBox?: boolean,
  openOnFocus?: boolean,
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
  maxHeight?: number,
  dropdownPlacement?: Placement,
  dropdownPopperOptions?: Options,
}, TRichSelectClassesValidKeys> & HTMLAttributes & Data;
