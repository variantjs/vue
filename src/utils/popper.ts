import { Modifier, ModifierArguments } from '@popperjs/core';
import { Data } from '@variantjs/core';

const sameWidthModifier: Modifier<'sameWidth', Data> = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: (options: ModifierArguments<Data>): void => {
    const { state } = options;
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: (options: ModifierArguments<Data>): void => {
    const { state } = options;
    const reference = state.elements.reference as HTMLElement;
    state.elements.popper.style.width = `${reference.offsetWidth}px`;
  },
};

export { sameWidthModifier };
