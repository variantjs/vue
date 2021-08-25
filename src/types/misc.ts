import { Data, InputOptions } from '@variantjs/core';

type Truthy = boolean | string;

// eslint-disable-next-line @typescript-eslint/ban-types
type IconProp = Element | string | (Data & { render?: Function });

type FetchedOptions = Promise<{
  results: InputOptions;
  hasMorePages?: boolean;
}>;

type FetchOptionsFn = (query?: string, nextPage?: number) => FetchedOptions;

export {
  Truthy, IconProp, FetchOptionsFn, FetchedOptions,
};
