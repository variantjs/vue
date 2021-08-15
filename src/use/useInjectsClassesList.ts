import { CSSClassesList } from '@variantjs/core';
import { ComputedRef, computed } from 'vue';
import useInjectsConfiguration from './useInjectsConfiguration';

export default function useInjectsClassesList<P extends CSSClassesList<string> | undefined>(): ComputedRef<P> {
  const configuration = useInjectsConfiguration();

  return computed<P>(() => configuration.value.classesList as P);
}
