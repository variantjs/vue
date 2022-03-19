import { Ref, ref } from 'vue';
import { TDatepickerView } from '../types/components/t-datepicker';

export default function useCalendarView<C extends {
  initialView?: TDatepickerView,
  dateFormat?: string,
  amPm?: boolean,
}>(
  configuration: C,
): {
    currentView: Ref<TDatepickerView>
    initView: () => void
    setCurrentView: (view: TDatepickerView) => void
  } {
  const getInitialView = (): TDatepickerView => configuration.initialView!;

  const currentView = ref<TDatepickerView>(getInitialView());

  const setCurrentView = (view: TDatepickerView) => {
    currentView.value = view;
  };

  const initView = () => {
    setCurrentView(getInitialView());
  };

  return {
    currentView,
    initView,
    setCurrentView,
  };
}
