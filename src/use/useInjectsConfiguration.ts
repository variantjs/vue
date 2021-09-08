import { Data, WithVariantPropsAndClassesList } from '@variantjs/core';
import { inject } from 'vue';

export default function useInjectsConfiguration<P extends WithVariantPropsAndClassesList<Data, string>>(): P {
  return inject<P>('configuration', {} as P);
}
