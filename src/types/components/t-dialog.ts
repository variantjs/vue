import { WithVariantPropsAndClassesList, Data } from '@variantjs/core';
import { BodyScrollOptions } from 'body-scroll-lock';
import { HTMLAttributes } from 'vue';

// @TODO: move this to @variant/core
type TDialogClassesKeys = 'wrapper';

export type TDialogOptions = WithVariantPropsAndClassesList<{
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
  showCloseButton?: boolean,
} & HTMLAttributes & Data, TDialogClassesKeys>;
