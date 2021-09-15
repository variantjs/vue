import { CSSClass, get } from '@variantjs/core';
import { ComputedRef, computed } from 'vue';
import useInjectsConfiguration from './useInjectsConfiguration';

export default function useInjectsClassesListClass(property: string): ComputedRef<CSSClass> {
  const configuration = useInjectsConfiguration();

  return computed<CSSClass>((): CSSClass => get(configuration.classesList, property, ''));
}
