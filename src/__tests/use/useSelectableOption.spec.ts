import { NormalizedOption } from '@variantjs/core';
import {
  ComputedRef, computed, ref, Ref,
} from 'vue';
import useSelectableOption from '../../use/useSelectableOption';

describe('useSelectableOption', () => {
  const options: ComputedRef<NormalizedOption[]> = computed(() => [
    { value: 'a', text: 'Option A' },
    { value: 'b', text: 'Option B' },
    { value: 'c', text: 'Option C' },
  ]);

  const localValue: Ref = ref(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const configuration: ComputedRef<any> = computed(() => ({}));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const configurationMultiple: ComputedRef<any> = computed(() => ({
    multiple: true,
  }));

  beforeEach(() => {
    localValue.value = null;
  });

  it('contains an selectedOption ref and selectOption, toggleOption, optionIsSelected methods', () => {
    const {
      selectedOption, selectOption, toggleOption, optionIsSelected,
    } = useSelectableOption(
      options,
      localValue,
      configuration,
    );

    expect(typeof selectedOption).toBe('object');
    expect(typeof selectOption).toBe('function');
    expect(typeof toggleOption).toBe('function');
    expect(typeof optionIsSelected).toBe('function');
  });

  describe('selectOption method', () => {
    describe('when working with regular configuration (not multiple)', () => {
      it('selects the option', () => {
        const {
          selectOption,
        } = useSelectableOption(
          options,
          localValue,
          configuration,
        );

        selectOption({ ...options.value[1] });
        expect(localValue.value).toBe('b');
      });

      it('selects the option when localValue is an array', () => {
        localValue.value = ['b'];

        const {
          selectOption,
        } = useSelectableOption(
          options,
          localValue,
          configuration,
        );

        selectOption({ ...options.value[1] });
        expect(localValue.value).toBe('b');
      });

      it('doesnt do anything if option is selected', () => {
        const {
          selectOption,
        } = useSelectableOption(
          options,
          localValue,
          configuration,
        );

        selectOption({ ...options.value[1] });
        expect(localValue.value).toBe('b');
      });
    });

    describe('when working with multiple values', () => {
      it('selects the option when localValue is some random value', () => {
        localValue.value = 'b';
        const {
          selectOption,
        } = useSelectableOption(
          options,
          localValue,
          configurationMultiple,
        );

        selectOption({ ...options.value[1] });
        expect(localValue.value).toEqual(['b']);
      });

      it('adds the option when localValue is empty array', () => {
        localValue.value = [];

        const {
          selectOption,
        } = useSelectableOption(
          options,
          localValue,
          configurationMultiple,
        );

        selectOption({ ...options.value[1] });
        expect(localValue.value).toEqual(['b']);
      });

      it('adds the option ', () => {
        localValue.value = ['a'];

        const {
          selectOption,
        } = useSelectableOption(
          options,
          localValue,
          configurationMultiple,
        );

        selectOption({ ...options.value[1] });
        expect(localValue.value).toEqual(['a', 'b']);
      });

      it('doesnt do anything if option is already selected', () => {
        localValue.value = ['b'];
        const {
          selectOption,
        } = useSelectableOption(
          options,
          localValue,
          configurationMultiple,
        );

        selectOption({ ...options.value[1] });
        expect(localValue.value).toEqual(['b']);
      });
    });
  });

  describe('toggleOption method', () => {
    describe('when working with regular configuration (not multiple)', () => {
      it('selects the option if not selected', () => {
        const {
          toggleOption,
        } = useSelectableOption(
          options,
          localValue,
          configuration,
        );

        toggleOption({ ...options.value[1] });
        expect(localValue.value).toBe('b');
      });

      it('selects the option when localValue is an array', () => {
        localValue.value = ['b'];

        const {
          toggleOption,
        } = useSelectableOption(
          options,
          localValue,
          configuration,
        );

        toggleOption({ ...options.value[1] });
        expect(localValue.value).toBe('b');
      });

      it('removes the value if option is already selected', () => {
        localValue.value = 'b';

        const {
          toggleOption,
        } = useSelectableOption(
          options,
          localValue,
          configuration,
        );

        toggleOption({ ...options.value[1] });
        expect(localValue.value).toBe(undefined);
      });
    });

    describe('when working with multiple values', () => {
      it('selects the option when localValue is some random value', () => {
        localValue.value = 'b';
        const {
          toggleOption,
        } = useSelectableOption(
          options,
          localValue,
          configurationMultiple,
        );

        toggleOption({ ...options.value[1] });
        expect(localValue.value).toEqual(['b']);
      });

      it('adds the option when localValue is empty array', () => {
        localValue.value = [];

        const {
          toggleOption,
        } = useSelectableOption(
          options,
          localValue,
          configurationMultiple,
        );

        toggleOption({ ...options.value[1] });
        expect(localValue.value).toEqual(['b']);
      });

      it('adds the option ', () => {
        localValue.value = ['a'];

        const {
          toggleOption,
        } = useSelectableOption(
          options,
          localValue,
          configurationMultiple,
        );

        toggleOption({ ...options.value[1] });
        expect(localValue.value).toEqual(['a', 'b']);
      });

      it('substracts the option if it is already selected', () => {
        localValue.value = ['a', 'b', 'c'];
        const {
          toggleOption,
        } = useSelectableOption(
          options,
          localValue,
          configurationMultiple,
        );

        toggleOption({ ...options.value[1] });
        expect(localValue.value).toEqual(['a', 'c']);
      });
    });
  });

  describe('optionIsSelected method', () => {
    it('determines if a option is selected', () => {
      const {
        optionIsSelected,
      } = useSelectableOption(
        options,
        localValue,
        configuration,
      );

      localValue.value = 'a';

      expect(optionIsSelected({ ...options.value[0] })).toBe(true);
      expect(optionIsSelected({ ...options.value[1] })).toBe(false);
    });

    it('determines if a option is selected when working with multiple configuration', () => {
      const {
        optionIsSelected,
      } = useSelectableOption(
        options,
        localValue,
        configurationMultiple,
      );

      localValue.value = ['b'];

      expect(optionIsSelected({ ...options.value[1] })).toBe(true);
      expect(optionIsSelected({ ...options.value[0] })).toBe(false);
    });

    it('determines if a option is selected when working with multiple configuration and value is not an array', () => {
      const {
        optionIsSelected,
      } = useSelectableOption(
        options,
        localValue,
        configurationMultiple,
      );

      localValue.value = 'b';

      expect(optionIsSelected({ ...options.value[1] })).toBe(false);
      expect(optionIsSelected({ ...options.value[0] })).toBe(false);
    });
  });
});
