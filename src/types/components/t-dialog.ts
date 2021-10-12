import {
  WithVariantPropsAndClassesList, Data, TDialogClassesValidKeys, DialogType, DialogPreconfirmFn, DialogIcon, DialogInputValidatorFn,
} from '@variantjs/core';
import { BodyScrollOptions } from 'body-scroll-lock';
import { HTMLAttributes } from 'vue';

export type TDialogOptions = WithVariantPropsAndClassesList<{
  type?: string,
  icon?: string,
  useSolidIcon?: boolean,
  rejectOnCancel?: boolean,
  rejectOnDismiss?: boolean,
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
  // (Prompt only)
  // Attributes for the text input
  inputAttributes?: HTMLAttributes & Data,
  // Type for the prompt input (accepts 'input', 'textarea' ,'select' and 'checkbox')
  inputType?: 'string',
  // Function for validate the value of the prompt, receives the prompt value and should return an error message or empty if no errors. It accepts a promise
  inputValidator?: DialogInputValidatorFn,
  // Default value of the input
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputValue?: any,
} & HTMLAttributes & Data, TDialogClassesValidKeys>;
