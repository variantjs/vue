import useConfigurationWithClassesList from '../../use/useConfigurationWithClassesList';
import { useSetup } from './useSetup';

describe('useConfigurationWithClassesList', () => {
  it('should keep the default configuration', () => {
    useSetup(() => {
      const data = useConfigurationWithClassesList({
        attrib: 'value',
        width: '10px',
        classes: {
          wrapper: 'border',
          body: 'text-base',
        },
      }, ['wrapper', 'body']);

      expect(data.value).toEqual({
        attrib: 'value',
        width: '10px',
        classesList: {
          wrapper: 'border',
          body: 'text-base',
        },
      });
    });
  });

  it('should merge the classes from the configuration', () => {
    useSetup(() => {
      const data = useConfigurationWithClassesList({
        classes: {
          wrapper: 'border',
          body: 'text-base',
        },
        fixedClasses: {
          wrapper: 'border-gray-200',
          body: 'p-3',
        },
      }, ['wrapper', 'body']);
      expect(data.value).toEqual({
        classesList: {
          wrapper: 'border border-gray-200',
          body: 'text-base p-3',
        },
      });
    });
  });

  it('should override the classes from the configuration variant', () => {
    useSetup(() => {
      const data = useConfigurationWithClassesList({
        classes: {
          wrapper: 'border',
          body: 'text-base',
        },
        fixedClasses: {
          wrapper: 'border-gray-200',
          body: 'p-3',
        },
        variants: {
          error: {
            classes: {
              wrapper: 'border-2',
            },
          },
        },
        variant: 'error',
      }, ['wrapper', 'body']);
      expect(data.value).toEqual({
        classesList: {
          wrapper: 'border-2 border-gray-200',
          body: 'text-base p-3',
        },
      });
    });
  });

  it('should merge the global configuration', () => {
    const configuration = {
      TCard: {
        placeholder: 'Hello world',
        classes: {
          wrapper: 'border',
          body: 'text-base',
        },
      },
    };
    useSetup(() => {
      const data = useConfigurationWithClassesList({
        maxlength: '2',
      }, ['wrapper', 'body']);

      expect(data.value).toEqual({
        maxlength: '2',
        placeholder: 'Hello world',
        classesList: {
          wrapper: 'border',
          body: 'text-base',
        },
      });
    }, configuration, {}, {}, 'TCard');
  });

  it('should use the default values from the props if not overriden', () => {
    const configuration = {};
    const attrs = {};
    const props = {
      body: {
        type: String,
        default: 'Hello world',
      },
    };
    useSetup(() => {
      const data = useConfigurationWithClassesList({
        maxlength: '2',
      }, ['wrapper', 'body']);

      expect(data.value).toEqual({
        maxlength: '2',
        body: 'Hello world',
      });
    }, configuration, attrs, props);
  });
});
