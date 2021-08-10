import { shallowMount } from '@vue/test-utils';
import RichSelectClearButton from '../../../components/TRichSelect/RichSelectClearButton.vue';

describe('RichSelectClearButton', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(RichSelectClearButton);
    expect(wrapper.vm.$el.tagName).toBe('BUTTON');
  });
});
