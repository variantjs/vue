import { App } from 'vue';
import { VariantJSConfiguration } from './types';
import { Emitter } from './utils/emitter';

const plugin = {
  install: (app: App<Element>, configuration: VariantJSConfiguration = {}): void => {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.emitter = new Emitter();

    app.provide('configuration', configuration);
  },
};

export default plugin;
