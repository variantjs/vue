import { CSSRawClassesList } from '@variantjs/core';
import { ComputedRef, inject, computed } from 'vue';

export default function useProvidesClassesList<P extends CSSRawClassesList>(): ComputedRef<P> {
  return inject<ComputedRef<P>>('classesList', computed<P>(() => ({} as P)));
}
