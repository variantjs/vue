import {
  WithVariantPropsAndClassesList, Data, TDialogClassesValidKeys, DialogType, DialogPreconfirmFn,
} from '@variantjs/core';
import { BodyScrollOptions } from 'body-scroll-lock';
import { HTMLAttributes } from 'vue';

export type TDialogOptions = WithVariantPropsAndClassesList<{
  type?: DialogType,

  title?: string,
  titleTag?: string,
  text?: string,
  textTag?: string,
  cancelButtonText?: string,
  cancelButtonAriaLabel?: string,
  okButtonText?: string,
  okButtonAriaLabel?: string,
  preConfirm?: DialogPreconfirmFn,

  name?: string,
  modelValue?: boolean,
  modalAttributes?: HTMLAttributes & Data,
  tagName?: string
  body?: string

  footer?: string
  clickToClose?: boolean,
  escToClose?: boolean,
  focusOnOpen?: boolean,
  disableBodyScroll?: boolean,
  bodyScrollLockOptions?: BodyScrollOptions,
  teleport?: boolean,
  teleportTo?: string | HTMLElement,
  showCloseButton?: boolean,
} & HTMLAttributes & Data, TDialogClassesValidKeys>;
