import { dateIsValid, DateParser, diffInDays, isSameDay } from '@variantjs/core';
import { computed, ComputedRef, Ref, ref } from 'vue';
import { TDatepickerOptions, TDatepickerValue } from '../../types/components/t-datepicker';

export default function useSelectedDate<P extends {
  modelValue?: TDatepickerValue, 
}, C extends Pick<TDatepickerOptions, 'multiple' | 'range' | 'dateFormat'>>(
  props: P,
  configuration: C,
  parseDate: ComputedRef<DateParser>,
): {
    selectedDate: Ref<Date | Date[] | undefined>
    setSelectedDate: ((date: Date | Date[] | undefined) => void),
    getInitialSelectedDate: (fromDate: TDatepickerValue) => Date | Date[] | undefined,
    getSelectDayFromSelection: (day: Date) => Date | Date[],
    resetRangeSelection: () => void,
  } {
  const isMultiple = computed<boolean>(() => !! (configuration.multiple || configuration.range));
  const resetRange = ref<boolean>(false);

  const getInitialSelectedDate = (fromDate: TDatepickerValue): Date | Date[] | undefined => {
    let selectedDate: Date | undefined | Date[] = isMultiple.value ? [] : undefined;

    if (Array.isArray(fromDate)) {
      selectedDate = (fromDate)
        .map((value) => parseDate.value(value, configuration.dateFormat))
        .filter((value) => value !== undefined) as Date[];

    } else {
      selectedDate = parseDate.value(fromDate, configuration.dateFormat) || selectedDate;
    }

    return selectedDate;
  };

  const selectedDate = ref<Date | Date[] | undefined>(getInitialSelectedDate(props.modelValue));

  const getSelectDayFromSelection = (day: Date): Date | Date[] => {
    // If we are using multiple or range means that the day consists of an array
    // of dates
    if (isMultiple.value) {
      // If not array or is empty initialize it with with the selected date
      if (!Array.isArray(selectedDate.value) || selectedDate.value.length === 0) {
        return [day];
      }

      // The ranges consists in a tuple of dates, we should fill the first 
      // or the second element depending of the current state of the selection
      if (configuration.range) {
        // If the new day is before than the first element of the range we need
        // to reinitialize the range
        if (resetRange.value || diffInDays(selectedDate.value[0], day) < 0) {
          if (resetRange.value) {
            resetRange.value = false;
          }

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

  const resetRangeSelection = () => {
    resetRange.value = true;
  };

  return {
    selectedDate,
    setSelectedDate,
    getInitialSelectedDate,
    getSelectDayFromSelection,
    resetRangeSelection,
  };
}
