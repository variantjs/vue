<template>
  <t-dropdown
    ref="dropdownComponent"
    v-model:show="shown"
    :classes="{
      // @TODO: add this to the tempalte
      trigger: undefined,
      dropdown: 'z-10'
    }"
    :fixed-classes="undefined"
    :popper-options="configuration.dropdownPopperOptions"
    :placement="configuration.dropdownPlacement"
    tag-name="div"
    :toggle-on-click="false"
    :toggle-on-hover="configuration.toggleOnHover"
    :toggle-on-focus="configuration.toggleOnFocus"
    :hide-on-leave-timeout="configuration.hideOnLeaveTimeout"
    v-bind="attributes"
    :teleport="configuration.teleport"    
    :teleport-to="configuration.teleportTo"
    @blur-on-child="blurOnChildHandler"
    @hidden="hiddenHandler"
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
          :required="configuration.required"
          :readonly="configuration.readonly"
          :placeholder="configuration.placeholder"
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
  provide,
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
  DateLocale,
  addYears,
  addMonths,
  addDays,
  Data,
  WeekDay,
} from '@variantjs/core';
import { Options, Placement } from '@popperjs/core';
import useConfigurationWithClassesList from '../use/useConfigurationWithClassesList';
import { useSelectedDate, useActiveDate, useCalendarView, useDateFormatting, useDateParsing, useCalendarState } from '../use/datepicker';
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
      type: Number as PropType<WeekDay>,
      default: WeekDay.Sunday,
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
    required: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    range: {
      type: Boolean,
      default: false,
    },
    highlightDates: {
      type: [Date, Array, Function, String, Number] as PropType<DateConditions>,
      default: undefined,
    },
    disabledDates: {
      type: [Date, Array, Function, String, Number] as PropType<DateConditions>,
      default: undefined,
    },
    showDaysForOtherMonth: {
      type: Boolean,
      default: true,
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
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: false,
    },
    teleport: {
      type: Boolean,
      default: false,
    },
    teleportTo: {
      type: [String, Object] as PropType<string | HTMLElement>,
      default: 'body',
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
    // - In general check which dropdown options/events are usable
    // - Add selectOnClose, closeOnSelected and see if something from the rich select can be used
    // - Show active date should be reset in some cases TBD
    // - Check aria labels on buttons 
    // - Replace svg icons with icon component
    // - Selecting in different view with enter closes the dropdown
    // - When press enten in month or year views it immediatly closes the dropdown and closed the field 
    // - The click handler depnds of shown consider the case when using inline
    // - Consider using an undefined default value for toggling and, in cases like multiple or range keep the modal opened by default
    // - In multiple add an ok button
    // - Add a clear button
    // - If users type a date and blur it should reset the v-model date
    // - Inside the dropdown refactor to reuse the dropdown view (recently duplciated with the teleport fix)
    const { configuration, attributes } = useConfigurationWithClassesList<TDatepickerOptions>(TDatepickerConfig, TDatepickerClassesKeys);
    const { parseDate } = useDateParsing(configuration);
    
    const { selectedDate, selectedDateHolder, setSelectedDate, addSelectedDate, getInitialSelectedDate, resetRangeSelection } = useSelectedDate(props, configuration, parseDate);
    const { activeDate, activeDateIsVisible, initActiveDate, setActiveDate, hideActiveDate, showActiveDate } = useActiveDate({
      configuration, selectedDate, parseDate,
    });
    const { formatDate, formattedDate, userFormattedDate } = useDateFormatting(configuration, selectedDate);
    const { currentView, initView, setCurrentView } = useCalendarView(configuration);
    const { shown, doShow, doHide, isMultiple, isDropdownClosed, isDropdownOpened } = useCalendarState(configuration);

    const initAllViewData = () => {
      initView();
      initActiveDate();
      hideActiveDate();
    };

    watch(() => props.modelValue, (value: TDatepickerValue) => {
      setSelectedDate(getInitialSelectedDate(value));
    });

    watch(shown, () => {
      emit('update:show', shown.value);
    });

    watch(() => configuration.show, () => {
      shown.value = configuration.show!;
    });

    watch(selectedDate, (newSelectedDate) => {
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

      if (configuration.closeOnSelect && isDropdownOpened.value) {
        doHide();
      }
    });

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

    const selectDate = (date: Date) => {
      console.log(date);
      addSelectedDate(date);

      setActiveDate(date);
    };


    // Handlers
    const clickHandler = (e: KeyboardEvent | MouseEvent) => {
      const input = e.target as (HTMLInputElement | HTMLButtonElement | undefined);

      if (! isMultiple.value && isDropdownClosed.value) {
        // Will try to set the data by using the user manual input
        const parsedDate = input && input.value ? parseDate.value(input.value, configuration.userFormat) : undefined;

        // If the user clicks while the input is closed could mean the user
        // manually edited the date (if a date was parsed). If that is the case
        // we only want to set the date if the date is different from the current
        if (
          parsedDate !== undefined
          && (
            selectedDate.value === undefined
            || selectedDate.value instanceof Date && parsedDate.getTime() !== selectedDate.value.getTime()
          )
        ) {
          setSelectedDate(parsedDate);
        }
      }

      if (isDropdownOpened.value) {
        addSelectedDate(activeDate.value);
      } else if (configuration.toggleOnClick) {
        doShow();
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
      if (isDropdownClosed.value) {
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

      showActiveDate();
    };

    const userInputHandler = (e: Event) => {
      const input = e.target as HTMLInputElement;
      
      const parsedDate = parseDate.value(input.value, configuration.userFormat);
      
      if (parsedDate !== undefined) {
        showActiveDate();
        
        setActiveDate(parsedDate);
      }
    };

    /**
     * Dropdown state handlers
     */
    const beforeShowHandler = () => {
      initAllViewData();
    };

    const hiddenHandler = () => {
      // If the range is complete we should start over again when user tries
      // to update the value
      if (configuration.range && Array.isArray(selectedDate.value) && selectedDate.value.length === 2) {
        resetRangeSelection();
      }      
    };

    provide('activeDate', activeDate);

    provide('activeDateIsVisible', activeDateIsVisible);
    
    provide('selectedDateHolder', selectedDateHolder);

    provide('selectedDate', selectedDate);
    
    provide('setActiveDate', setActiveDate);
    
    provide('configuration', configuration);

    provide('parseDate', parseDate);

    provide('formatDate', formatDate);
    
    provide('selectDate', selectDate);
    
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
      hiddenHandler,
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
