import {
  WithVariantPropsAndClassesList, Data, TDialogClassesValidKeys, DialogType, DialogPreconfirmFn, DialogIcon,
} from '@variantjs/core';
import { BodyScrollOptions } from 'body-scroll-lock';
import { HTMLAttributes } from 'vue';

export type TDialogOptions = WithVariantPropsAndClassesList<{
  type?: DialogType,
  icon?: DialogIcon,
  useSolidIcon?: boolean,
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
  clickToClose?: boolean,
  escToClose?: boolean,
  focusOnOpen?: boolean,
  showCloseButton?: boolean,
  disableBodyScroll?: boolean,
  bodyScrollLockOptions?: BodyScrollOptions,
  teleport?: boolean,
  teleportTo?: string | HTMLElement,
} & HTMLAttributes & Data, TDialogClassesValidKeys>;
