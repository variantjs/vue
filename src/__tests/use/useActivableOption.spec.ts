import { NormalizedOption } from '@variantjs/core';
import {
  ComputedRef, computed, ref, Ref,
} from 'vue';
import useActivableOption from '../../use/useActivableOption';
import { useSetup } from './useSetup';

describe('useActivableOption', () => {
  const options: ComputedRef<NormalizedOption[]> = computed(() => [
    { value: 'a', text: 'Option A' },
    { value: 'b', text: 'Option B' },
    { value: 'c', text: 'Option C' },
  ]);

  const localValue: Ref = ref(null);

  beforeEach(() => {
    localValue.value = null;
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

  it('returns the first options as active option if no one is selected', () => {
    useSetup(() => {
      const {
        activeOption, initActiveOption,
      } = useActivableOption(
        options,
        localValue,
      );

      expect(activeOption.value).toEqual(options.value[0]);
      expect(initActiveOption()).toEqual(options.value[0]);
    });
  });

  it('return null as the active options if the options list is empty', () => {
    useSetup(() => {
      const {
        activeOption, initActiveOption,
      } = useActivableOption(
        computed(() => []),
        localValue,
      );

      expect(activeOption.value).toBeNull();
      expect(initActiveOption()).toBeNull();
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

    it('considers the option index as zero when no the active options is not found', () => {
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
