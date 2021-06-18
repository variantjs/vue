// Copied from the types on vue/node_modules/vue-router/dist/vue-router.d.ts
// so we dont need to add any extra dependency

type RouteParamValue = string;

type RouteParamValueRaw = RouteParamValue | number;

type RouteParamsRaw = Record<string, RouteParamValueRaw | RouteParamValueRaw[]>;

type RouteRecordName = string | symbol;

interface LocationAsRelativeRaw {
  name?: RouteRecordName;
  params?: RouteParamsRaw;
}

type HistoryStateArray = Array<HistoryStateValue>;

type HistoryStateValue = string | number | boolean | null | undefined | HistoryState | HistoryStateArray;

/**
 * Allowed HTML history.state
 */
interface HistoryState {
  [x: number]: HistoryStateValue;
  [x: string]: HistoryStateValue;
}

interface RouteLocationOptions {
  /**
   * Replace the entry in the history instead of pushing a new entry
   */
  replace?: boolean;
  /**
   * Triggers the navigation even if the location is the same as the current one
   */
  force?: boolean;
  /**
   * State to save using the History API. This cannot contain any reactive
   * values and some primitives like Symbols are forbidden. More info at
   * https://developer.mozilla.org/en-US/docs/Web/API/History/state
   */
  state?: HistoryState;
}

interface LocationAsPath {
  path: string;
}

type LocationQueryValue = string | null;

type LocationQueryValueRaw = LocationQueryValue | number | undefined;

type LocationQueryRaw = Record<string | number, LocationQueryValueRaw | LocationQueryValueRaw[]>;

interface RouteQueryAndHash {
  query?: LocationQueryRaw;
  hash?: string;
}

type VueRouteRouteLocationRaw = string | (RouteQueryAndHash & LocationAsPath & RouteLocationOptions) | (RouteQueryAndHash & LocationAsRelativeRaw & RouteLocationOptions);
type VueRouteAriaCurrentValue = 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false' | undefined;

export { VueRouteAriaCurrentValue, VueRouteRouteLocationRaw };
