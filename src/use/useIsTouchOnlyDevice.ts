import { isTouchOnlyDevice as getIsTouch  } from '@variantjs/core';
import { Ref, ref, onMounted } from 'vue';

export default function useIsTouchOnlyDevice(): Ref<boolean> {
  const isTouchOnlyDevice = ref<boolean>(false);

  onMounted(() => {
    isTouchOnlyDevice.value = getIsTouch();
  });

  return isTouchOnlyDevice;
}
