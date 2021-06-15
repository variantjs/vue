import useAttributes from '../../use/useAttributes';
import { useSetup } from './useSetup';

describe('useAttributes', () => {
  it('contains the component the attributes', () => {
    useSetup(() => {
      const data = useAttributes({});
      expect(data.value).toEqual({
        placeholder: 'Hello World',
      });
    }, {}, {
      placeholder: 'Hello World',
    });
  });

  it('contains the class + classes + fixedClasses', () => {
    useSetup(() => {
      const data = useAttributes({});
      expect(data.value).toEqual({
        class: 'font-semibold border-red-500 text-red-500',
      });
    }, {}, {
      fixedClasses: 'text-red-500',
      classes: 'border-red-500',
      class: 'font-semibold',
    }, ['fixedClasses', 'classes']);
  });

  it('doesnt contains wharever that is defined as a props', () => {
    useSetup(() => {
      const data = useAttributes({});
      expect(data.value).toEqual({
        width: '10',
      });
    }, {}, {
      placeholder: 'Helo World',
      width: '10',
    }, ['placeholder']);
  });
});
