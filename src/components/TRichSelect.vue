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
      @click="shown = !shown"
    >
      <template #trigger>
        <rich-select-trigger ref="trigger" />
      </template>

      <rich-select-dropdown ref="dropdown" />
    </t-dropdown>
  </div>
</template>

<script lang="ts">
import {
  InputOptions, TRichSelectConfig, TRichSelectClassesKeys, TRichSelectClassesValidKeys, CSSRawClassesList,
  TDropdownPopperDefaultOptions as defaultPopperOptions,
  NormalizedOption,
} from '@variantjs/core';
import {
  computed, defineComponent, PropType, provide, ref,
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

    // valueAttribute?: boolean,
    // textAttribute?: boolean,
    // delay?: number,
    // fetchOptions?: (query: string, nextPage?: number) => AjaxResults,
    // minimumInputLength?: number,
    // minimumInputLengthText?: ((minimumInputLength: number, query?: string) => string) | string,
    // minimumResultsForSearch?: number,
    // hideSearchBox?: boolean,
    // openOnFocus?: boolean,
    // closeOnSelect?: boolean,
    // selectOnClose?: boolean,
    // clearable?: boolean,
    // placeholder?: string,
    // searchBoxPlaceholder?: string,
    // noResultsText?: string,
    // searchingText?: string,
    // loadingMoreResultsText?: string,
    // maxHeight?: number,
  },
  setup(props) {
    const localValue = useMulipleableVModel(props, 'modelValue');

    const normalizedOptions = useMultioptions(props, 'options');

    const flattenedOptions = computed((): NormalizedOption[] => normalizedOptions.value.map((option: NormalizedOption) => {
      if (option.children) {
        return option.children;
      }

      return option;
    }).flat());

    // @TODo use isEqual ocmparison
    const selectedOption = computed((): NormalizedOption | undefined => flattenedOptions.value.find((option) => option.value === localValue.value));

    const activeOption = ref<NormalizedOption | null>(null);

    const configuration = useConfigurationWithClassesList<TRichSelectOptions>(TRichSelectConfig, TRichSelectClassesKeys);

    const attributes = useAttributes<TRichSelectOptions>(configuration);

    // @TODO move logic for checking the option in the value to the core library
    const optionIsActive = (option: NormalizedOption): boolean => activeOption.value?.value === option.value;

    // @TODO move logic for checking the option in the value to the core library
    const optionIsSelected = (option: NormalizedOption): boolean => {
      if (configuration.value.multiple && Array.isArray(localValue.value)) {
        // @TODO use an isEqual comparison
        return localValue.value.some((value) => value === option.value);
      }

      // @TODO use an isEqual comparison
      return localValue.value === option.value;
    };

    // @TODO move logic for toggling the value to the core library
    const toggleOption = (option: NormalizedOption): void => {
      const isSelected: boolean = optionIsSelected(option);

      if (configuration.value.multiple) {
        if (!Array.isArray(localValue.value)) {
          localValue.value = [option.value];
        } else if (isSelected) {
          // @TODO use an isEqual comparison
          localValue.value = localValue.value.filter((value) => value !== option.value);
        } else {
          localValue.value = [...localValue.value, option.value];
        }
      } else if (isSelected) {
        localValue.value = null;
      } else {
        localValue.value = option.value;
      }
    };

    // @TODO move logic to core library?
    const setActiveOption = (option: NormalizedOption): void => {
      activeOption.value = option;
    };

    provide('placeholder', computed(() => configuration.value.placeholder));

    provide('classesList', computed(() => configuration.value.classesList));

    provide('options', computed(() => normalizedOptions.value));

    provide('selectedOption', selectedOption);

    provide('toggleOption', toggleOption);

    provide('setActiveOption', setActiveOption);

    provide('optionIsSelected', optionIsSelected);

    provide('optionIsActive', optionIsActive);

    return {
      configuration, attributes, localValue, normalizedOptions, activeOption,
    };
  },
  data() {
    return {
      shown: false,
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

});

</script>
