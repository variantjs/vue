<template>
  <div
    :class="configuration.classesList?.wrapper"
    v-bind="attributes"
  >
    <t-dropdown
      ref="dropdown"
      :show="shown"
      :classes="dropdownClasses"
      :fixed-classes="undefined"
      :toggle-on-focus="false"
      :toggle-on-click="false"
      :toggle-on-hover="false"
      :popper-options="configuration.dropdownPopperOptions"
      :placement="configuration.dropdownPlacement"
      data-rich-select-trigger="true"
      @mouseover="$emit('mouseover', $event)"
      @mouseleave="$emit('mouseleave', $event)"
      @touchstart="$emit('touchstart', $event)"
      @shown="$emit('shown')"
      @hidden="$emit('hidden')"
      @before-show="$emit('before-show')"
      @before-hide="$emit('before-hide')"
      @blur="blurHandler"
      @focus="focusHandler"
      @keydown.enter="keydownEnterHandler"
      @keydown.space="keydownSpaceHandler"
      @keydown.down="keydownDownHandler"
      @keydown.up="keydownUpHandler"
      @keydown.esc="keydownEscHandler"
      @mousedown="mousedownHandler"
      @blur-on-child="blurOnChildHandler"
    >
      <template #trigger>
        <rich-select-trigger
          ref="trigger"
        />
      </template>

      <rich-select-dropdown ref="dropdown" />
    </t-dropdown>
  </div>
</template>

<script lang="ts">
import {
  InputOptions, TRichSelectConfig, TRichSelectClassesKeys, TRichSelectClassesValidKeys, isEqual, addToArray, substractFromArray,
  TDropdownPopperDefaultOptions as defaultPopperOptions,
  NormalizedOption,
  NormalizedOptions,
  CSSRawClassesList,
  throttle,
} from '@variantjs/core';
import {
  computed, defineComponent, PropType, provide, ref, watch,
} from 'vue';
import { Options, Placement } from '@popperjs/core';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { sameWidthModifier } from '../utils/popper';
import {
  useAttributes, useConfigurationWithClassesList, useMulipleableVModel, useMultioptions,
} from '../use';
import { Data, TRichSelectOptions, TSelectValue } from '../types';
import RichSelectTrigger from './TRichSelect/RichSelectTrigger.vue';
import RichSelectDropdown from './TRichSelect/RichSelectDropdown.vue';
import TDropdown from './TDropdown.vue';

// @TODO: Move this to the core library
const flattenOptions = (options: NormalizedOptions): NormalizedOptions => options.map((option: NormalizedOption) => {
  if (option.children) {
    return flattenOptions(option.children);
  }

  return option;
}).flat();

// @vue/component
export default defineComponent({
  name: 'TRichSelect',
  components: {
    RichSelectTrigger,
    RichSelectDropdown,
    TDropdown,
  },
  props: {
    ...getVariantPropsWithClassesList<TRichSelectOptions, TRichSelectClassesValidKeys>(),
    modelValue: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<TSelectValue>,
      default: undefined,
    },
    options: {
      type: [Array, Object] as PropType<InputOptions>,
      default: undefined,
    },
    multiple: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    dropdownPlacement: {
      type: String as PropType<Placement>,
      default: undefined,
      validator: (value: string):boolean => [
        'auto',
        'auto-start',
        'auto-end',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'right',
        'right-start',
        'right-end',
        'left',
        'left-start',
        'left-end',
      ].includes(value),
    },
    dropdownPopperOptions: {
      type: Object as PropType<Options>,
      default: (): Options => ({
        ...defaultPopperOptions,
        placement: 'bottom',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -2],
            },
          },
          sameWidthModifier,
        ],
      } as Options),
    },
    closeOnSelect: {
      type: Boolean,
      default: undefined,
    },
    toggleOnFocus: {
      type: Boolean,
      default: false,
    },
    toggleOnClick: {
      type: Boolean,
      default: true,
    },
    hideSearchBox: {
      type: Boolean,
      default: false,
    },

    // selectOnClose?: boolean,

    // valueAttribute?: boolean,
    // textAttribute?: boolean,
    // delay?: number,
    // fetchOptions?: (query: string, nextPage?: number) => AjaxResults,
    // minimumInputLength?: number,
    // minimumInputLengthText?: ((minimumInputLength: number, query?: string) => string) | string,
    // minimumResultsForSearch?: number,
    // hideSearchBox?: boolean,
    // openOnFocus?: boolean,

    // clearable?: boolean,
    // placeholder?: string,
    // searchBoxPlaceholder?: string,
    // noResultsText?: string,
    // searchingText?: string,
    // loadingMoreResultsText?: string,
    // maxHeight?: number,
  },
  setup(props, { emit }) {
    // @TODO: set proper type
    const dropdown = ref<HTMLInputElement>();

    // Data
    const shown = ref<boolean>(false);

    const localValue = useMulipleableVModel(props, 'modelValue');

    // Computed properties
    const normalizedOptions = useMultioptions(props, 'options');

    /**
     * List of all possible options
     */
    const flattenedOptions = computed((): NormalizedOption[] => flattenOptions(normalizedOptions.value));

    const activeOption = ref<NormalizedOption | null>(
      flattenedOptions.value.find((option: NormalizedOption) => option.value === localValue.value)
      || (flattenedOptions.value.length > 0 ? flattenedOptions.value[0] : null)
      || null,
    );

    const selectedOption = computed((): NormalizedOption | undefined => flattenedOptions.value.find((option) => isEqual(option.value, localValue.value)));

    const activeOptionIndex = computed((): number => {
      if (activeOption.value === null) {
        return 0;
      }

      const index = flattenedOptions.value.findIndex((option) => isEqual(option.value, (activeOption.value as NormalizedOption).value));

      return index < 0 ? 0 : index;
    });

    const configuration = useConfigurationWithClassesList<TRichSelectOptions>(TRichSelectConfig, TRichSelectClassesKeys);

    const attributes = useAttributes<TRichSelectOptions>(configuration);

    // Methods:
    const optionIsActive = (option: NormalizedOption): boolean => isEqual(activeOption.value?.value, option.value);

    const optionIsSelected = (option: NormalizedOption): boolean => {
      if (configuration.value.multiple && Array.isArray(localValue.value)) {
        return localValue.value.some((value) => isEqual(value, option.value));
      }

      return isEqual(localValue.value, option.value);
    };

    const hideDropdown = (): void => {
      shown.value = false;
    };

    const showDropdown = (): void => {
      shown.value = true;
    };

    const throttledShowDropdown = throttle(showDropdown, 200);

    const toggleDropdown = (): void => {
      if (shown.value) {
        hideDropdown();
      } else {
        throttledShowDropdown();
      }
    };

    const focusTrigger = (): void => {
      dropdown.value?.focus();
    };

    const toggleOption = (option: NormalizedOption): void => {
      if (optionIsSelected(option)) {
        if (Array.isArray(localValue.value)) {
          localValue.value = substractFromArray(localValue.value, option.value);
        } else {
          localValue.value = null;
        }
      } else if (Array.isArray(localValue.value)) {
        localValue.value = addToArray(localValue.value, option.value);
      } else {
        localValue.value = option.value;
      }
    };

    const setActiveOption = (option: NormalizedOption): void => {
      activeOption.value = option;
    };

    const toggleActiveOption = (): void => {
      if (!activeOption.value === null) {
        return;
      }

      toggleOption((activeOption.value as NormalizedOption));
    };

    const setNextOptionActive = (): void => {
      if (activeOptionIndex.value >= flattenedOptions.value.length - 1) {
        return;
      }

      const newActiveOption = flattenedOptions.value[activeOptionIndex.value + 1];
      setActiveOption(newActiveOption);
    };

    const setPrevOptionActive = (): void => {
      if (activeOptionIndex.value === 0) {
        return;
      }

      const newActiveOption = flattenedOptions.value[activeOptionIndex.value - 1];
      setActiveOption(newActiveOption);
    };

    const optionSelected = (): void => {
      if (shown.value === false) {
        return;
      }

      if (
        configuration.value.closeOnSelect === true
        // If `closeOnSelect`  is not set hide the dropdown only when is not
        // multiple
        || (configuration.value.closeOnSelect === undefined && !configuration.value.multiple)) {
        hideDropdown();

        focusTrigger();
      }
    };

    const keydownDownHandler = (e: KeyboardEvent): void => {
      emit('keydown', e);

      e.preventDefault();

      if (shown.value === false && configuration.value.toggleOnClick) {
        throttledShowDropdown();
      } else {
        setNextOptionActive();
      }
    };

    const keydownUpHandler = (e: KeyboardEvent): void => {
      emit('keydown', e);

      e.preventDefault();

      if (shown.value === false && configuration.value.toggleOnClick) {
        throttledShowDropdown();
      } else {
        setPrevOptionActive();
      }
    };

    const keydownEnterHandler = (e: KeyboardEvent): void => {
      emit('keydown', e);

      if (shown.value === true) {
        toggleActiveOption();
      }
    };

    const keydownSpaceHandler = (e: KeyboardEvent): void => {
      emit('keydown', e);

      e.preventDefault();

      if (configuration.value.toggleOnClick && shown.value === false) {
        throttledShowDropdown();
      } else if (shown.value === true) {
        toggleActiveOption();
      }
    };

    const keydownEscHandler = (e: KeyboardEvent): void => {
      emit('keydown', e);

      if (shown.value === false) {
        return;
      }

      hideDropdown();

      focusTrigger();
    };

    watch(localValue, () => {
      optionSelected();
    });

    provide('configuration', configuration);

    provide('options', computed(() => normalizedOptions.value));

    provide('selectedOption', selectedOption);

    provide('toggleOption', toggleOption);

    provide('setActiveOption', setActiveOption);

    provide('optionIsSelected', optionIsSelected);

    provide('optionIsActive', optionIsActive);

    provide('keydownDownHandler', keydownDownHandler);

    provide('keydownUpHandler', keydownUpHandler);

    provide('keydownEscHandler', keydownEscHandler);

    provide('keydownEnterHandler', keydownEnterHandler);

    provide('shown', shown);

    return {
      configuration,
      attributes,
      shown,
      hideDropdown,
      toggleDropdown,
      throttledShowDropdown,
      activeOptionIndex,
      keydownDownHandler,
      keydownUpHandler,
      keydownSpaceHandler,
      keydownEnterHandler,
      keydownEscHandler,
      dropdown,
      focusTrigger,
    };
  },
  computed: {
    dropdownClasses(): CSSRawClassesList {
      const {
        enterActiveClass,
        enterFromClass,
        enterToClass,
        leaveActiveClass,
        leaveFromClass,
        leaveToClass,
        selectButton: trigger,
        dropdown,
      } = this.configuration.classesList || {};

      return {
        // trigger,
        // dropdown,
        dropdown: 'z-10 -mt-1 border-b border-l border-r rounded-b shadow-sm bg-white border-gray-300',
        trigger: 'w-full flex text-left justify-between items-center px-3 py-2 text-black transition duration-100 ease-in-out border rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed bg-white border-gray-300',
        enterActiveClass,
        enterFromClass,
        enterToClass,
        leaveActiveClass,
        leaveFromClass,
        leaveToClass,
      };
    },
  },
  methods: {
    mousedownHandler(e: MouseEvent): void {
      this.$emit('mousedown', e);

      if (this.configuration.toggleOnClick) {
        // If it has aa search box I need t to prevent default to ensure is focused
        if (!this.hideSearchBox && this.shown === false) {
          e.preventDefault();
        }

        this.toggleDropdown();
      }
    },
    focusHandler(e: FocusEvent): void {
      this.$emit('focus', e);

      if (this.configuration.toggleOnFocus) {
        this.throttledShowDropdown();
      }
    },
    blurOnChildHandler(e: FocusEvent): void {
      const target = e.target as HTMLButtonElement | HTMLInputElement;
      const relatedTarget = e.relatedTarget as HTMLElement | EventTarget;
      const relatedTargetDataset: Data | undefined = relatedTarget instanceof HTMLElement ? relatedTarget.dataset : undefined;

      if (
        (target.dataset.richSelectSearch !== undefined || target.dataset.richSelectTrigger !== undefined)

        && (relatedTargetDataset && relatedTargetDataset.richSelectSearch === undefined && relatedTargetDataset.richSelectTrigger === undefined)
      ) {
        target.focus();
      }
    },
    blurHandler(e: FocusEvent): void {
      this.$emit('blur', e);

      this.hideDropdown();
    },
  },
});

</script>
