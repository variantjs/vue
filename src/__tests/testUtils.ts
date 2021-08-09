import { Data } from '@variantjs/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance } from 'vue';

export const scopedParamsAsString = (params: Data) : string => {
  const keys = Object.keys(params);
  const result: Data = {};
  keys.filter((key) => key !== 'key').forEach((key) => {
    result[key] = typeof params[key];
  });
  return JSON.stringify(result);
};

export const parseScopedParams = (paramsAsString: string) : Data => JSON.parse(paramsAsString);

export const getChildComponentNameByRef = (wrapper: VueWrapper<ComponentPublicInstance>, refName: string): string | undefined => {
  const component = wrapper.vm.$refs[refName] as ComponentPublicInstance | undefined;

  return component?.$?.type.name;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const componentHasAttributeWithValue = (component: any, attributeName: string, attributeValue: any): boolean => component.$.attrs[attributeName] === attributeValue;
