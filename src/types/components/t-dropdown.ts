import { Placement, Options } from '@popperjs/core';
import { WithVariantPropsAndClassesList, TDropdownClassesValidKeys, Data } from '@variantjs/core';
import { HTMLAttributes } from 'vue';

export type TDropdownOptions = WithVariantPropsAndClassesList<{
  text?: string,
  disabled?: boolean,

  tagName?: string,
  dropdownTagName?: string,
  dropdownAttributes?: Data,

  toggleOnFocus?: boolean,
  toggleOnClick?: boolean,
  toggleOnHover?: boolean,

  show?: boolean,

  hideOnLeaveTimeout?: number,

  teleport?: boolean,
  teleportTo?: string | HTMLElement,

  placement?: Placement,
  popperOptions?: Options,
}, TDropdownClassesValidKeys> & HTMLAttributes & Data;
