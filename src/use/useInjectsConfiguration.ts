import { Data, WithVariantPropsAndClassesList } from '@variantjs/core';
import { ComputedRef, inject, computed } from 'vue';

export default function useInjectsConfiguration<P extends WithVariantPropsAndClassesList<Data, string>>(): P {
  return inject<P>('configuration')!;
}
