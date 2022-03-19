import { dateEnglishLocale, DateParser, buildDateParser } from '@variantjs/core';
import { computed, ComputedRef } from 'vue';
import { TDatepickerOptions } from '../../types';

export default function useDateParsing<C extends Pick<TDatepickerOptions, 'locale' | 'dateParser'>>(configuration: C): {
  parseDate: ComputedRef<DateParser>,
} {
  const parseDate = computed<DateParser>(() => buildDateParser(configuration.locale || dateEnglishLocale, configuration.dateParser));

  return { parseDate };
}
