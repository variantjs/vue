import { computed, ComputedRef, ref, Ref } from 'vue';
import { TDatepickerOptions } from '../../types/components/t-datepicker';

export default function useCalendarState<C extends Pick<TDatepickerOptions, 'show' | 'multiple' | 'range'>>(
  configuration: C,
): {
    shown: Ref<boolean>,
    isMultiple: ComputedRef<boolean>,
    isRange: ComputedRef<boolean>,
    isDropdownClosed: ComputedRef<boolean>,
    isDropdownOpened: ComputedRef<boolean>,    
    doShow: () => void,
    doHide: () => void,
  } {
  const shown = ref<boolean>(configuration.show!);

  const isRange = computed<boolean>(() => !! configuration.range);

  const isMultiple = computed<boolean>(() => !! (configuration.multiple || isRange.value));

  const isDropdownClosed = computed<boolean>(() => shown.value === false);
    
  const isDropdownOpened = computed<boolean>(() => !isDropdownClosed.value);

  const doHide = () => {
    shown.value = false;
  };

  const doShow = () => {
    shown.value = true;
  };

  return {
    shown,
    doHide,
    doShow,
    isMultiple,
    isRange,
    isDropdownClosed,
    isDropdownOpened,    
  };
}
