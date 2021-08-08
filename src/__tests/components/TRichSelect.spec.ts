import { shallowMount } from '@vue/test-utils';
import TRichSelect from '../../components/TRichSelect.vue';
// import { getChildComponentNameByRef } from '../testUtils';

describe('TRichSelect.vue', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(TRichSelect);
    expect(wrapper.get('div')).toBeTruthy();
  });
});
