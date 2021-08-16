/* eslint-disable vue/one-component-per-file */
import { getVariantProps } from '../../utils/getVariantProps';

describe('getVariantProps()', () => {
  it('get the default variant props', () => {
    const props = getVariantProps();
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
