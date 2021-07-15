import { Data } from '../types';

export const scopedParamsAsString = (params: Data) : string => {
  const keys = Object.keys(params);
  const result: Data = {};
  keys.filter((key) => key !== 'key').forEach((key) => {
    result[key] = typeof params[key];
  });
  return JSON.stringify(result);
};

export const parseScopedParams = (paramsAsString: string) : Data => JSON.parse(paramsAsString);
