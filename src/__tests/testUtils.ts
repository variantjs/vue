/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Data } from '@variantjs/core';

export const scopedParamsAsString = (params: Data) : string => {
  const keys = Object.keys(params);
  const result: Data = {};
  keys.filter((key) => key !== 'key').forEach((key) => {
    result[key] = typeof params[key];
  });
  return JSON.stringify(result);
};

export const parseScopedParams = (paramsAsString: string) : Data => JSON.parse(paramsAsString);

export const getChildComponentNameByRef = (wrapper: any, refName: string): string | undefined => {
  const component = wrapper.vm.$refs[refName];

  return component?.$?.type.name;
};

export const componentHasAttributeWithValue = (component: any, attributeName: string, attributeValue: any): boolean => component.$.attrs[attributeName] === attributeValue;

export const componentHasAttributeWithInlineHandlerAndParameter = (component: any, attributeName: string, parameterName: any): boolean => {
  const functionAsString: string = component.$.attrs[attributeName].toString();
  return functionAsString.includes(parameterName);
};
