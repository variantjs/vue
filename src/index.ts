import { App } from 'vue';

import { VariantJSConfiguration } from './types';

import {
  Emitter,
  getVariantProps,
  getVariantPropsWithClassesList,
  sameWidthModifier,
  svgToVueComponent,
} from './utils';

export * from './types';

const TAlert = () => import('./components/TAlert.vue');
const TButton = () => import('./components/TButton.vue');
const TCard = () => import('./components/TCard.vue');
const TCheckbox = () => import('./components/TCheckbox.vue');
const TDropdown = () => import('./components/TDropdown.vue');
const TInput = () => import('./components/TInput.vue');
const TInputGroup = () => import('./components/TInputGroup.vue');
const TRadio = () => import('./components/TRadio.vue');
const TRichSelect = () => import('./components/TRichSelect.vue');
const TSelect = () => import('./components/TSelect.vue');
const TTag = () => import('./components/TTag.vue');
const TTextarea = () => import('./components/TTextarea.vue');

export {
  TAlert,
  TButton,
  TCard,
  TCheckbox,
  TDropdown,
  TInput,
  TInputGroup,
  TRadio,
  TRichSelect,
  TSelect,
  TTag,
  TTextarea,
};

export {
  Emitter,
  getVariantProps,
  getVariantPropsWithClassesList,
  sameWidthModifier,
  svgToVueComponent,
};

export {
  useActivableOption,
  useConfiguration,
  useConfigurationWithClassesList,
  useFetchsOptions,
  useInjectsClassesList,
  useInjectsClassesListClass,
  useInjectsConfiguration,
  useMulipleableVModel,
  useMultioptions,
  useSelectableOption,
  useVModel,
} from './use';

export const variantJsPlugin = {
  install: (app: App<Element>, configuration: VariantJSConfiguration = {}): void => {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.emitter = new Emitter();

    app.provide('configuration', configuration);
  },
};
