<template>
  <div
    :class="configuration.classesList?.wrapper"
    v-bind="attributes"
  >
    <t-select
      v-model="localValue"
      style="display: none"
      :fixed-classes="undefined"
      :classes="undefined"
      :multiple="configuration.multiple"
      :options="flattenedOptions"
      v-bind="$attrs"
    />

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
      @before-show="beforeShowHandler"
      @before-hide="beforeHideHandler"
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

      <rich-select-dropdown :ref="dropdown" />
    </t-dropdown>

    <rich-select-clear-button
      v-if="showClearButton"
      ref="clearButton"
      @click="clearValue"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  provide,
  ref,
  computed,
} from 'vue';
import {
  InputOptions,
  TRichSelectConfig,
  TRichSelectClassesKeys,
  TRichSelectClassesValidKeys,
  NormalizedOption,
  CSSRawClassesList,
  TDropdownPopperDefaultOptions as defaultPopperOptions,
  isEqual,
  throttle,
  Measure,
  Data,
} from '@variantjs/core';
import { Options, Placement } from '@popperjs/core';
import {
  useActivableOption,
  useConfigurationWithClassesList,
  useFetchsOptions,
  useMulipleableVModel,
  useSelectableOption,
} from '../use';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { sameWidthModifier } from '../utils/popper';
import {
  FetchOptionsFn, MinimumInputLengthTextProp, TRichSelectOptions, TSelectValue,
} from '../types';
import RichSelectTrigger from './TRichSelect/RichSelectTrigger.vue';
import RichSelectDropdown from './TRichSelect/RichSelectDropdown.vue';
import RichSelectClearButton from './TRichSelect/RichSelectClearButton.vue';
import TDropdown, { validDropdownPlacements } from './TDropdown.vue';
import TSelect from './TSelect.vue';

// @vue/component
export default defineComponent({
  name: 'TRichSelect',
  components: {
    RichSelectTrigger,
    RichSelectDropdown,
    RichSelectClearButton,
    TDropdown,
    TSelect,
  },
  inheritAttrs: false,
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
    normalizeOptions: {
      type: Boolean,
      default: true,
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
      validator: (value: string):boolean => validDropdownPlacements.includes(value),
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
    selectOnClose: {
      type: Boolean,
      default: false,
    },
    toggleOnFocus: {
      type: Boolean,
      default: false,
    },
    toggleOnClick: {
      type: Boolean,
      default: true,
    },
    valueAttribute: {
      type: String,
      default: undefined,
    },
    textAttribute: {
      type: String,
      default: undefined,
    },
    hideSearchBox: {
      type: Boolean,
      default: false,
    },
    searchBoxPlaceholder: {
      type: String,
      default: 'Search...',
    },
    noResultsText: {
      type: String,
      default: 'No options found',
    },
    searchingText: {
      type: String,
      default: 'Searching...',
    },
    loadingClosedPlaceholder: {
      type: String,
      default: 'Loading...',
    },
    loadingMoreResultsText: {
      type: String,
      default: 'Loading more options...',
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    maxHeight: {
      type: [Number, String] as PropType<Measure | null>,
      default: 250,
    },
    fetchOptions: {
      type: Function as PropType<FetchOptionsFn>,
      default: undefined,
    },
    prefetchOptions: {
      type: Boolean,
      default: false,
    },
    delay: {
      type: Number,
      default: 250,
    },
    minimumInputLength: {
      type: Number,
      default: undefined,
    },
    minimumInputLengthText: {
      type: [Function, String] as PropType<MinimumInputLengthTextProp>,
      default: () => (minimumInputLength: number): string => `Please enter ${minimumInputLength} or more characters`,
    },
    minimumResultsForSearch: {
      type: Number,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const { configuration, attributes } = useConfigurationWithClassesList<TRichSelectOptions>(TRichSelectConfig, TRichSelectClassesKeys);

    const { localValue, clearValue } = useMulipleableVModel(props, 'modelValue', configuration);

    const searchQuery = ref<string | undefined>(undefined);

    const {
      normalizedOptions,
      flattenedOptions,
      fetchsOptions,
      needsMoreCharsToFetch,
      needsMoreCharsMessage,
      fetchingOptions,
      fetchingMoreOptions,
      fetchOptions: doFetchOptions,
      fetchMoreOptions,
      optionsWereFetched,
      fetchedOptionsHaveMorePages,
      fetchOptionsCancel,
    } = useFetchsOptions(
      computed(() => configuration.value.options),
      computed(() => configuration.value.textAttribute),
      computed(() => configuration.value.valueAttribute),
      computed(() => configuration.value.normalizeOptions!),
      searchQuery,
      computed(() => configuration.value.fetchOptions),
      computed(() => configuration.value.delay),
      computed(() => configuration.value.minimumInputLength),
      computed(() => configuration.value.minimumInputLengthText!),
    );

    const {
      selectedOption,
      hasSelectedOption,
      selectOption,
      toggleOption,
      optionIsSelected,
    } = useSelectableOption<TRichSelectOptions>(flattenedOptions, localValue, configuration);

    const {
      activeOption,
      optionIsActive,
      setActiveOption,
      initActiveOption,
      setNextOptionActive,
      setPrevOptionActive,
    } = useActivableOption(flattenedOptions, localValue);

    const shown = ref<boolean>(false);

    const showSearchInput = computed<boolean>(() => {
      if (configuration.value.hideSearchBox) {
        return false;
      }

      if (configuration.value.minimumResultsForSearch !== undefined) {
        return normalizedOptions.value.length >= configuration.value.minimumResultsForSearch;
      }

      return true;
    });

    /**
     * Dropdown component reference
     */
    const dropdown = ref<{
      focus:() => void
    }>();

    const focusDropdownTrigger = (): void => {
      dropdown.value!.focus();
    };

    /**
     * Manage dropdown related methods
     */
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

    /**
     * Active option handling
     */
    const toggleOptionFromActiveOption = (): void => {
      if (activeOption.value === null) {
        return;
      }

      toggleOption((activeOption.value as NormalizedOption));
    };

    // Select the current active option
    const selectOptionFromActiveOption = () :void => {
      if (activeOption.value === null) {
        return;
      }

      selectOption(activeOption.value as NormalizedOption);
    };

    /**
     * Event handlers
     */
    const keydownDownHandler = (e: KeyboardEvent): void => {
      emit('keydown', e);

      e.preventDefault();

      if (shown.value === false) {
        throttledShowDropdown();
      } else {
        setNextOptionActive();

        const lastOption: NormalizedOption = normalizedOptions.value[normalizedOptions.value.length - 1];

        if (optionIsActive(lastOption)
          && fetchedOptionsHaveMorePages.value
          && !fetchingMoreOptions.value) {
          fetchMoreOptions();
        }
      }
    };

    const keydownUpHandler = (e: KeyboardEvent): void => {
      emit('keydown', e);

      e.preventDefault();

      if (shown.value === false) {
        throttledShowDropdown();
      } else {
        setPrevOptionActive();
      }
    };

    const keydownEnterHandler = (e: KeyboardEvent): void => {
      emit('keydown', e);

      if (shown.value === true) {
        toggleOptionFromActiveOption();
      }
    };

    const keydownSpaceHandler = (e: KeyboardEvent): void => {
      emit('keydown', e);

      e.preventDefault();

      if (configuration.value.toggleOnClick && shown.value === false) {
        throttledShowDropdown();
      } else if (shown.value === true) {
        toggleOptionFromActiveOption();
      }
    };

    const keydownEscHandler = (e: KeyboardEvent): void => {
      emit('keydown', e);

      if (shown.value === false) {
        return;
      }

      hideDropdown();

      focusDropdownTrigger();
    };

    const dropdownBottomReachedHandler = (): void => {
      if (fetchedOptionsHaveMorePages.value && !fetchingMoreOptions.value) {
        fetchMoreOptions();
      }
    };

    /**
     * Provided data
     */
    provide('configuration', configuration);

    provide('options', normalizedOptions);

    provide('selectedOption', selectedOption);

    provide('hasSelectedOption', hasSelectedOption);

    provide('toggleOption', toggleOption);

    provide('setActiveOption', setActiveOption);

    provide('optionIsSelected', optionIsSelected);

    provide('optionIsActive', optionIsActive);

    provide('keydownDownHandler', keydownDownHandler);

    provide('keydownUpHandler', keydownUpHandler);

    provide('keydownEscHandler', keydownEscHandler);

    provide('keydownEnterHandler', keydownEnterHandler);

    provide('shown', shown);

    provide('showSearchInput', showSearchInput);

    provide('searchQuery', searchQuery);

    provide('needsMoreCharsToFetch', needsMoreCharsToFetch);

    provide('needsMoreCharsMessage', needsMoreCharsMessage);

    provide('fetchingOptions', fetchingOptions);

    provide('fetchingMoreOptions', fetchingMoreOptions);

    provide('dropdownBottomReachedHandler', dropdownBottomReachedHandler);

    return {
      configuration,
      attributes,
      localValue,
      activeOption,
      hasSelectedOption,
      shown,
      dropdown,
      hideDropdown,
      toggleDropdown,
      throttledShowDropdown,
      keydownDownHandler,
      keydownUpHandler,
      keydownSpaceHandler,
      keydownEnterHandler,
      keydownEscHandler,
      focusDropdownTrigger,
      optionIsSelected,
      initActiveOption,
      selectOption,
      selectOptionFromActiveOption,
      clearValue,
      doFetchOptions,
      fetchsOptions,
      fetchOptionsCancel,
      optionsWereFetched,
      needsMoreCharsToFetch,
      showSearchInput,
      flattenedOptions,
    };
  },
  computed: {
    canFetchOptions(): boolean {
      return this.fetchsOptions
        && !this.optionsWereFetched
        && !this.needsMoreCharsToFetch;
    },
    /**
     * @TODO
     */
    dropdownClasses(): CSSRawClassesList {
      const {
        enterActiveClass,
        enterFromClass,
        enterToClass,
        leaveActiveClass,
        leaveFromClass,
        leaveToClass,
        // selectButton: trigger,
        // dropdown,
      // } = this.configuration.classesList || {};
      } = this.configuration.classesList!;

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
    showClearButton(): boolean {
      return this.hasSelectedOption
        && this.configuration.clearable === true;
    },
  },
  watch: {
    localValue(): void {
      this.onOptionSelected();
    },
  },
  created() {
    if (this.configuration.prefetchOptions && this.canFetchOptions) {
      this.doFetchOptions();
    }
  },
  beforeUnmount() {
    this.fetchOptionsCancel();
  },
  methods: {
    onOptionSelected(): void {
      if (this.shown === false) {
        return;
      }

      if (
        this.configuration.closeOnSelect === true
        // If `closeOnSelect`  is not set hide the dropdown only when is not
        // multiple
        || (this.configuration.closeOnSelect === undefined && !this.configuration.multiple)) {
        this.hideDropdown();

        this.focusDropdownTrigger();
      }
    },
    beforeHideHandler(): void {
      this.$emit('before-hide');

      if (this.configuration.selectOnClose && !isEqual(this.localValue, this.activeOption?.value)) {
        this.selectOptionFromActiveOption();
      }
    },
    beforeShowHandler(): void {
      this.$emit('before-show');

      this.initActiveOption();

      if (this.canFetchOptions) {
        this.doFetchOptions();
      }
    },
    mousedownHandler(e: MouseEvent): void {
      this.$emit('mousedown', e);

      if (this.configuration.toggleOnClick) {
        // If it has as search box I need to prevent default to ensure the search
        // box keep focused
        if (this.showSearchInput && this.shown === false) {
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
