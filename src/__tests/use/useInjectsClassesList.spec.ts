import { shallowMount } from '@vue/test-utils';
import { computed, defineComponent } from 'vue';
import useInjectsClassesList from '../../use/useInjectsClassesList';

describe('useInjectsClassesList', () => {
  const configurationToProvide = {
    classesList: {
      test: 'test',
      foo: 'bar',
    },
  };

  const component = defineComponent({
    setup() {
      const classesList = useInjectsClassesList();

      return { classesList };
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

    expect(wrapper.vm.classesList).toEqual(configurationToProvide.classesList);
  });

  it('returns undefined classeslist if no provided', () => {
    const wrapper = shallowMount(component);

    expect(wrapper.vm.classesList).toBeUndefined();
  });
});
