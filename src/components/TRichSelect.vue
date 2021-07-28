<template>
  <div
    :class="configuration.classesList?.wrapper"
    v-bind="attributes"
  >
    <t-dropdown
      :show="shown"
      :classes="dropdownClasses"
      :fixed-classes="undefined"
      :toggle-on-focus="false"
      :toggle-on-click="false"
      :toggle-on-hover="false"
      :popper-options="configuration.dropdownPopperOptions"
      :placement="configuration.dropdownPlacement"
      @mouseover="$emit('mouseover', $event)"
      @mouseleave="$emit('mouseleave', $event)"
      @touchstart="$emit('touchstart', $event)"
      @shown="$emit('shown')"
      @hidden="$emit('hidden')"
      @before-show="$emit('before-show')"
      @before-hide="$emit('before-hide')"
      @blur="blurHandler"
      @focus="focusHandler"
      @keydown.space="keydownSpaceHandler"
      @keydown.down="keydownDownHandler"
      @mousedown="mousedownHandler"
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
  CSSRawClassesList,
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
import { TRichSelectOptions, TSelectValue } from '../types';
import RichSelectTrigger from './TRichSelect/RichSelectTrigger.vue';
import RichSelectDropdown from './TRichSelect/RichSelectDropdown.vue';
import TDropdown from './TDropdown.vue';

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
      default: true,
    },
    toggleOnClick: {
      type: Boolean,
      default: true,
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
  setup(props) {
    // Data
    const shown = ref<boolean>(false);

    const activeOption = ref<NormalizedOption | null>(null);

    const localValue = useMulipleableVModel(props, 'modelValue');

    // Computed properties
    const normalizedOptions = useMultioptions(props, 'options');
    /**
     * List of all possible options
     */
    const flattenedOptions = computed((): NormalizedOption[] => normalizedOptions.value.map((option: NormalizedOption) => {
      if (option.children) {
        return option.children;
      }

      return option;
    }).flat());

    const selectedOption = computed((): NormalizedOption | undefined => flattenedOptions.value.find((option) => isEqual(option.value, localValue.value)));

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

    const showDrodown = (): void => {
      shown.value = true;
    };

    const toggleDropdown = (): void => {
      shown.value = !shown.value;
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

    const valueChanged = (): void => {
      if (shown.value === false) {
        return;
      }

      if (
        configuration.value.closeOnSelect === true
        // If `closeOnSelect`  is not set hide the dropdown only when is not
        // multiple
        || (configuration.value.closeOnSelect === undefined && !configuration.value.multiple)) {
        hideDropdown();
      }
    };

    watch(localValue, () => {
      valueChanged();
    });

    provide('placeholder', computed(() => configuration.value.placeholder));

    provide('classesList', computed(() => configuration.value.classesList));

    provide('options', computed(() => normalizedOptions.value));

    provide('selectedOption', selectedOption);

    provide('toggleOption', toggleOption);

    provide('setActiveOption', setActiveOption);

    provide('optionIsSelected', optionIsSelected);

    provide('optionIsActive', optionIsActive);

    provide('shown', shown);

    return {
      configuration, attributes, shown, hideDropdown, toggleDropdown, showDrodown,
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
        this.toggleDropdown();
      }
    },
    keydownSpaceHandler(e: KeyboardEvent): void {
      this.$emit('keydown', e);

      if (this.configuration.toggleOnClick) {
        this.toggleDropdown();
      }
    },
    keydownDownHandler(e: KeyboardEvent): void {
      this.$emit('keydown', e);

      if (this.shown === false && this.configuration.toggleOnClick) {
        this.showDrodown();
      }
    },
    focusHandler(e: FocusEvent): void {
      this.$emit('focus', e);

      if (this.configuration.toggleOnFocus) {
        this.showDrodown();
      }
    },
    blurHandler(e: FocusEvent): void {
      this.$emit('blur', e);

      this.hideDropdown();
    },
  },
});

</script>
