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
    const wrapper = shallowMount(TextPlaceholder, {
      global: {
        provide: {
          classesList: { placeholder: 'text-red-500' },
        },
      },
    });

    expect(wrapper.vm.$el.className).toEqual('text-red-500');
  });

  it('accepts a different property for the `classesList` by object', () => {
    const wrapper = shallowMount(TextPlaceholder, {
      global: {
        provide: {
          classesList: { buttonPlaceholder: 'text-red-500' },
        },
      },
      props: {
        classProperty: 'buttonPlaceholder',
      },
    });

    expect(wrapper.vm.$el.className).toEqual('text-red-500');
  });

  it('uses the placeholder global provide property if set', () => {
    const wrapper = shallowMount(TextPlaceholder, {
      global: {
        provide: {
          placeholder: 'Select an option',
        },
      },
    });

    expect(wrapper.vm.$el.innerHTML).toEqual('Select an option');
  });

  it('prioritized the slot over the placeholder attribute', () => {
    const wrapper = shallowMount(TextPlaceholder, {
      global: {
        provide: {
          placeholder: 'Something else',
        },
      },
      slots: {
        default: 'Select an option',
      },
    });

    expect(wrapper.vm.$el.innerHTML).toEqual('Select an option');
  });
});
