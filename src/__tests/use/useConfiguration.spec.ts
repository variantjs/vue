import { shallowMount } from '@vue/test-utils';
import useConfiguration from '../../use/useConfiguration';
import { useSetup } from './useSetup';
import TTag from '@/components/TTag.vue';

describe('useConfiguration', () => {
  describe('configuration', () => {
    it('should keep the default configuration', () => {
      useSetup(() => {
        const { configuration } = useConfiguration({
          attrib: 'value',
          width: '10px',
        });
        expect(configuration).toEqual({
          attrib: 'value',
          width: '10px',
        });
      });
    });

    it('should merge the classes from the configuration', () => {
      useSetup(() => {
        const { configuration } = useConfiguration({
          classes: 'text-red-500',
          fixedClasses: 'border-2',
        });
        expect(configuration).toEqual({
          class: 'text-red-500 border-2',
        });
      });
    });

    it('should merge the classes from the configuration variant', () => {
      useSetup(() => {
        const { configuration } = useConfiguration({
          classes: 'text-blue-500',
          fixedClasses: 'border',
          variants: {
            error: {
              classes: 'text-red-500',
              fixedClasses: 'border-2',
            },
          },
          variant: 'error',
        });
        expect(configuration).toEqual({
          class: 'text-red-500 border-2',
        });
      });
    });

    it('should merge the global configuration', () => {
      const globalConfiguration = {
        TInput: {
          placeholder: 'Hello world',
        },
      };
      useSetup(() => {
        const { configuration } = useConfiguration({
          maxlength: '2',
        });

        expect(configuration).toEqual({
          maxlength: '2',
          placeholder: 'Hello world',
        });
      }, globalConfiguration);
    });

    it('should use the default values from the props if not overriden', () => {
      const globalConfiguration = {};
      const attrs = {};
      const props = {
        placeholder: {
          type: String,
          default: 'Hello world',
        },
      };
      useSetup(() => {
        const { configuration } = useConfiguration({
          maxlength: '2',
        });

        expect(configuration).toEqual({
          maxlength: '2',
          placeholder: 'Hello world',
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

        const { attributes } = useConfiguration(props);

        expect(attributes).toEqual({
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

        const { attributes } = useConfiguration(props);

        expect(attributes).toEqual({
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

        const { attributes } = useConfiguration(props);

        expect(attributes).toEqual({
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
        const { attributes } = useConfiguration(props);

        expect(attributes).toEqual({
          'data-id': 'something',
        });
      }, {}, {}, ['type']);
    });

    it('updates the attributes when the configuration changes', async () => {
      const configuration = {
        TInput: {
          'data-id': 'something',
        },
      };

      const wrapper = shallowMount(TTag, {
        props: {
          tagName: 'div',
        },
        global: {
          provide: {
            configuration,
          },
        },
      });

      wrapper.vm.$.setupState.configuration['data-id'] = 'something-else';

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$.setupState.attributes).toEqual({
        'data-id': 'something-else',
      });
    });
  });
});
