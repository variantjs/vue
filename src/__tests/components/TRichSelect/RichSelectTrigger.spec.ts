import { NormalizedOption } from '@variantjs/core';
import { shallowMount } from '@vue/test-utils';
import { computed } from 'vue';
import RichSelectTrigger from '../../../components/TRichSelect/RichSelectTrigger.vue';
import { TSelectOptions } from '../../../types';

describe('RichSelectTrigger', () => {
  const selectedOption = computed<NormalizedOption | undefined>(() => undefined);
  const configuration = computed<TSelectOptions | undefined>(() => ({}));

  const global = {
    provide: {
      selectedOption,
      configuration,
    },
  };

  it('will show the placeholder if not option selected', () => {
    const wrapper = shallowMount(RichSelectTrigger, { global });

    expect(wrapper.find('text-placeholder-stub').exists()).toBe(true);
    expect(wrapper.find('span').exists()).toBe(false);
  });

  it('will show option selected text', () => {
    const wrapper = shallowMount(RichSelectTrigger, {
      global: {
        provide: {
          selectedOption: computed<NormalizedOption | undefined>(() => ({
            value: 'foo',
            text: 'Foo Bar',
          })),
          configuration,
        },
      },
    });

    expect(wrapper.find('text-placeholder-stub').exists()).toBe(false);
    expect(wrapper.find('span').text()).toBe('Foo Bar');
  });

  it('will show the selector icon if is not clearable', () => {
    const wrapper = shallowMount(RichSelectTrigger, {
      global: {
        provide: {
          selectedOption,
          configuration: computed<TSelectOptions | undefined>(() => ({
            clearable: false,
          })),
        },
      },
    });

    expect(wrapper.vm.showSelectorIcon).toBe(true);
    expect(wrapper.find('selector-icon-stub').exists()).toBe(true);
  });

  it('will  show the selector icon if clearable and doesnt have selected option', () => {
    const wrapper = shallowMount(RichSelectTrigger, {
      global: {
        provide: {
          selectedOption,
          configuration: computed<TSelectOptions | undefined>(() => ({
            clearable: true,
          })),
        },
      },
    });

    expect(wrapper.vm.showSelectorIcon).toBe(true);
    expect(wrapper.find('selector-icon-stub').exists()).toBe(true);
  });

  it('will not show the selector icon if clearable and have selected option', () => {
    const wrapper = shallowMount(RichSelectTrigger, {
      global: {
        provide: {
          selectedOption: computed<NormalizedOption | undefined>(() => ({
            value: 'foo',
            text: 'foo',
          })),
          configuration: computed<TSelectOptions | undefined>(() => ({
            clearable: true,
          })),
        },
      },
    });

    expect(wrapper.vm.showSelectorIcon).toBe(false);
    expect(wrapper.find('selector-icon-stub').exists()).toBe(false);
  });
});
