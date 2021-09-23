// import { App } from 'vue';

// import { VariantJSConfiguration } from './types';

// Import Utils
// import { Emitter } from './utils/emitter';
// import { getVariantProps, getVariantPropsWithClassesList } from './utils/getVariantProps';
// import { sameWidthModifier } from './utils/popper';
// import { svgToVueComponent } from './utils/svgToVueComponent';

import plugin from './plugin';

// Import Components
import TAlert from './components/TAlert.vue';
import TButton from './components/TButton.vue';
import TCard from './components/TCard.vue';
import TCheckbox from './components/TCheckbox.vue';
import TDropdown from './components/TDropdown.vue';
import TInput from './components/TInput.vue';
import TInputGroup from './components/TInputGroup.vue';
import TRadio from './components/TRadio.vue';
import TRichSelect from './components/TRichSelect.vue';
import TSelect from './components/TSelect.vue';
import TTag from './components/TTag.vue';
import TTextarea from './components/TTextarea.vue';

// Import uses
// import useActivableOption from './use/useActivableOption';
// import useConfiguration from './use/useConfiguration';
// import useConfigurationWithClassesList from './use/useConfigurationWithClassesList';
// import useFetchsOptions from './use/useFetchsOptions';
// import useInjectsClassesList from './use/useInjectsClassesList';
// import useInjectsClassesListClass from './use/useInjectsClassesListClass';
// import useInjectsConfiguration from './use/useInjectsConfiguration';
// import useMulipleableVModel from './use/useMulipleableVModel';
// import useMultioptions from './use/useMultioptions';
// import useSelectableOption from './use/useSelectableOption';
// import useVModel from './use/useVModel';

export * from './types';

// Export components
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
  // Installer
  plugin as variantJsPlugin,
};

// // Export utils
// export {
//   Emitter,
//   getVariantProps,
//   getVariantPropsWithClassesList,
//   sameWidthModifier,
//   svgToVueComponent,
// };

// // Export uses
// export {
//   useActivableOption,
//   useConfiguration,
//   useConfigurationWithClassesList,
//   useFetchsOptions,
//   useInjectsClassesList,
//   useInjectsClassesListClass,
//   useInjectsConfiguration,
//   useMulipleableVModel,
//   useMultioptions,
//   useSelectableOption,
//   useVModel,
// };
