import { buildDateFormatter, DateFormatter, dateEnglishLocale, DateLocale } from '@variantjs/core';
import { computed, ComputedRef, Ref } from 'vue';
import { TDatepickerOptions } from '../../types/components/t-datepicker';

export default function useDateFormatting<C extends Pick<TDatepickerOptions, 'locale' | 'dateFormatter' | 'dateFormat' | 'userFormat' | 'range' | 'dateParser'>>({
  configuration,
  locale,
  selectedDate,
}: {
  configuration: C,
  locale: ComputedRef<DateLocale>,
  selectedDate:  Ref<Date | Date[] | undefined>
}): {
    formatDate: ComputedRef<DateFormatter>,
    formattedDate: ComputedRef<string | string[]>,
    userFormattedDate: ComputedRef<string>,
  } {

  const formatDate = computed<DateFormatter>(() => buildDateFormatter(locale.value, configuration.dateFormatter));

  const dateRangeSeparator = computed<string>(() => {
    return locale.value.rangeSeparator || dateEnglishLocale.rangeSeparator;
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

  return {
    formatDate,
    formattedDate,
    userFormattedDate,    
  };
}
