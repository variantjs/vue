import { computed, ComputedRef, ref, Ref } from 'vue';
import { TDatepickerOptions } from '../../types/components/t-datepicker';

export default function useCalendarState<C extends Pick<TDatepickerOptions, 'show' | 'multiple' | 'range'>>(
  configuration: C,
): {
    shown: Ref<boolean>,
    isMultiple: ComputedRef<boolean>,
    isDropdownClosed: ComputedRef<boolean>,
    isDropdownOpened: ComputedRef<boolean>,    
    doShow: () => void,
    doHide: () => void,
  } {
  const shown = ref<boolean>(configuration.show!);

  const isMultiple = computed<boolean>(() => !! (configuration.multiple || configuration.range));

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
    isDropdownClosed,
    isDropdownOpened,    
  };
}
