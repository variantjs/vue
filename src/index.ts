import { App } from 'vue';

import {
  TRadioOptions, TCheckboxOptions, TInputOptions, TSelectOptions,
} from './types';

import Emitter from './utils/emitter';

export type VariantJSConfiguration = {
  TInput?: TInputOptions
  TSelect?: TSelectOptions
  TRadio?: TRadioOptions
  TCheckbox?: TCheckboxOptions
};

export default {
  install: (app: App<Element>, configuration: VariantJSConfiguration = {}): void => {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.emitter = new Emitter();

    app.provide('configuration', configuration);
  },
};
