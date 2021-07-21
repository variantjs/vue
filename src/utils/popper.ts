const sameWidthModifier = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`;
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${
      state.elements.reference.offsetWidth
    }px`;
  },
};

// eslint-disable-next-line import/prefer-default-export
export { sameWidthModifier };
