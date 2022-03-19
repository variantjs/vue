import { computed, ComputedRef, ref, Ref } from 'vue';
import { TDatepickerOptions } from '../../types';

export default function useCalendarState<C extends Pick<TDatepickerOptions, 'show' | 'multiple' | 'range'>>(
  configuration: C,
): {
    shown: Ref<boolean>,
    isMultiple: ComputedRef<boolean>,
    isDropdownClosed: ComputedRef<boolean>,
    isDropdownOpened: ComputedRef<boolean>,    
  } {
  const shown = ref<boolean>(configuration.show!);

  const isMultiple = computed<boolean>(() => !! (configuration.multiple || configuration.range));

  const isDropdownClosed = computed<boolean>(() => shown.value === false);
    
  const isDropdownOpened = computed<boolean>(() => !isDropdownClosed.value);

  return {
    shown,
    isMultiple,
    isDropdownClosed,
    isDropdownOpened,    
  };
}
