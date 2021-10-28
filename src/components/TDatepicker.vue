<template>
  <div
    :class="configuration.classesList?.wrapper"
    v-bind="attributes"
  >
    <!-- <t-select
      v-model="localValue"
      :name="configuration.name"
      style="display: none"
      :fixed-classes="undefined"
      :classes="undefined"
      :multiple="configuration.multiple"
      :options="flattenedOptions"
    /> -->

    <t-dropdown
      ref="dropdownComponent"
      :classes="undefined"
      :fixed-classes="undefined"
      :popper-options="configuration.dropdownPopperOptions"
      :placement="configuration.dropdownPlacement"
      show
      tag-name="input"
      type="text"
    >
      <datepicker-dropdown />
      <!-- :classes="dropdownClasses"
      :fixed-classes="undefined" -->

      <!-- :toggle-on-focus="false"
      :toggle-on-click="false"
      :toggle-on-hover="false" -->
      <!-- <template #trigger>
        <rich-select-trigger ref="trigger">
          <template #selectorIcon="props">
            <slot
              name="selectorIcon"
              v-bind="props"
            />
          </template>
          <template #placeholder="props">
            <slot
              name="placeholder"
              v-bind="props"
            />
          </template>
          <template #label="props">
            <slot
              name="label"
              v-bind="props"
            />
          </template>
          <template #tagCloseIcon="props">
            <slot
              name="tagCloseIcon"
              v-bind="props"
            />
          </template>
          <template #tagLabel="props">
            <slot
              name="tagLabel"
              v-bind="props"
            />
          </template>
        </rich-select-trigger>
      </template> -->

      <!-- <rich-select-dropdown
        ref="dropdown"
      >
        <template #option="props">
          <slot
            name="option"
            v-bind="props"
          />
        </template>
        <template #optionLabel="props">
          <slot
            name="optionLabel"
            v-bind="props"
          />
        </template>
        <template #optionIcon="props">
          <slot
            name="optionIcon"
            v-bind="props"
          />
        </template>
        <template #dropdownTop="props">
          <slot
            name="dropdownTop"
            v-bind="props"
          />
        </template>
        <template #dropdownButton="props">
          <slot
            name="dropdownButton"
            v-bind="props"
          />
        </template>
        <template #stateFeedback="props">
          <slot
            name="stateFeedback"
            v-bind="props"
          />
        </template>
      </rich-select-dropdown> -->
    </t-dropdown>

    <!-- <rich-select-clear-button
      v-if="showClearButton"
      ref="clearButton"
      @click="clearValue"
    >
      <template #clearButton="props">
        <slot
          name="clearButton"
          v-bind="props"
          :classes-list="configuration.classesList"
        />
      </template>
    </rich-select-clear-button> -->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  provide,
} from 'vue';

import {
  TDropdownPopperDefaultOptions as defaultPopperOptions,
  TDatepickerClassesValidKeys,
  TDatepickerConfig,
  TDatepickerClassesKeys,
  DateConditions,

} from '@variantjs/core';
import { Options, Placement } from '@popperjs/core';
import useConfigurationWithClassesList from '../use/useConfigurationWithClassesList';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import {
  TDatepickerOptions, TDatepickerValue,
} from '../types';
import DatepickerDropdown from './TDatepicker/DatepickerDropdown.vue';
import TDropdown, { validDropdownPlacements } from './TDropdown.vue';
import { sameWidthModifier } from '../utils/popper';

// @vue/component
export default defineComponent({
  name: 'TDatepicker',
  components: {
    DatepickerDropdown,
    TDropdown,
  },
  props: {
    ...getVariantPropsWithClassesList<TDatepickerOptions, TDatepickerClassesValidKeys>(),
    modelValue: {
      type: [Date, String, Number, Array] as PropType<TDatepickerValue>,
      default: undefined,
    },
    weekStart: {
      type: Number,
      default: 0,
    },
    monthsPerView: {
      type: Number,
      default: 1,
    },
    range: {
      type: Boolean,
      default: false,
    },
    highlightDates: {
      type: [Date, Array, Function, String, Number] as PropType<DateConditions>,
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
              offset: [0, 8],
            },
          },
          sameWidthModifier,
        ],
      } as Options),
    },

  },
  setup() {
    const { configuration, attributes } = useConfigurationWithClassesList<TDatepickerOptions>(TDatepickerConfig, TDatepickerClassesKeys);

    const activeDate = ref<Date>(new Date());
    // @TODO: Value comes from the model
    const selectedDate = ref<Date | Date[]>(new Date());
    // The active date is usually hidden but shown when navigating with the keyboard
    const showActiveDate = ref<boolean>(false);

    // const { localValue, clearValue } = useVModel(props, 'modelValue');

    provide('activeDate', activeDate);

    provide('showActiveDate', showActiveDate);

    provide('selectedDate', selectedDate);

    provide('configuration', configuration);

    return {
      configuration,
      attributes,
    };
  },

});

</script>
