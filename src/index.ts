import { App } from 'vue';

import { VariantJSConfiguration } from './types';

export { default as TInput } from './components/TInput.vue';

export const variantJsPlugin = {
  install: (app: App<Element>, configuration: VariantJSConfiguration = {}): void => {
    app.provide('configuration', configuration);
  },
};
