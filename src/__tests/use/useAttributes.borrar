import { useConfiguration } from '../../use';
import useAttributes from '../../use/useAttributes';
import { useSetup } from './useSetup';

describe('useAttributes', () => {
  it('contains the configuration the attributes', () => {
    useSetup(() => {
      const props = {
        placeholder: 'Hello World',
      };

      const configuration = useConfiguration(props);
      const attributes = useAttributes(configuration);

      expect(attributes.value).toEqual({
        placeholder: 'Hello World',
      });
    }, {}, {});
  });

  it('contains the class + classes + fixedClasses', () => {
    useSetup(() => {
      const props = {
        fixedClasses: 'text-red-500',
        classes: 'border-red-500',
        class: 'font-semibold',
      };

      const configuration = useConfiguration(props);
      const attributes = useAttributes(configuration);

      expect(attributes.value).toEqual({
        class: 'font-semibold border-red-500 text-red-500',
      });
    }, {}, {}, ['fixedClasses', 'classes']);
  });

  it('adds the configurations attributes', () => {
    useSetup(() => {
      const props = {
        type: 'button',
        'data-id': 'something',
      };

      const configuration = useConfiguration(props);
      const attributes = useAttributes(configuration);

      expect(attributes.value).toEqual({
        type: 'button',
        'data-id': 'something',
      });
    });
  });

  it('doesnt add the configurations attributes defined as a props', () => {
    useSetup(() => {
      const props = {
        type: 'button',
        'data-id': 'something',
      };
      const configuration = useConfiguration(props);
      const attributes = useAttributes(configuration);
      expect(attributes.value).toEqual({
        'data-id': 'something',
      });
    }, {}, {}, ['type']);
  });
});
