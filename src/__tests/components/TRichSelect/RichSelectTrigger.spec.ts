import { shallowMount } from '@vue/test-utils';
import RichSelectTrigger from '../../../components/TRichSelect/RichSelectTrigger.vue';
import { getChildComponentNameByRef } from '../../testUtils';

describe('RichSelectTrigger', () => {
  it('renders a button with type `button``', () => {
    const wrapper = shallowMount(RichSelectTrigger);

    expect(wrapper.vm.$el.tagName).toEqual('BUTTON');
    expect(wrapper.vm.$el.getAttribute('type')).toEqual('button');
  });

  it('has a text-placeholder component', () => {
    const wrapper = shallowMount(RichSelectTrigger);

    expect(getChildComponentNameByRef(wrapper, 'placeholder')).toBe('TextPlaceholder');
  });

  it('uses the `selectButton` classes from the `classesList`', () => {
    const wrapper = shallowMount(RichSelectTrigger, {
      global: {
        provide: {
          classesList: { selectButton: 'text-red-500' },
        },
      },
    });

    expect(wrapper.vm.$el.className).toEqual('text-red-500');
  });
});
