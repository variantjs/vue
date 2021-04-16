import {
  WithVariantProps, WithVariantPropsAndClassesList, TWrappedRadioClassesListKeys, CSSClass,
} from '@variantjs/core';
import { createApp } from 'vue';

import App from './App.vue';
import { TInputProps } from './components/TInput.vue';
import { TSelectProps } from './components/TSelect.vue';
import { TRadioProps } from './components/TRadio.vue';
import { TCheckboxProps } from './components/TCheckbox.vue';
import { TWrappedRadioProps } from './components/TWrappedRadio.vue';

import Emitter from './utils/emitter';

const app = createApp(App);

export type VariantJSConfiguration = {
  TInput?: WithVariantProps<TInputProps>
  TSelect?: WithVariantProps<TSelectProps>
  TRadio?: WithVariantProps<TRadioProps>
  TCheckbox?: WithVariantProps<TCheckboxProps>
  TWrappedRadio?: WithVariantPropsAndClassesList<Record<string, unknown>, {
    [key in typeof TWrappedRadioClassesListKeys[number]]?: CSSClass;
  }, {
    [key in typeof TWrappedRadioClassesListKeys[number]]?: CSSClass;
  }>
};

app.use({
  install: (a) => {
    // eslint-disable-next-line no-param-reassign
    a.config.globalProperties.emitter = new Emitter();

    const theme: VariantJSConfiguration = {
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
      TWrappedRadio: {
        ff: {
          sdgds: 'gsd',
        },
        fixedClasses: {
          test: 'gsd',
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
            fixedClasses: {
              wrapperChecked: 'gsdgds',
              wrapper: 'fasfsa',
            },
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
