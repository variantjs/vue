import { App } from 'vue';

import { VariantJSConfiguration } from './types';

import Emitter from './utils/emitter';

export * from './components';

export * from './use';

export * from './types';

export const VariantJS = {
  install: (app: App<Element>, configuration: VariantJSConfiguration = {}): void => {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.emitter = new Emitter();

    app.provide('configuration', configuration);
  },
};
