import { dateIsValid, DateParser, dayIsPartOfTheConditions, diffInDays, isSameDay } from '@variantjs/core';
import { ComputedRef, Ref, ref, watch } from 'vue';
import { TDatepickerOptions, TDatepickerValue } from '../../types/components/t-datepicker';
import useCalendarState from './useCalendarState';

export default function useSelectedDate<P extends {
  modelValue?: TDatepickerValue, 
}, C extends Pick<TDatepickerOptions, 'multiple' | 'range' | 'dateFormat' | 'disabledDates'>>(
  props: P,
  configuration: C,
  parseDate: ComputedRef<DateParser>,
): {
    selectedDate: Ref<Date | Date[] | undefined>
    selectedDateHolder: Ref<Date | Date[] | undefined>
    setSelectedDate: ((date: Date | Date[] | undefined) => void),
    addSelectedDate: (date: Date) => void,
    getInitialSelectedDate: (fromDate: TDatepickerValue) => Date | Date[] | undefined,
    resetRangeSelection: () => void,
  } {
  const { isMultiple, isRange } = useCalendarState(configuration);
  
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

  const resetRange = ref<boolean>(false);
  const selectedDate = ref<Date | Date[] | undefined>(getInitialSelectedDate(props.modelValue));
  
  const selectedDateHolder = ref<Date | Date[] | undefined>(selectedDate.value);

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

  const parseDateForMultipleState = (date: Date): Date[] => {
    // If not array or is empty initialize it with with the selected date
    if (!Array.isArray(selectedDateHolder.value) || selectedDateHolder.value.length === 0) {
      return [date];
    }

    // The ranges consists in a tuple of dates, we should fill the first 
    // or the second element depending of the current state of the selection
    if (isRange.value) {
      // If the new day is before than the first element of the range we need
      // to reinitialize the range
      if (resetRange.value || diffInDays(selectedDateHolder.value[0], date) < 0) {
        if (resetRange.value) {
          resetRange.value = false;
        }

        return [date];
      }

      // If the range is already full we are going to replace the second date
      if (selectedDateHolder.value.length === 2) {
        return [selectedDateHolder.value[0], date];
      }
        
      // Otherwise just add the new day to the range
      return [...selectedDateHolder.value, date];
    }

    // Case is multiple and not range
    // If already selected, remove it
    if (selectedDateHolder.value.some(dateItem => isSameDay(dateItem, date))) {
      return selectedDateHolder.value.filter((dateItem) => ! isSameDay(dateItem, date));
    }

    return [...selectedDateHolder.value, date];
  };

  const dateIsSelectable = (date: Date | Date[] | undefined): boolean => {
    if (Array.isArray(date)) {
      if (! date.every(singleDate => dateIsSelectable(singleDate))) {
        return false;
      }

      if (isRange.value) {
        return date.length === 2;
      }

      if (isMultiple.value) {
        // @TODO: consider user option like an "Ok" button to confirm the selection
        return true;
      }

      // If is an array and is not a range should not be valid
      return false;
    }

    if (!dateIsValid(date)) {
      return false;
    }

    const dateIsDisabled: boolean = dayIsPartOfTheConditions(
      date,
      configuration.disabledDates,
      parseDate.value,
      configuration.dateFormat,
    );

    return !dateIsDisabled;
  };
  
  const addSelectedDate = (date: Date) => {
    if (isMultiple.value) {
      selectedDateHolder.value = parseDateForMultipleState(date).filter(dateIsValid);
    } else if (dateIsValid(date)) {
      selectedDateHolder.value = date;
    }
  };

  watch(selectedDateHolder, (newValue: Date | Date[] | undefined) => {
    if (!dateIsSelectable(newValue)) {
      return;
    }
    
    setSelectedDate(newValue);

    selectedDateHolder.value = selectedDate.value;
  });

  const resetRangeSelection = () => {
    resetRange.value = true;
  };

  return {
    selectedDate,
    selectedDateHolder,
    setSelectedDate,
    addSelectedDate,
    getInitialSelectedDate,
    resetRangeSelection,
  };
}
