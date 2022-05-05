import { DateParser, buildDateParser, DateLocale } from '@variantjs/core';
import { computed, ComputedRef } from 'vue';
import { TDatepickerOptions } from '../../types/components/t-datepicker';

export default function useDateParsing<C extends Pick<TDatepickerOptions, 'locale' | 'dateParser'>>({
  configuration,
  locale,
}: {
  configuration: C,
  locale: ComputedRef<DateLocale>
}): {
    parseDate: ComputedRef<DateParser>,
  } {
  const parseDate = computed<DateParser>(() => buildDateParser(locale.value, configuration.dateParser));

  return { parseDate };
}
