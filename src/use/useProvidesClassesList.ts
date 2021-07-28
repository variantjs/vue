import { CSSClassesList } from '@variantjs/core';
import { ComputedRef, computed } from 'vue';
import useProvidesConfiguration from './useProvidesConfiguration';

export default function useProvidesClassesList<P extends CSSClassesList<string> | undefined>(): ComputedRef<P> {
  const configuration = useProvidesConfiguration();
  return computed<P>(() => configuration.value.classesList as P);
}
