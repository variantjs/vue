import { WithVariantPropsAndClassesList, TAlertConfigKeys } from '@variantjs/core';
import { HTMLAttributes } from 'vue';
import { Data } from '../misc';

export type TAlertOptions = WithVariantPropsAndClassesList<{
  text?: string,
  tagName?: string,
  bodyTagName?: string,
  dismissible?: boolean,
  show?: boolean,
  timeout?: number,
}, TAlertConfigKeys> & HTMLAttributes & Data;
