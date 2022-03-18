import { dateIsValid, DateParser } from '@variantjs/core';
import { ComputedRef, Ref, ref } from 'vue';
import { TDatepickerSingleValue } from '../types/components/t-datepicker';

export default function useActiveDate<C extends {
  initialTime?: TDatepickerSingleValue,
  dateFormat?: string,
  amPm?: boolean,
}>(
  configuration: C,
  selectedDate: Ref<Date | Date[] | undefined>,
  parseDate: ComputedRef<DateParser>,
): {
    activeDate: Ref<Date>
    activeDateIsVisible: Ref<boolean>
    setActiveDate: (date: Date) => void,
    initActiveDate: () => void,
    hideActiveDate: () => void,
    showActiveDate: () => void,
  } {
  // The active date is usually hidden but shown when navigating with the keyboard
  const activeDateIsVisible = ref<boolean>(false);

  const getInitialActiveDate = (): Date => {
    let activeDate: Date = new Date();

    if (Array.isArray(selectedDate.value)) {
      if (selectedDate.value.length > 0) {
        activeDate = selectedDate.value[0];
      }
    } else if (selectedDate.value instanceof Date) {
      activeDate = selectedDate.value;
    } else {
      activeDate = parseDate.value(selectedDate.value, configuration.dateFormat) || new Date();
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

  const activeDate = ref<Date>(getInitialActiveDate());

  const setActiveDate = (date: Date) => {
    if (!dateIsValid(date)) {
      return;
    }

    activeDate.value = date;
  };

  const initActiveDate = () => {
    setActiveDate(getInitialActiveDate());
  };

  const hideActiveDate = () => {
    activeDateIsVisible.value = false;
  };
  
  const showActiveDate = () => {
    activeDateIsVisible.value = true;
  };

  return {
    activeDate,
    activeDateIsVisible,
    setActiveDate,
    initActiveDate,
    hideActiveDate,
    showActiveDate,
  };
}
