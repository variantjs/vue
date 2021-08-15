import { shallowMount } from '@vue/test-utils';
import { computed, defineComponent } from 'vue';
import useInjectsConfiguration from '../../use/useInjectsConfiguration';

describe('useInjectsConfiguration', () => {
  const configurationToProvide = {
    name: 'test',
    foo: 'bar',
    classesList: {
      test: 'test',
    },
  };

  const component = defineComponent({
    setup() {
      const configuration = useInjectsConfiguration();

      return { configuration };
    },
    template: '<div />',
  });

  it('returns the provided configuration option', () => {
    const wrapper = shallowMount(component, {
      global: {
        provide: {
          configuration: computed(() => configurationToProvide),
        },
      },
    });

    expect(wrapper.vm.configuration).toEqual(configurationToProvide);
  });

  it('returns the an empty configuration if no provide', () => {
    const wrapper = shallowMount(component);

    expect(wrapper.vm.configuration).toEqual({});
  });
});
