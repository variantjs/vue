import { NormalizedOption } from '@variantjs/core';
import {
  ComputedRef, computed, ref, Ref, nextTick,
} from 'vue';
import useActivableOption from '../../use/useActivableOption';
import { useSetup } from './useSetup';

describe('useActivableOption', () => {
  const optionsRef = ref<NormalizedOption[]>([
    { value: 'a', text: 'Option A' },
    { value: 'b', text: 'Option B' },
    { value: 'c', text: 'Option C' },
  ]);

  const options: ComputedRef<NormalizedOption[]> = computed(() => optionsRef.value);

  const localValue: Ref = ref(null);

  beforeEach(() => {
    localValue.value = null;

    optionsRef.value = [
      { value: 'a', text: 'Option A' },
      { value: 'b', text: 'Option B' },
      { value: 'c', text: 'Option C' },
    ];
  });

  it('contains an activeOption ref and initActiveOption, optionIsActive, setActiveOption, setNextOptionActive, setPrevOptionActive methods', () => {
    useSetup(() => {
      const {
        activeOption, initActiveOption, optionIsActive, setActiveOption, setNextOptionActive, setPrevOptionActive,
      } = useActivableOption(
        options,
        localValue,
      );

      expect(typeof activeOption).toBe('object');
      expect(typeof initActiveOption).toBe('function');
      expect(typeof optionIsActive).toBe('function');
      expect(typeof setActiveOption).toBe('function');
      expect(typeof setNextOptionActive).toBe('function');
      expect(typeof setPrevOptionActive).toBe('function');
    });
  });

  it('sets the active option', () => {
    useSetup(() => {
      const {
        activeOption, setActiveOption,
      } = useActivableOption(
        options,
        localValue,
      );

      setActiveOption({ ...options.value[1] });

      expect(activeOption.value).toEqual({ ...options.value[1] });
    });
  });

  describe('options change', () => {
    it('sets the active option to the first new option when initially set', () => {
      optionsRef.value = [];

      useSetup(async () => {
        const {
          activeOption,
        } = useActivableOption(
          options,
          localValue,
        );

        optionsRef.value = [{ value: 'foo', text: 'Bar' }];

        await nextTick();

        expect(activeOption.value!.value).toEqual('d');
      });
    });

    it('doesnt set an active option if no options', () => {
      optionsRef.value = [];

      useSetup(async () => {
        const {
          activeOption,
        } = useActivableOption(
          options,
          localValue,
        );

        optionsRef.value = [];

        await nextTick();

        expect(activeOption.value).toBe(null);
      });
    });

    it('sets the active option to the first new option ', () => {
      useSetup(async () => {
        const {
          activeOption,
        } = useActivableOption(
          options,
          localValue,
        );

        expect(activeOption.value!.value).toEqual('a');

        optionsRef.value.push({ value: 'd', text: 'Option D' });

        await nextTick();

        expect(activeOption.value!.value).toEqual('d');
      });
    });
  });

  describe('optionIsActive', () => {
    it('deletermines if an option optionIsActive when activeOption is null', () => {
      useSetup(() => {
        const {
          activeOption, optionIsActive,
        } = useActivableOption(
          options,
          localValue,
        );

        activeOption.value = null;

        expect(optionIsActive({ ...options.value[1] })).toBe(false);
      });
    });

    it('deletermines if an option optionIsActive when activeOption is equal to option', () => {
      useSetup(() => {
        const {
          activeOption, optionIsActive,
        } = useActivableOption(
          options,
          localValue,
        );

        activeOption.value = { ...options.value[1] };

        expect(optionIsActive({ ...options.value[1] })).toBe(true);
      });
    });

    it('deletermines if an option optionIsActive when activeOption is not equal to option', () => {
      useSetup(() => {
        const {
          activeOption, optionIsActive,
        } = useActivableOption(
          options,
          localValue,
        );

        activeOption.value = { ...options.value[0] };

        expect(optionIsActive({ ...options.value[1] })).toBe(false);
      });
    });
  });

  it('returns the first option if no one is selected', () => {
    useSetup(() => {
      const {
        activeOption,
      } = useActivableOption(
        options,
        localValue,
      );

      expect(activeOption.value).toEqual(options.value[0]);
    });
  });

  it('return null if the options list is empty', () => {
    useSetup(() => {
      const {
        activeOption,
      } = useActivableOption(
        computed(() => []),
        localValue,
      );

      expect(activeOption.value).toBeNull();
    });
  });

  it('return the active option', () => {
    localValue.value = 'b';

    useSetup(() => {
      const {
        activeOption,

      } = useActivableOption(
        options,
        localValue,
      );

      expect(activeOption.value).toEqual(options.value[1]);
    });
  });

  it('sets the active option with the `setActiveOption` method', () => {
    useSetup(() => {
      const {
        activeOption, setActiveOption,
      } = useActivableOption(
        options,
        localValue,
      );

      setActiveOption(options.value[1]);

      expect(activeOption.value).toEqual(options.value[1]);
    });
  });

  describe('setNextOptionActive', () => {
    it('sets the next index as active', () => {
      useSetup(() => {
        const {
          activeOption, setNextOptionActive,
        } = useActivableOption(
          options,
          localValue,
        );

        setNextOptionActive();

        expect(activeOption.value).toEqual(options.value[1]);
      });
    });

    it('sets the next index that is not disabled as active', () => {
      useSetup(() => {
        const {
          activeOption, setNextOptionActive,
        } = useActivableOption(
          computed(() => [
            { value: 'a', text: 'Option A' },
            { value: 'b', text: 'Option B', disabled: true },
            { value: 'c', text: 'Option C' },
          ]),
          localValue,
        );

        setNextOptionActive();

        expect(activeOption.value).toEqual(options.value[2]);
      });
    });

    it('keeps the current option if is the last one', () => {
      useSetup(() => {
        const {
          activeOption, setNextOptionActive, setActiveOption,
        } = useActivableOption(
          options,
          localValue,
        );

        setActiveOption(options.value[2]);

        setNextOptionActive();

        expect(activeOption.value).toEqual(options.value[2]);
      });
    });

    it('considers the option index as zero when no active option selected', () => {
      useSetup(() => {
        const {
          activeOption, setNextOptionActive,
        } = useActivableOption(
          options,
          localValue,
        );

        activeOption.value = null;

        setNextOptionActive();

        expect(activeOption.value).toEqual(options.value[1]);
      });
    });

    it('considers the option index as zero when no the active option is not found', () => {
      useSetup(() => {
        const {
          activeOption, setNextOptionActive,
        } = useActivableOption(
          options,
          localValue,
        );

        activeOption.value = { value: 'other', text: 'Other' };

        setNextOptionActive();

        expect(activeOption.value).toEqual(options.value[1]);
      });
    });
  });

  describe('setPrevOptionActive', () => {
    it('sets the prev index as active', () => {
      useSetup(() => {
        const {
          activeOption, setPrevOptionActive, setActiveOption,
        } = useActivableOption(
          options,
          localValue,
        );

        setActiveOption(options.value[1]);

        setPrevOptionActive();

        expect(activeOption.value).toEqual(options.value[0]);
      });
    });

    it('sets the prex index that is not disabled as active', () => {
      useSetup(() => {
        const {
          activeOption, setPrevOptionActive, setActiveOption,
        } = useActivableOption(
          computed(() => [
            { value: 'a', text: 'Option A' },
            { value: 'b', text: 'Option B', disabled: true },
            { value: 'c', text: 'Option C' },
          ]),
          localValue,
        );

        setActiveOption(options.value[2]);

        setPrevOptionActive();

        expect(activeOption.value).toEqual(options.value[0]);
      });
    });

    it('keeps the first one selected if its the current option', () => {
      useSetup(() => {
        const {
          activeOption, setPrevOptionActive,
        } = useActivableOption(
          options,
          localValue,
        );

        setPrevOptionActive();

        expect(activeOption.value).toEqual(options.value[0]);
      });
    });
  });
});
