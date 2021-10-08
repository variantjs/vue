import {
  WithVariantPropsAndClassesList, Data, TDialogClassesValidKeys, DialogType, DialogPreconfirmFn, DialogIcon, DialogInput, InputOptions, DialogInputValidatorFn,
} from '@variantjs/core';
import { BodyScrollOptions } from 'body-scroll-lock';
import { HTMLAttributes } from 'vue';
import { TSelectValue } from '..';

export type TDialogOptions = WithVariantPropsAndClassesList<{
  type?: DialogType,
  icon?: DialogIcon,
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
  // Attributes for the text/select input
  inputAttributes?: HTMLAttributes & Data,
  // Type for the prompt input (accepts 'select', 'radio', 'checkbox' and all the valid `type` attributes for a text input)
  inputType?: string,
  // Function for validate the value of the prompt, receives the prompt value and should return an error message or empty if no errors. It accepts a promise
  inputValidator?: DialogInputValidatorFn,
  // Default value of the input
  inputValue?: TSelectValue | string,
  // (Only applies for select or checkbox) options on the select, radio, or checkbox input
  inputOptions?: InputOptions,
  // Placeholder for the prompt input or label in the case of a single checkbox
  inputPlaceholder?: string,
} & HTMLAttributes & Data, TDialogClassesValidKeys>;
