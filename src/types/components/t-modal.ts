import { WithVariantPropsAndClassesList, Data, TModalClassesValidKeys } from '@variantjs/core';
import { BodyScrollOptions } from 'body-scroll-lock';
import { HTMLAttributes } from 'vue';

export type TModalOptions = WithVariantPropsAndClassesList<{
  name?: string,
  modelValue?: boolean,
  modalAttributes?: HTMLAttributes & Data,
  tagName?: string
  body?: string
  header?: string
  footer?: string
  clickToClose?: boolean,
  escToClose?: boolean,
  focusOnOpen?: boolean,
  disableBodyScroll?: boolean,
  bodyScrollLockOptions?: BodyScrollOptions,
  teleport?: boolean,
  teleportTo?: string | HTMLElement,
  noBody?: boolean,
  hideCloseButton?: boolean,
} & HTMLAttributes & Data, TModalClassesValidKeys>;
