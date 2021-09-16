import { shallowMount } from '@vue/test-utils';
import TextPlaceholder from '../../../components/misc/TextPlaceholder.vue';

describe('TextPlaceholder', () => {
  it('renders a blank space if no TextPlaceholder is set', () => {
    const wrapper = shallowMount(TextPlaceholder);

    expect(wrapper.vm.$el.innerHTML).toEqual('&nbsp;');
  });

  it('uses the text inside the default prop', () => {
    const wrapper = shallowMount(TextPlaceholder, {
      slots: {
        default: 'Select an option',
      },
    });

    expect(wrapper.vm.$el.innerHTML).toEqual('Select an option');
  });

  it('uses `placeholder` as the property from the `classesList` by default', () => {
    const configuration = {
      classesList: { placeholder: 'text-red-500' },
    };

    const wrapper = shallowMount(TextPlaceholder, {
      global: {
        provide: {
          configuration,
        },
      },
    });

    expect(wrapper.vm.$el.className).toEqual('text-red-500');
  });

  it('accepts a different property for the `classesList` by object', () => {
    const configuration = {
      classesList: { buttonPlaceholder: 'text-red-500' },
    };
    const wrapper = shallowMount(TextPlaceholder, {
      global: {
        provide: {
          configuration,
        },
      },
      props: {
        classProperty: 'buttonPlaceholder',
      },
    });

    expect(wrapper.vm.$el.className).toEqual('text-red-500');
  });

  it('uses the prop placeholder if set', () => {
    const wrapper = shallowMount(TextPlaceholder, {
      props: {
        placeholder: 'Select an option',
      },
    });

    expect(wrapper.vm.$el.innerHTML).toEqual('Select an option');
  });

  it('prioritized the slot over the placeholder attribute', () => {
    const wrapper = shallowMount(TextPlaceholder, {
      props: {
        placeholder: 'Something else',
      },
      slots: {
        default: 'Select an option',
      },
    });

    expect(wrapper.vm.$el.innerHTML).toEqual('Select an option');
  });
});
