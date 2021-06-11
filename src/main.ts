import {
  WithVariantProps, WithVariantPropsAndClassesList, TWrappedRadioClassesList,
} from '@variantjs/core';
import { createApp } from 'vue';

import App from './App.vue';
import {
  TWrappedRadioProps, TRadioProps, TCheckboxProps, TInputOptions, TSelectOptions,
} from './types';

import Emitter from './utils/emitter';

const app = createApp(App);

export type VariantJSConfiguration = {
  TInput?: TInputOptions
  TSelect?: TSelectOptions
  TRadio?: WithVariantProps<TRadioProps>
  TCheckbox?: WithVariantProps<TCheckboxProps>
  TWrappedRadio?: WithVariantPropsAndClassesList<TWrappedRadioProps, TWrappedRadioClassesList, TWrappedRadioClassesList>
};

app.use({
  install: (a) => {
    // eslint-disable-next-line no-param-reassign
    a.config.globalProperties.emitter = new Emitter();

    const theme: VariantJSConfiguration = {
      TSelect: {
        autofocus: true,
        'data-something': 'somethign',
      },
      TInput: {
        'data-something': 'somethign',
        'aria-label': 'gsdgds',
        maxlength: 10,
        placeholder: 'type something',
        classes: 'block w-full pl-3 pr-10 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
        variants: {
          error: {
            classes: 'text-red-500 bg-red-200',
            maxlength: undefined,
            placeholder: 'Something wrong happen',
            'data-something': undefined,
            'aria-label': 'other',
          },
        },
      },
      TWrappedRadio: {
        wrapperTag: 'span',
        fixedClasses: {
          wrapper: 'flex items-center space-x-2 border border-blue-500',
          wrapperChecked: 'flex items-center space-x-2 border border-red-500',
          // inputWrapper: 'flex items-center space-x-2 border border-red-500',
          // inputWrapperChecked: 'flex items-center space-x-2 border border-red-500',
          // input: 'flex items-center space-x-2 border border-red-500',
          // label: 'flex items-center space-x-2 border border-red-500',
          // labelChecked: 'flex items-center space-x-2 border border-red-500',
        },
        variants: {
          test: {

          },
        },
      },
      // TSelect: {
      //   classes: 'block w-full pl-3 pr-10 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      // },
    };

    a.provide('theme', theme);
  },
});

app.mount('#app');
