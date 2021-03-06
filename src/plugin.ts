import {
  DialogHideFn, DialogProgramaticallyShowFn, DialogResponse, DialogShowFn, DialogType, ModalHideFn, ModalShowFn,
} from '@variantjs/core';
import { App } from 'vue';
import { VariantJSConfiguration } from './types';
import { TDialogOptions } from './types/components/t-dialog';
import createDialogProgramatically from './utils/createDialogProgramatically';
import { Emitter } from './utils/emitter';

const plugin = {
  install: (app: App<Element>, configuration: VariantJSConfiguration = {}): void => {
    const emitter = new Emitter();

    // @TODO: ensure this variable is exposed for https://vuetelescope.com/
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$variantJS = true;

    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$modal = {
      show(name: string, params?: { [k: string]: string }) {
        emitter.emit('modal:show', name, params);
      },
      hide(name: string) {
        emitter.emit('modal:hide', name);
      },
    };

    const alert: DialogProgramaticallyShowFn = (titleOrDialogOptions: TDialogOptions | string, text?: string, icon?: string) : Promise<DialogResponse> => createDialogProgramatically(configuration, DialogType.Alert, titleOrDialogOptions, text, icon);

    const prompt: DialogProgramaticallyShowFn = (titleOrDialogOptions: TDialogOptions | string, text?: string, icon?: string) : Promise<DialogResponse> => createDialogProgramatically(configuration, DialogType.Prompt, titleOrDialogOptions, text, icon);

    const confirm: DialogProgramaticallyShowFn = (titleOrDialogOptions: TDialogOptions | string, text?: string, icon?: string) : Promise<DialogResponse> => createDialogProgramatically(configuration, DialogType.Confirm, titleOrDialogOptions, text, icon);

    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$dialog = {
      show(name: string): Promise<DialogResponse> {
        const promise = new Promise((resolve, reject) => {
          emitter.emit('dialog:show', name, resolve, reject);
        });

        return promise as Promise<DialogResponse>;
      },
      hide(name: string) {
        emitter.emit('dialog:hide', name);
      },
      alert,
      confirm,
      prompt,
    };

    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$alert = alert;
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$confirm = confirm;
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$prompt = prompt;

    app.provide('configuration', configuration);

    app.provide('emitter', emitter);
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $variantJS: boolean;
    $modal: {
      show: ModalShowFn;
      hide: ModalHideFn;
    },
    $dialog: {
      show: DialogShowFn;
      hide: DialogHideFn;
      alert: DialogProgramaticallyShowFn;
      confirm: DialogProgramaticallyShowFn;
      prompt: DialogProgramaticallyShowFn;
    },
    $alert: DialogProgramaticallyShowFn;
    $confirm: DialogProgramaticallyShowFn;
    $prompt: DialogProgramaticallyShowFn;
  }
}

export default plugin;
