import * as library from '../index';

describe('main file', () => {
  it('provides all the needed data', () => {
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
      'TDialog',
      'TToggle',
      'variantJS',
      'LoadingIcon',
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

  describe('callable utils', () => {
    it('can create an instance of emitter', () => {
      const emitter = new library.Emitter();

      expect(emitter).toBeInstanceOf(library.Emitter);
    });

    it('have functions', () => {
      expect(typeof library.getVariantProps).toBe('function');
      expect(typeof library.getVariantPropsWithClassesList).toBe('function');
      expect(typeof library.sameWidthModifier).toBe('object');
      expect(typeof library.svgToVueComponent).toBe('function');
    });
  });
});
