/* eslint-disable vue/one-component-per-file */
import { ComponentPublicInstance } from 'vue';
import { getProps, getComputed, extractDefinedProps } from '../../utils/defineVariantComponent';

describe('getProps()', () => {
  it('get the default variant props', () => {
    const props = getProps();
    expect(props).toEqual({
      classes: {
        type: [String, Array, Object],
        default: undefined,
      },
      fixedClasses: {
        type: [String, Array, Object],
        default: undefined,
      },
      variants: {
        type: Object,
        default: undefined,
      },
      variant: {
        type: String,
        default: undefined,
      },
    });
  });
});

describe('getComputed()', () => {
  it('gets a configuration and attributes methods', () => {
    const computed = getComputed({}, 'TInput');
    expect(computed.configuration).toBeTruthy();
    expect(computed.attributes).toBeTruthy();
  });
});

describe('extractDefinedProps()', () => {
  it('the defined props is an empty array if no attributes', () => {
    const ctx = {
      $props: {
        test: 'test',
      },
      $: {
        vnode: {
          props: undefined,
        },
      },
    } as unknown as ComponentPublicInstance;
    expect(extractDefinedProps(ctx)).toEqual([]);
  });

  it('it keeps only the vnode.props (attributes) that are defined as props ignoring case', () => {
    const ctx = {
      $props: {
        test: 'test',
        oneAttribute: 'test',
        anotherAttribute: 'test',
        somethingElse: 'test',
      },
      $: {
        vnode: {
          props: {
            test: 'test',
            attribute: 'attribute',
            'one-attribute': 'attribute',
            anotherAttribute: 'attribute-2',
          },
        },
      },
    } as unknown as ComponentPublicInstance;

    expect(extractDefinedProps(ctx)).toEqual([
      'test',
      'oneAttribute',
      'anotherAttribute',
    ]);
  });
});
