import useConfigurationWithClassesList from '../../use/useConfigurationWithClassesList';
import { useSetup } from './useSetup';

describe('useConfigurationWithClassesList', () => {
  describe('configuration', () => {
    it('should keep the default configuration', () => {
      useSetup(() => {
        const { configuration } = useConfigurationWithClassesList({
          attrib: 'value',
          width: '10px',
          classes: {
            wrapper: 'border',
            body: 'text-base',
          },
        }, ['wrapper', 'body']);

        expect(configuration).toEqual({
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
        const { configuration } = useConfigurationWithClassesList({
          classes: {
            wrapper: 'border',
            body: 'text-base',
          },
          fixedClasses: {
            wrapper: 'border-gray-200',
            body: 'p-3',
          },
        }, ['wrapper', 'body']);
        expect(configuration).toEqual({
          classesList: {
            wrapper: 'border border-gray-200',
            body: 'text-base p-3',
          },
        });
      });
    });

    it('should override the classes from the configuration variant', () => {
      useSetup(() => {
        const { configuration } = useConfigurationWithClassesList({
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
        expect(configuration).toEqual({
          classesList: {
            wrapper: 'border-2 border-gray-200',
            body: 'text-base p-3',
          },
        });
      });
    });

    it('should merge the global configuration', () => {
      const globalConfiguration = {
        TCard: {
          placeholder: 'Hello world',
          classes: {
            wrapper: 'border',
            body: 'text-base',
          },
        },
      };
      useSetup(() => {
        const { configuration } = useConfigurationWithClassesList({
          maxlength: '2',
        }, ['wrapper', 'body']);

        expect(configuration).toEqual({
          maxlength: '2',
          placeholder: 'Hello world',
          classesList: {
            wrapper: 'border',
            body: 'text-base',
          },
        });
      }, globalConfiguration, {}, {}, 'TCard');
    });

    it('should use the default values from the props if not overriden', () => {
      const globalConfiguration = {};
      const attrs = {};
      const props = {
        body: {
          type: String,
          default: 'Hello world',
        },
      };
      useSetup(() => {
        const { configuration } = useConfigurationWithClassesList({
          maxlength: '2',
        }, ['wrapper', 'body']);

        expect(configuration).toEqual({
          maxlength: '2',
          body: 'Hello world',
        });
      }, globalConfiguration, attrs, props);
    });
  });

  describe('attributes', () => {
    it('contains the configuration the attributes', () => {
      useSetup(() => {
        const props = {
          placeholder: 'Hello World',
        };

        const { attributes } = useConfigurationWithClassesList(props, []);

        expect(attributes.value).toEqual({
          placeholder: 'Hello World',
        });
      }, {}, {});
    });

    it('adds the configurations attributes', () => {
      useSetup(() => {
        const props = {
          type: 'button',
          'data-id': 'something',
        };

        const { attributes } = useConfigurationWithClassesList(props, []);

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
        const { attributes } = useConfigurationWithClassesList(props, []);

        expect(attributes.value).toEqual({
          'data-id': 'something',
        });
      }, {}, {}, ['type']);
    });
  });
});
