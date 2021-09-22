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
} from './components';

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

export default {
  install: (app: App<Element>, configuration: VariantJSConfiguration = {}): void => {
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.emitter = new Emitter();

    app.provide('configuration', configuration);
  },
};
