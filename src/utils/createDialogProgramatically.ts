import { DialogResponse, DialogType } from '@variantjs/core';
import { createApp } from 'vue';
import { TDialogOptions } from '../types/components/t-dialog';
import { VariantJSConfiguration } from '../types/variantCore';

import TDialog from '../components/TDialog.vue';

const createDialogProgramatically = (configuration: VariantJSConfiguration, type: DialogType, titleOrDialogOptions: TDialogOptions | string, text?: string, icon?: string) : Promise<DialogResponse> => {
  const { props } = TDialog;

  if (typeof titleOrDialogOptions === 'string') {
    props.title.default = titleOrDialogOptions;
  } else {
    Object.keys(titleOrDialogOptions).forEach((key) => {
      props[key].default = titleOrDialogOptions[key];
    });
  }

  if (typeof text === 'string') {
    props.text.default = text;
  }

  if (typeof icon === 'string') {
    props.icon.default = icon;
  }

  props.type.default = type;

  const instance = createApp(TDialog);

  instance.provide('configuration', configuration);

  const dialogInstance = instance.mount(document.createElement('div'));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const promise = (dialogInstance as any).show() as Promise<DialogResponse>;

  return promise
    .then((response) => {
      instance.unmount();

      return Promise.resolve(response);
    })
    .catch((error) => {
      instance.unmount();

      return Promise.reject(error);
    });
};

export default createDialogProgramatically;
