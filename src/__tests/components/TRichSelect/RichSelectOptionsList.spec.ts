import { NormalizedOptions } from '@variantjs/core';
import { shallowMount } from '@vue/test-utils';
import RichSelectOptionsList from '../../../components/TRichSelect/RichSelectOptionsList.vue';
import { TSelectOptions } from '../../../types';

describe('RichSelectOptionsList', () => {
  const options: NormalizedOptions = [
    {
      value: 'A',
      text: 'Option A',
    },
    {
      value: 'B',
      text: 'Option B',
    },
  ];

  const props = {
    options,
    deep: 0,
  };

  const global = {
    provide: {
      configuration: { value: {} },
    },
  };

  it('should render without errors', () => {
    const wrapper = shallowMount(RichSelectOptionsList, { props, global });
    expect(wrapper.vm.$el.tagName).toBe('UL');
  });

  it('doesnt have `style` attribute by default', () => {
    const wrapper = shallowMount(RichSelectOptionsList, { props, global });
    expect(wrapper.vm.$el.getAttribute('style')).toBeNull();
  });

  it('adds the max-height style if defined on the settings', () => {
    const configuration: { value: TSelectOptions } = {
      value: {
        maxHeight: 100,
      },
    };
    const wrapper = shallowMount(RichSelectOptionsList, {
      props,
      global: {
        provide: {
          configuration,
        },
      },
    });

    expect(wrapper.vm.$el.getAttribute('style')).toBe('max-height: 100px; overflow-x: auto;');
  });

  it('doesnt add the max-height style if deep > 0', () => {
    const configuration: { value: TSelectOptions } = {
      value: {
        maxHeight: 100,
      },
    };
    const wrapper = shallowMount(RichSelectOptionsList, {
      props: {
        options,
        deep: 1,
      },
      global: {
        provide: {
          configuration,
        },
      },
    });

    expect(wrapper.vm.$el.getAttribute('style')).toBeNull();
  });

  it('adds every option', () => {
    const wrapper = shallowMount(RichSelectOptionsList, {
      props,
      global,
    });

    expect(wrapper.findAll('rich-select-option-stub').length).toBe(options.length);
  });
});
