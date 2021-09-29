import { App } from 'vue';
import { VariantJSConfiguration } from './types';
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

    app.provide('configuration', configuration);

    app.provide('emitter', emitter);
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $variantJS: boolean;
    $modal: {
      show: (name: string, params?: { [k: string]: string }) => void;
      hide: (name: string) => void;
    }
  }
}

export default plugin;
