import {
  DialogHideFn, DialogResponse, DialogShowFn, ModalHideFn, ModalShowFn,
} from '@variantjs/core';
import { App } from 'vue';
import { VariantJSConfiguration } from './types';
import { TDialogOptions } from './types/components/t-dialog';
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

    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$dialog = {
      show(name: string, params?: { [k: string]: string }) {
        emitter.emit('dialog:show', name, params);

        // @TODO: Return promise
      },
      hide(name: string) {
        emitter.emit('dialog:hide', name);
      },
    };

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
      alert: (titleOrDialogOptions: TDialogOptions, text?: string, icon?: string) => Promise<DialogResponse>;
      confirm: (titleOrDialogOptions: TDialogOptions, text?: string, icon?: string) => Promise<DialogResponse>;
      prompt: (titleOrDialogOptions: TDialogOptions, text?: string, icon?: string) => Promise<DialogResponse>;
    },
    $alert: (titleOrDialogOptions: TDialogOptions, text?: string, icon?: string) => Promise<DialogResponse>;
    $confirm: (titleOrDialogOptions: TDialogOptions, text?: string, icon?: string) => Promise<DialogResponse>;
    $prompt: (titleOrDialogOptions: TDialogOptions, text?: string, icon?: string) => Promise<DialogResponse>;
  }
}

export default plugin;
