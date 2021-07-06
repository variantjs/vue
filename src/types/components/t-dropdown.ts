import { Placement, Options } from '@popperjs/core';
import { WithVariantPropsAndClassesList, TDropdownConfigKeys } from '@variantjs/core';
import { HTMLAttributes } from 'vue';
import { Data } from '../misc';

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
}, TDropdownConfigKeys> & HTMLAttributes & Data;
