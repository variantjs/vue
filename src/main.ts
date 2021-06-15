import { createApp } from 'vue';

import variantJsPlugin, { VariantJSConfiguration } from '.';

import App from './App.vue';

const app = createApp(App);

const configuration: VariantJSConfiguration = {
  // TCheckbox: {
  //   type: 'checkbox',
  // },
  // TSelect: {
  //   autofocus: true,
  //   'data-something': 'somethign',
  // },
  // TInput: {
  //   'data-something': 'somethign',
  //   'aria-label': 'gsdgds',
  //   maxlength: 10,
  //   placeholder: 'type something',
  //   classes: 'block w-full pl-3 pr-10 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
  //   variants: {
  //     error: {
  //       classes: 'text-red-500 bg-red-200',
  //       maxlength: undefined,
  //       placeholder: 'Something wrong happen',
  //       'data-something': undefined,
  //       'aria-label': 'other',
  //     },
  //   },
  // },
};

app.use(variantJsPlugin, configuration);

app.mount('#app');
