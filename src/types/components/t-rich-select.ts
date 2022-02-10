import {
  Data, InputOptions, Measure, NormalizedOption, NormalizedOptions, TRichSelectClassesValidKeys, WithVariantPropsAndClassesList,
} from '@variantjs/core';
import { HTMLAttributes } from 'vue';
import { Placement, Options } from '@popperjs/core';
import { TSelectValue } from './t-select';
import { FetchOptionsFn, PreFetchOptionsFn } from '../misc';

export type MinimumInputLengthTextProp = ((minimumInputLength: number, query?: string) => string) | string;

export type TRichSelectOptions = WithVariantPropsAndClassesList<{
  modelValue?: TSelectValue,
  options?: InputOptions | NormalizedOption[] | NormalizedOptions,
  multiple?: boolean
  name?: string,
  tags?: boolean
  normalizeOptions?: boolean,
  valueAttribute?: string,
  textAttribute?: string,
  delay?: number,
  fetchOptions?: FetchOptionsFn,
  prefetchOptions?: boolean | PreFetchOptionsFn,
  minimumInputLength?: number,
  minimumInputLengthText?: MinimumInputLengthTextProp,
  minimumResultsForSearch?: number,
  hideSearchBox?: boolean,
  toggleOnFocus?: boolean,
  toggleOnClick?: boolean,
  closeOnSelect?: boolean,
  selectOnClose?: boolean,
  clearable?: boolean,
  disabled?: boolean,
  placeholder?: string,
  searchBoxPlaceholder?: string,
  noResultsText?: string,
  searchingText?: string,
  loadingClosedPlaceholder?: string,
  loadingMoreResultsText?: string,
  maxHeight?: Measure | null,
  dropdownPlacement?: Placement,
  dropdownPopperOptions?: Options,
  teleport?: boolean,
  teleportTo?: string | HTMLElement,
  inputType?: string,
} & HTMLAttributes & Data, TRichSelectClassesValidKeys>;
