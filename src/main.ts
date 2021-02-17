import { WithVariantProps } from '@variantjs/core';
import { createApp } from 'vue';

import App from './App.vue';
import { TInputProps } from './components/TInput.vue';
import { TSelectProps } from './components/TSelect.vue';

const app = createApp(App);

export type VariantJSConfiguration = {
  TInput?: WithVariantProps<TInputProps>
  TSelect?: WithVariantProps<TSelectProps>
};

app.use({
  install: (app) => {
    app.provide('theme', {
      TInput: {
        classes: 'block w-full pl-3 pr-10 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
        test: 'yyy',
        some: 'sss',
        variants: {
          test2: {
            test: 'xxx',
          },
        },
      },
      TSelect: {
        classes: 'block w-full pl-3 pr-10 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      },
    });
  },
});

app.mount('#app');
