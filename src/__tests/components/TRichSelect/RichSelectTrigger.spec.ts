import { shallowMount } from '@vue/test-utils';
import RichSelectTrigger from '../../../components/TRichSelect/RichSelectTrigger.vue';

describe('RichSelectTrigger', () => {
  it('renders a button with type `button``', () => {
    const wrapper = shallowMount(RichSelectTrigger);

    expect(wrapper.vm.$el.tagName).toEqual('BUTTON');
    expect(wrapper.vm.$el.getAttribute('type')).toEqual('button');
  });

  it('has a text-placeholder component', () => {
    const wrapper = shallowMount(RichSelectTrigger);

    expect(wrapper.vm.$refs.placeholder.$.type.name).toBe('TextPlaceholder');
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
