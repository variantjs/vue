import Transitionable from '../../../components/misc/Transitionable.vue';

describe('Transitionable', () => {
  it('defaults the classes list to an empty object', () => {
    expect(Transitionable.props.classesList.default()).toEqual({});
  });
});
