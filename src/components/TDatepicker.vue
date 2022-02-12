<template>
  <t-dropdown
    ref="dropdownComponent"
    v-model:show="shown"
    :classes="undefined"
    :fixed-classes="undefined"
    :popper-options="configuration.dropdownPopperOptions"
    :placement="configuration.dropdownPlacement"
    tag-name="div"
    :toggle-on-click="false"
    :toggle-on-hover="configuration.toggleOnHover"
    :toggle-on-focus="configuration.toggleOnFocus"
    :hide-on-leave-timeout="configuration.hideOnLeaveTimeout"
    v-bind="attributes"
    @blur-on-child="blurOnChildHandler"
    @before-show="beforeShowHandler"
  >
    <template #trigger="{ focusHandler, blurHandler }">
      <slot
        :configuration="configuration"
        name="trigger"
        :focus-handler="focusHandler"
        :blur-handler="blurHandler"
        :click-handler="clickHandler"
        :selected-date="selectedDate"
        :formatted-date="formattedDate"
        :user-formatted-date="userFormattedDate"
        :hide="doHide"
        :show="doShow"
      >
        <input
          class="block w-full px-3 py-2 text-black placeholder-gray-400 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed text-left"
          :type="configuration.userInputType"
          :name="configuration.userInputName"
          :value="userFormattedDate"
          :disabled="configuration.disabled"
          v-bind="configuration.userInputAttributes"
          @input="userInputHandler"
          @focus="focusHandler"
          @blur="blurHandler"
          @mousedown.stop="clickHandler"
          @keydown.enter.stop="clickHandler"
          @keydown.space.stop="(e) => configuration.userInputType === 'button' ? clickHandler(e) : undefined"
          @keydown.down="keyboardNavigationHandler"
          @keydown.up="keyboardNavigationHandler"
          @keydown.left="keyboardNavigationHandler"
          @keydown.right="keyboardNavigationHandler"
        >
      </slot>

      <component-form-input
        v-if="configuration.addFormInput"
        :value="formattedDate"
        :input-attributes="configuration.formInputAttributes"
        :input-name="configuration.name"
        :disabled="configuration.disabled"
      />
    </template>

    <datepicker-dropdown />
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
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref,
  provide,
  computed,
  watch,
  InputHTMLAttributes,
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
  dateIsValid,
  Data,
} from '@variantjs/core';
import { Options, Placement } from '@popperjs/core';
import useConfigurationWithClassesList from '../use/useConfigurationWithClassesList';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { TDatepickerOptions, TDatepickerValue } from '../types';
import DatepickerDropdown from './TDatepicker/DatepickerDropdown.vue';
import ComponentFormInput from './misc/ComponentFormInput.vue';
import TDropdown, { validDropdownPlacements } from './TDropdown.vue';
import { TDatepickerSingleValue, TDatepickerView } from '../types/components/t-datepicker';

// @vue/component
export default defineComponent({
  name: 'TDatepicker',
  components: {
    DatepickerDropdown,
    TDropdown,
    ComponentFormInput,
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
    userInputName: {
      type: String,
      default: undefined,
    },
    userInputType: {
      type: String,
      default: 'text',
    },
    userInputAttributes: {
      type: Object as PropType<InputHTMLAttributes & Data>,
      default: () => {},
    },
    name: {
      type: String,
      default: undefined,
    },
    formInputAttributes: {
      type: Object as PropType<InputHTMLAttributes & Data>,
      default: () => {},
    },
    addFormInput: {
      type: Boolean,
      default: true,
    },  
    monthsPerView: {
      type: Number,
      default: 1,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
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
    toggleOnFocus: {
      type: Boolean,
      default: true,
    },
    toggleOnClick: {
      type: Boolean,
      default: true,
    },
    toggleOnHover: {
      type: Boolean,
      default: false,
    },
    hideOnLeaveTimeout: {
      type: Number,
      default: 250,
    },
    closeOnSelect: {
      type: Number,
      default: 250,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    change: (e: CustomEvent) => e instanceof CustomEvent,
    input: (e: CustomEvent) => e instanceof CustomEvent,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: string | string[]) => true,
    'update:show': (value: boolean) => typeof value === 'boolean',
  },
  setup(props, { emit }) {
    // @TODOS:
    // - Reinitialize the range after the dropdown is closed
    // - Range and multiple: Consider selected dates outside of the view
    // - Disabled dates shouldn't be selectable and needs his own styling (`DatepickerViewMonthDay`)
    // - Disable "visible" dates in the invalid range < year 0 > year 9999
    // - Add teleport options
    // - In general check which dropdown options/events are usable
    // - Add selectOnClose, closeOnSelected and see if something from the rich select can be used
    // - Show active date should be reset in some cases TBD
    // - Check aria labels on buttons 
    // - Replace svg icons with icon component
    
    const { configuration, attributes } = useConfigurationWithClassesList<TDatepickerOptions>(TDatepickerConfig, TDatepickerClassesKeys);

    const shown = ref<boolean>(configuration.show!);

    const parseDate = computed<DateParser>(() => buildDateParser(configuration.locale || dateEnglishLocale, configuration.dateParser));

    const formatDate = computed<DateFormatter>(() => buildDateFormatter(configuration.locale || dateEnglishLocale, configuration.dateFormatter));
    
    const dateRangeSeparator = computed<string>(() => {
      return (configuration.locale || dateEnglishLocale).rangeSeparator || dateEnglishLocale.rangeSeparator;
    });

    // The active date is usually hidden but shown when navigating with the keyboard
    const showActiveDate = ref<boolean>(false);

    const getInitialSelectedDate = (fromDate: TDatepickerValue): Date | Date[] | undefined => {
      let selectedDate: Date | undefined | Date[] = configuration.multiple || configuration.range ? [] : undefined;

      if (Array.isArray(fromDate)) {
        selectedDate = (fromDate)
          .map((value) => parseDate.value(value, configuration.dateFormat))
          .filter((value) => value !== undefined) as Date[];
      } else {
        selectedDate = parseDate.value(fromDate, configuration.dateFormat) || selectedDate;
      }

      return selectedDate;
    };

    const getInitialView = (): TDatepickerView => configuration.initialView!;

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

    const selectedDate = ref<Date | Date[] | undefined>(getInitialSelectedDate(props.modelValue));

    const activeDate = ref<Date>(getInitialActiveDate(selectedDate.value));

    const currentView = ref<TDatepickerView>(getInitialView());

    const setCurrentView = (view: TDatepickerView) => {
      currentView.value = view;
    };

    const setActiveDate = (date: Date) => {
      if (!dateIsValid(date)) {
        return;
      }

      activeDate.value = date;
    };

    const setSelectedDate = (date: Date | Date[] | undefined) => {
      if (Array.isArray(date)) {
        if (date.some((value) => !dateIsValid(value))) {
          return;
        }
      } else if (!dateIsValid(date)) {
        return;
      }

      selectedDate.value = date;
    };

    const initViewData = () => {
      setCurrentView(getInitialView());
      setActiveDate(getInitialActiveDate(selectedDate.value));
      showActiveDate.value = false;
    };

    watch(() => props.modelValue, (value: TDatepickerValue) => {
      setSelectedDate(getInitialSelectedDate(value));
    });
    
    const formattedDate = computed<string | string[]>(() => {
      return Array.isArray(selectedDate.value) 
        ? selectedDate.value.map((dateItem) => formatDate.value(dateItem, configuration.dateFormat))
        : formatDate.value(selectedDate.value, configuration.dateFormat);
    });

    const userFormattedDate = computed<string>(() => {
      return Array.isArray(selectedDate.value) 
        ? selectedDate.value
          .map((dateItem) => formatDate.value(dateItem, configuration.userFormat))
          // @TODO: Date separator comes from the configuration
          .join(configuration.range ? dateRangeSeparator.value : ', ')
        : formatDate.value(selectedDate.value, configuration.userFormat);
    });

    const getNewSelectedDate = (day: Date): Date | Date[] => {
      // If we are using multiple or range means that the day consists of an array
      // of dates
      if (configuration.multiple || configuration.range) {
        // If not array or is empty initialize it with with the selected date
        if (!Array.isArray(selectedDate.value) || selectedDate.value.length === 0) {
          return [day];
        }

        // The ranges consists in a tuple of dates, we should fill the first 
        // or the second element depending of the current state of the selection
        if (configuration.range) {
          // If the new day is before than the first element of the range we need
          // to reinitialize the range
          if (diffInDays(selectedDate.value[0], day) < 0) {
            return [day];
          }

          // If the range is already full we are going to replace the second date
          if (selectedDate.value.length === 2) {
            return [selectedDate.value[0], day];
          }
            
          // Otherwise just add the new day to the range
          return [...selectedDate.value, day];
        }

        if (configuration.multiple) {
          // If already selected, remove it
          if (selectedDate.value.some(date => isSameDay(date, day))) {
            return selectedDate.value.filter((date) => ! isSameDay(date, day));
          }

          return [...selectedDate.value, day];
        }
      }

      return day;
    };


    const doHide = async () => {
      shown.value = false;
    };

    const doShow = async () => {
      shown.value = true;
    };

    watch(shown, () => {
      emit('update:show', shown.value);
    });

    watch(() => configuration.show, () => {
      shown.value = configuration.show!;
    });

    const selectDay = (day: Date) => {
      const newSelectedDate = getNewSelectedDate(day);

      showActiveDate.value = false;
     
      setActiveDate(day);

      setSelectedDate(newSelectedDate);
      
      if (configuration.range && !(Array.isArray(newSelectedDate) && newSelectedDate.length === 2)) {
        return;
      }

      const event = new CustomEvent('input', {
        detail: {
          value: formattedDate.value,
          formattedDate: userFormattedDate.value,
          date: newSelectedDate,
        },
      });
      
      emit('change', event);
      emit('input', event);
      emit('update:modelValue', formattedDate.value);      

      if (configuration.closeOnSelect && shown.value === true) {
        doHide();
      }
    };

    // Note about `selectMonth` and `selectYear` methods:
    // In most cases selecting a month or year only changes the active date which
    // means it doesnt trigger an input event (since day still needs to be selected).
    // In the future we may consider allowing the user to select only month and/or
    // year which means we should also handle the input event
    const selectMonth = (month: Date) => {
      setActiveDate(month);

      setCurrentView(TDatepickerView.Day);
    };

    const selectYear = (year: Date) => {
      setActiveDate(year);

      setCurrentView(TDatepickerView.Month);
    };

    const selectActiveDate = () => {
      selectDay(activeDate.value);
    };

    const clickHandler = (e: KeyboardEvent | MouseEvent) => {
      const input = e.target as (HTMLInputElement | HTMLButtonElement | undefined);

      if (shown.value === true) {
        selectActiveDate();
      } else if (configuration.toggleOnClick) {
        const parsedDate = input && input.value ? parseDate.value(input.value, configuration.userFormat) : undefined;

        if (parsedDate !== undefined) {
          setActiveDate(parsedDate);

          selectActiveDate();
        }

        if (configuration.toggleOnClick) {
          doShow();
        }
      }
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
      if (shown.value === false) {
        doShow(); 
      }

      const keyCode = e.key as NavitationKeyCodes;

      enum NavitationKeyCodes {
        ArrowLeft = 'ArrowDown',
        ArrowUp = 'ArrowUp',
        ArrowRight = 'ArrowLeft',
        ArrowDown = 'ArrowRight',
      }
      
      const days: {
        [key in TDatepickerView]: {
          [key2 in NavitationKeyCodes]: number  
        }
      } = {
        year: {
          ArrowUp: -4,
          ArrowRight: 1,
          ArrowDown: 4,
          ArrowLeft: -1,
        },
        month: {
          ArrowUp: -4,
          ArrowRight: 1,
          ArrowDown: 4,
          ArrowLeft: -1,
        },
        day: {
          ArrowUp: -7,
          ArrowRight: 1,
          ArrowDown: 7,
          ArrowLeft: -1,
        },
      };
      
      e.preventDefault();

      const daysPerView = days[currentView.value][keyCode];

      // Depending of the view (year view, month view or day views the amount of days is different)
      if (currentView.value === TDatepickerView.Year) {
        setActiveDate(addYears(activeDate.value, daysPerView));
      } else if (currentView.value === TDatepickerView.Month) {
        setActiveDate(addMonths(activeDate.value, daysPerView));
      } else if (currentView.value === TDatepickerView.Day) {
        setActiveDate(addDays(activeDate.value, daysPerView));
      }

      showActiveDate.value = true;
    };

    const beforeShowHandler = () => {
      initViewData();
    };

    const userInputHandler = (e: Event) => {
      const input = e.target as HTMLInputElement;
      
      const parsedDate = parseDate.value(input.value, configuration.userFormat);
      
      if (parsedDate !== undefined) {
        showActiveDate.value = true;
        setActiveDate(parsedDate);
      }
    };

    provide('activeDate', activeDate);

    provide('showActiveDate', showActiveDate);

    provide('selectedDate', selectedDate);
    
    provide('setSelectedDate', setSelectedDate);
    
    provide('setActiveDate', setActiveDate);
    
    provide('configuration', configuration);

    provide('parseDate', parseDate);

    provide('formatDate', formatDate);
    
    provide('selectDay', selectDay);
    
    provide('selectMonth', selectMonth);
    
    provide('selectYear', selectYear);
    
    provide('setCurrentView', setCurrentView);
    
    provide('currentView', currentView);
    
    provide('userFormattedDate', userFormattedDate);

    return {
      configuration,
      attributes,
      blurOnChildHandler,
      clickHandler,
      keyboardNavigationHandler,
      beforeShowHandler,
      userInputHandler,
      doHide,
      doShow,
      shown,
      formattedDate,
      userFormattedDate,
      selectedDate,
    };
  },

});

</script>
