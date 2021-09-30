import * as library from '../index';

describe('main file', () => {
  it('provides all the data needed', () => {
    expect(Object.keys(library)).toEqual([
      'TInput',
      'TButton',
      'TTextarea',
      'TSelect',
      'TCheckbox',
      'TRadio',
      'TInputGroup',
      'TRichSelect',
      'TTag',
      'TCard',
      'TDropdown',
      'TAlert',
      'TModal',
      'variantJS',
      'Emitter',
      'getVariantProps',
      'getVariantPropsWithClassesList',
      'sameWidthModifier',
      'svgToVueComponent',
      'useActivableOption',
      'useConfiguration',
      'useConfigurationWithClassesList',
      'useFetchsOptions',
      'useInjectsClassesList',
      'useInjectsClassesListClass',
      'useInjectsConfiguration',
      'useMulipleableVModel',
      'useMultioptions',
      'useSelectableOption',
      'useVModel',
    ]);
  });
});
