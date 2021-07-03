import { Placement, Options } from '@popperjs/core';
import { WithVariantPropsAndClassesList, TDropdownConfigKeys } from '@variantjs/core';
import { HTMLAttributes } from 'vue';
import { Data } from '../misc';

export type TDropdownOptions = WithVariantPropsAndClassesList<{
  text?: string,
  disabled?: boolean,
  tagName?: string,
  dropdownWrapperTagName?: string,
  dropdownTagName?: string,
  toggleOnFocus?: boolean,
  toggleOnClick?: boolean,
  toggleOnHover?: boolean,
  hideOnLeaveTimeout?: number,
  show?: boolean,

  teleport?: boolean,
  teleportTo?: string,

  placement?: Placement,
  popperOptions?: Options,

}, TDropdownConfigKeys> & HTMLAttributes & Data;
