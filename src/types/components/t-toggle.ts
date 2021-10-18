import { WithVariantPropsAndClassesList, TToggleClassesValidKeys, Data } from '@variantjs/core';
import { HTMLAttributes } from 'vue';

export type TToggleOptions = WithVariantPropsAndClassesList<{

} & HTMLAttributes & Data, TToggleClassesValidKeys>;
