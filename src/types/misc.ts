import { Data, InputOptions } from '@variantjs/core';

type Truthy = boolean | string;

// eslint-disable-next-line @typescript-eslint/ban-types
type IconProp = Element | string | (Data & { render?: Function });

type FetchedOptions = Promise<{
  results: InputOptions;
  hasMorePages?: boolean;
}>;

type FetchOptionsFn = (query?: string, nextPage?: number) => FetchedOptions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PromiseRejectFn = ((reason?: any) => void);

export {
  Truthy, IconProp, FetchOptionsFn, FetchedOptions, PromiseRejectFn,
};
