import { dateEnglishLocale, DateLocale } from '@variantjs/core';
import { computed, ComputedRef } from 'vue';
import { TDatepickerOptions } from '../../types/components/t-datepicker';

export default function useDateLocale<C extends Pick<TDatepickerOptions, 'locale'>>({
  configuration,
}: {
  configuration: C,
}): ComputedRef<DateLocale> {
  return computed(() => configuration.locale || dateEnglishLocale);
}
