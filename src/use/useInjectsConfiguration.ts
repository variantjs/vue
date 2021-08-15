import { Data, WithVariantPropsAndClassesList } from '@variantjs/core';
import { ComputedRef, inject, computed } from 'vue';

export default function useInjectsConfiguration<P extends WithVariantPropsAndClassesList<Data, string>>(): ComputedRef<P> {
  return inject<ComputedRef<P>>('configuration', computed<P>(() => ({} as P)));
}
