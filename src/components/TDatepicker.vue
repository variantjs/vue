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
      tag-name="input"
      type="text"
      class="border border-gray-300"
      @blur-on-child="blurOnChildHandler"

      @keydown.down="keyboardNavigationHandler"
      @keydown.up="keyboardNavigationHandler"
      @keydown.left="keyboardNavigationHandler"
      @keydown.right="keyboardNavigationHandler"
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
  computed,
} from 'vue';

import {
  TDropdownPopperDefaultOptions as defaultPopperOptions,
  TDatepickerClassesValidKeys,
  TDatepickerConfig,
  TDatepickerClassesKeys,
  DateConditions,
  DateFormatter,
  DateParser,
  buildDateParser,
  DateLocale,
  buildDateFormatter,
  dateEnglishLocale,
  isSameDay,
  diffInDays,
  addYears,
  addMonths,
  addDays,
} from '@variantjs/core';
import { Options, Placement } from '@popperjs/core';
import useConfigurationWithClassesList from '../use/useConfigurationWithClassesList';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import {
  TDatepickerOptions, TDatepickerValue,
} from '../types';
import DatepickerDropdown from './TDatepicker/DatepickerDropdown.vue';
import TDropdown, { validDropdownPlacements } from './TDropdown.vue';
import { TDatepickerSingleValue, TDatepickerView } from '../types/components/t-datepicker';

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
    initialDate: {
      type: [Date, String, Number, Array] as PropType<TDatepickerValue>,
      default: undefined,
    },
    initialTime: {
      type: [Date, String, Number, Array] as PropType<TDatepickerSingleValue>,
      default: undefined,
    },
    dateFormat: {
      type: String,
      default: 'Y-m-d',
    },
    userFormat: {
      type: String,
      default: 'F j, Y',
    },
    weekStart: {
      type: Number,
      default: 0,
    },
    amPm: {
      type: Boolean,
      default: false,
    },
    monthsPerView: {
      type: Number,
      default: 1,
    },
    multiple: {
      type: Boolean,
      default: false,
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
    dateFormatter: {
      type: Function as PropType<DateFormatter>,
      default: undefined,
    },
    dateParser: {
      type: Function as PropType<DateParser>,
      default: undefined,
    },
    locale: {
      type: Object as PropType<DateLocale>,
      default: undefined,
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
        ],
      } as Options),
    },
    initialView: {
      type: String as PropType<TDatepickerView>,
      default: TDatepickerView.Day,
    },
  },
  setup(props) {
    // @TODOS:
    // - Reinitialize the range after the dropdown is closed
    // - Range and multiple: Consider selected dates outside of the view
    // - Disabled dates shouldn't be selectable and needs his own styling (`DatepickerViewMonthDay`)
    // - Add teleport options
    // - Add toggle-on options from the configuration as the dropdown
    // - In general check which dropdown options/events are usable
    // - Add selectOnClose, closeOnSelected and see if something from the rich select can be used
    // - Show active date should be reset in some cases TBD

    const { configuration, attributes } = useConfigurationWithClassesList<TDatepickerOptions>(TDatepickerConfig, TDatepickerClassesKeys);

    const parseDate = computed<DateParser>(() => buildDateParser(configuration.locale || dateEnglishLocale, configuration.dateParser));

    const formatDate = computed<DateFormatter>(() => buildDateFormatter(configuration.locale || dateEnglishLocale, configuration.dateFormatter));

    const currentView = ref<TDatepickerView>(configuration.initialView!);

    const getInitialSelectedDate = (): Date | Date[] | undefined => {
      let selectedDate: Date | undefined | Date[] = configuration.multiple || configuration.range ? [] : undefined;

      if (Array.isArray(props.modelValue)) {
        selectedDate = (props.modelValue)
          .map((value) => parseDate.value(value, configuration.dateFormat))
          .filter((value) => value !== undefined) as Date[];
      } else {
        selectedDate = parseDate.value(props.modelValue, configuration.dateFormat) || selectedDate;
      }

      return selectedDate;
    };

    const getInitialActiveDate = (selectedDate: Date | Date[] | undefined): Date => {
      let activeDate: Date = new Date();

      if (Array.isArray(selectedDate)) {
        if (selectedDate.length > 0) {
          activeDate = selectedDate[selectedDate.length - 1];
        }
      } else if (selectedDate instanceof Date) {
        activeDate = selectedDate;
      } else {
        activeDate = parseDate.value(selectedDate, configuration.dateFormat) || new Date();
      }

      if (configuration.initialTime) {
        const parsedDateWithTime = parseDate.value(configuration.initialTime, configuration.amPm ? 'G:i:S K' : 'H:i:S');

        if (parsedDateWithTime) {
          activeDate.setHours(parsedDateWithTime.getHours());
          activeDate.setMinutes(parsedDateWithTime.getMinutes());
          activeDate.setSeconds(parsedDateWithTime.getSeconds());
        }
      }

      return activeDate;
    };

    const selectedDate = ref<Date | Date[] | undefined>(getInitialSelectedDate());

    const activeDate = ref<Date>(getInitialActiveDate(selectedDate.value));

    // The active date is usually hidden but shown when navigating with the keyboard
    const showActiveDate = ref<boolean>(false);

    const selectDay = (day: Date) => {
      // If we are using multiple or range means that the day consists of an array
      // of dates
      if (configuration.multiple || configuration.range) {
        // If not array or is empty initialize it with with the selected date
        if (!Array.isArray(selectedDate.value) || selectedDate.value.length === 0) {
          selectedDate.value = [day];
          return;
        }

        // The ranges consists in a tuple of dates, we should fill the first 
        // or the second element depending of the current state of the selection
        if (configuration.range) {
          // If the new day is before than the first element of the range we need
          // to reinitialize the range
          if (diffInDays(selectedDate.value[0], day) < 0) {
            selectedDate.value = [day];
            return;
          }

          // If the range is already full we are going to replace the second date
          if (selectedDate.value.length === 2) {
            selectedDate.value[1] = day;
            return;
          }
            
          // Otherwise just add the new day to the range
          selectedDate.value.push(day);
          return;
        }

        if (configuration.multiple) {
          if (selectedDate.value.includes(day)) {
            selectedDate.value = selectedDate.value.filter((date) => ! isSameDay(date, day));
            return;
          }

          selectedDate.value.push(day);
          return;
        }
      }

      selectedDate.value = day;
    };

    // If the date field is blurred (date clicked for example) we should focus
    // the field again
    // @TODO: Consider the case when other elements should keep the focus
    // like the eventual time picker
    const blurOnChildHandler = (e: Event) => {
      const target = e.target as HTMLButtonElement | HTMLInputElement;

      target.focus();
    };

    const keyboardNavigationHandler = (e: KeyboardEvent) => {
      const keyCode = e.key;

      enum NavitationKeyCodes {
        ArrowLeft = 'ArrowDown',
        ArrowUp = 'ArrowUp',
        ArrowRight = 'ArrowLeft',
        ArrowDown = 'ArrowRight',
      }
      
      const days: {
        [key2 in TDatepickerView]: {
          [key in NavitationKeyCodes]: number  
        }
      } = {
        // @TODO
        year: {
          ArrowUp: 1,
          ArrowRight: 1,
          ArrowDown: 1,
          ArrowLeft: 1,
        },
        // @TODO
        month: {
          ArrowUp: 1,
          ArrowRight: 1,
          ArrowDown: 1,
          ArrowLeft: 1,
        },
        day: {
          ArrowUp: -7,
          ArrowRight: 1,
          ArrowDown: 7,
          ArrowLeft: -1,
        },
      };

      if (! (keyCode in NavitationKeyCodes)) {
        return;
      }

      e.preventDefault();

      const daysPerView = days[currentView.value][keyCode as NavitationKeyCodes];

      // Depending of the view (year view, month view or day views the amount of days is different)
      if (currentView.value === 'year') {
        // @TODO: test considering the case when the year is not a leap year
        activeDate.value = addYears(activeDate.value, daysPerView);
      } else if (currentView.value === 'month') {
        // @TODO: test considering the case when the month is not a leap month
        activeDate.value = addMonths(activeDate.value, daysPerView);
      } else if (currentView.value === 'day') {
        // One week is the day below the current one
        activeDate.value = addDays(activeDate.value, daysPerView);
      }

      showActiveDate.value = true;
    };



    provide('activeDate', activeDate);

    provide('showActiveDate', showActiveDate);

    provide('selectedDate', selectedDate);

    provide('configuration', configuration);

    provide('parseDate', parseDate);

    provide('formatDate', formatDate);
    
    provide('selectDay', selectDay);

    return {
      configuration,
      attributes,
      blurOnChildHandler,
      keyboardNavigationHandler,
    };
  },

});

</script>
