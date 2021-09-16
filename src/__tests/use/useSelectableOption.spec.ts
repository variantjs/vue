/* eslint-disable @typescript-eslint/no-explicit-any */
import { NormalizedOption } from '@variantjs/core';
import {
  ComputedRef, computed, ref, Ref, nextTick,
} from 'vue';
import useSelectableOption from '../../use/useSelectableOption';

describe('useSelectableOption', () => {
  const options: ComputedRef<NormalizedOption[]> = computed(() => [
    { value: 'a', text: 'Option A' },
    { value: 'b', text: 'Option B' },
    { value: 'c', text: 'Option C' },
  ]);

  const localValue: Ref = ref(null);

  const multiple: Ref<boolean> = ref(true);
  const noMultiple: Ref<boolean> = ref(false);

  beforeEach(() => {
    localValue.value = null;
  });

  it('contains an selectedOption ref and selectOption, toggleOption, optionIsSelected methods', () => {
    const {
      selectedOption, selectOption, toggleOption, optionIsSelected,
    } = useSelectableOption(
      options,
      localValue,
      noMultiple,
    );

    expect(typeof selectedOption).toBe('object');
    expect(typeof selectOption).toBe('function');
    expect(typeof toggleOption).toBe('function');
    expect(typeof optionIsSelected).toBe('function');
  });

  describe('selectedOption', () => {
    it('returns undefined as the selected option if no local value', () => {
      const {
        selectedOption,
      } = useSelectableOption(
        options,
        ref(null),
        noMultiple,
      );

      expect(selectedOption.value).toBeUndefined();
    });

    it('returns undefined as the selected option if local value is not part of the options', () => {
      const {
        selectedOption,
      } = useSelectableOption(
        options,
        ref('d'),
        noMultiple,
      );

      expect(selectedOption.value).toBeUndefined();
    });

    it('returns the option that matchs the localValue', () => {
      const {
        selectedOption,
      } = useSelectableOption(
        options,
        ref('b'),
        noMultiple,
      );

      expect(selectedOption.value).toEqual({ value: 'b', text: 'Option B' });
    });

    it('returns all the options that match the localValue when multiple', () => {
      const {
        selectedOption,
      } = useSelectableOption(
        options,
        ref(['b', 'c']),
        ref(true),
      );

      expect(selectedOption.value).toEqual(
        [
          { value: 'b', text: 'Option B' },
          { value: 'c', text: 'Option C' },
        ],
      );
    });

    it('returns an empty array if no localValue when multiple', () => {
      const {
        selectedOption,
      } = useSelectableOption(
        options,
        ref(null),
        ref(true),
      );

      expect(selectedOption.value).toEqual([]);
    });

    it('sets the selected options from the old selected options list ', async () => {
      const value = ref<any>(null);

      const {
        selectedOption,
      } = useSelectableOption(
        options,
        value,
        ref(true),
      );

      selectedOption.value = [
        { value: 'b', text: 'Option BA' },
      ];

      value.value = ['b'];

      await nextTick();

      expect(selectedOption.value).toEqual([
        { value: 'b', text: 'Option BA' },
      ]);
    });

    it('sets the selected options from the options list when it also have old selected options ', async () => {
      const value = ref<any>(null);

      const {
        selectedOption,
      } = useSelectableOption(
        options,
        value,
        ref(true),
      );

      selectedOption.value = [
        { value: 'f', text: 'Option F' },
      ];

      value.value = ['b'];

      await nextTick();

      expect(selectedOption.value).toEqual([
        options.value[1],
      ]);
    });

    it('sets the selected options from the options list ', async () => {
      const value = ref<any>(null);

      const {
        selectedOption,
      } = useSelectableOption(
        options,
        value,
        ref(true),
      );

      selectedOption.value = undefined;

      value.value = ['b'];

      await nextTick();

      expect(selectedOption.value).toEqual([
        options.value[1],
      ]);
    });
  });

  describe('selectOption method', () => {
    describe('when working with regular configuration (not multiple)', () => {
      it('selects the option', () => {
        const {
          selectOption,
        } = useSelectableOption(
          options,
          localValue,
          noMultiple,
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
          noMultiple,
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
          noMultiple,
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
          multiple,
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
          multiple,
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
          multiple,
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
          multiple,
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
          noMultiple,
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
          noMultiple,
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
          noMultiple,
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
          multiple,
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
          multiple,
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
          multiple,
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
          multiple,
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
        noMultiple,
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
        multiple,
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
        multiple,
      );

      localValue.value = 'b';

      expect(optionIsSelected({ ...options.value[1] })).toBe(false);
      expect(optionIsSelected({ ...options.value[0] })).toBe(false);
    });
  });
});
