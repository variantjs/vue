import { addMonths, isSameMonth, range } from '@variantjs/core';
import { Ref, ref, watch, computed } from 'vue';
import { TDatepickerOptions } from '../../types/components/t-datepicker';

export default function useVisibleDate<C extends Pick<TDatepickerOptions, 'monthsPerView'>>({
  activeDate,
  configuration,
}: {
  activeDate: Ref<Date>,
  configuration: C
}): {
    visibleDate: Ref<Date>,
    resetVisibleDate: () => void,
  } {
  const visibleDate = ref<Date>(activeDate.value);
  
  const activeDateIsInVisibleView = computed<boolean>(() => {
    const visibleMonths = range(0, configuration.monthsPerView! - 1)
      .map((i) => addMonths(visibleDate.value, i));

    return visibleMonths.some((month) => isSameMonth(activeDate.value, month));
  });

  watch(activeDate, (newValue) => {
    if (! activeDateIsInVisibleView.value) {
      visibleDate.value = newValue;
    }
  });

  const resetVisibleDate = () => {
    visibleDate.value = activeDate.value;
  };

  return {
    resetVisibleDate,
    visibleDate,
  };
}
