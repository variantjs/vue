import { Data } from '@variantjs/core';

type Truthy = boolean | string;

// eslint-disable-next-line @typescript-eslint/ban-types
type IconProp = Element | string | (Data & { render?: Function });

export {
  Truthy, IconProp,
};
