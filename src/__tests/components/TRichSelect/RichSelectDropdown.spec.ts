import { NormalizedOptions } from '@variantjs/core';
import { shallowMount } from '@vue/test-utils';
import { computed } from 'vue';
import RichSelectDropdown from '../../../components/TRichSelect/RichSelectDropdown.vue';
import { getChildComponentNameByRef } from '../../testUtils';

describe('RichSelectDropdown', () => {
  const options: NormalizedOptions = [{
    value: 'a',
    text: 'a',
  }];

  const showSearchInput = computed(() => true);

  it('renders the component', () => {
    const wrapper = shallowMount(RichSelectDropdown, {
      global: {
        provide: {
          options,
          showSearchInput,
        },
      },
    });

    expect(wrapper.vm.$el.tagName).toBe('DIV');
  });

  it('has a RichSelectOptionsList component', () => {
    const wrapper = shallowMount(RichSelectDropdown, {
      global: {
        provide: {
          showSearchInput,
          options,
        },
      },
    });

    expect(getChildComponentNameByRef(wrapper, 'optionsList')).toEqual('RichSelectOptionsList');
  });

  it('has a RichSelectSearchInput  component', () => {
    const wrapper = shallowMount(RichSelectDropdown, {
      global: {
        provide: {
          showSearchInput,
          options,
        },
      },
    });

    expect(getChildComponentNameByRef(wrapper, 'searchInput')).toEqual('RichSelectSearchInput');
  });

  it('hides the RichSelectSearchInput component if `showSearchInput` is `false`', () => {
    const wrapper = shallowMount(RichSelectDropdown, {
      global: {
        provide: {
          options,
          showSearchInput: computed(() => false),
        },
      },
    });

    expect(getChildComponentNameByRef(wrapper, 'searchInput')).toBeUndefined();
  });
});
