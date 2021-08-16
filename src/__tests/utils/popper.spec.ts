/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModifierArguments } from '@popperjs/core';
import { Data } from '@variantjs/core';
import { sameWidthModifier } from '../../utils/popper';

describe('sameWidthModifier', () => {
  it('sets the popper width from the reference width', () => {
    const options = {
      state: {
        styles: {
          popper: {},
        },
        rects: {
          reference: {
            width: 100,
          },
        },
      },

    } as any as ModifierArguments<Data>;

    sameWidthModifier.fn(options);

    expect(options.state.styles.popper.width).toBe('100px');
  });

  it('sets the popper width from the reference width on `effect` function', () => {
    const options = {
      state: {
        elements: {
          popper: {
            style: {},
          },
          reference: {
            offsetWidth: 100,
          },
        },
      },

    } as any as ModifierArguments<Data>;

    sameWidthModifier.effect!(options);

    expect(options.state.elements.popper.style.width).toBe('100px');
  });
});
