type Truthy = boolean | string;

type Data = Record<string, unknown>;

type Measure = string | number;

// eslint-disable-next-line @typescript-eslint/ban-types
type IconProp = Element | string | (Data & { render?: Function });

export {
  Truthy, Data, IconProp, Measure,
};
