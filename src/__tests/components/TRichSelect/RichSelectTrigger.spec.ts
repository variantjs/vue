import { NormalizedOption } from '@variantjs/core';
import { shallowMount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import RichSelectTrigger from '../../../components/TRichSelect/RichSelectTrigger.vue';
import { TSelectOptions } from '../../../types';

describe('RichSelectTrigger', () => {
  const selectedOption = computed<NormalizedOption | undefined>(() => undefined);
  const configuration = computed<TSelectOptions | undefined>(() => ({}));
  const hasSelectedOption = ref(false);

  const global = {
    provide: {
      shown: ref(false),
      fetchingOptions: ref(false),
      selectedOption,
      hasSelectedOption,
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
          ...global.provide,
          selectedOption: computed<NormalizedOption | undefined>(() => ({
            value: 'foo',
            text: 'Foo Bar',
          })),
          hasSelectedOption: ref(true),
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
          ...global.provide,
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
          ...global.provide,
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
          ...global.provide,
          selectedOption: computed<NormalizedOption | undefined>(() => ({
            value: 'foo',
            text: 'foo',
          })),
          hasSelectedOption: ref(true),
          configuration: computed<TSelectOptions | undefined>(() => ({
            clearable: true,
          })),
        },
      },
    });

    expect(wrapper.vm.showSelectorIcon).toBe(false);
    expect(wrapper.find('selector-icon-stub').exists()).toBe(false);
  });

  describe('label', () => {
    it('will use the selectedoption text for single values', () => {
      const wrapper = shallowMount(RichSelectTrigger, {
        global: {
          provide: {
            ...global.provide,
            selectedOption: computed<NormalizedOption | undefined>(() => ({
              value: 'foo',
              text: 'foo bar',
            })),
            hasSelectedOption: ref(true),
          },
        },
      });

      expect(wrapper.vm.label).toBe('foo bar');
    });

    it('will join all the the selectedoption text with a comma for multiple values', () => {
      const wrapper = shallowMount(RichSelectTrigger, {
        global: {
          provide: {
            ...global.provide,
            selectedOption: computed<NormalizedOption[]>(() => ([
              {
                value: 'foo',
                text: 'foo bar',
              },
              {
                value: 'bar',
                text: 'option 2',
              },
            ])),
            hasSelectedOption: ref(true),
          },
        },
      });

      expect(wrapper.vm.label).toBe('foo bar, option 2');
    });

    it('will return undefined if empty selected option', () => {
      const wrapper = shallowMount(RichSelectTrigger, {
        global: {
          provide: {
            ...global.provide,
            selectedOption: computed<undefined>(() => undefined),
            hasSelectedOption: ref(false),
          },
        },
      });

      expect(wrapper.vm.label).toBeUndefined();
    });
  });

  describe('isFetchingOptionsWhileClosed handle', () => {
    it('considers that isFetchingOptionsWhileClosed if is fetchingOptions is true and is not shown', () => {
      const wrapper = shallowMount(RichSelectTrigger, {
        global: {
          provide: {
            ...global.provide,
            fetchingOptions: ref(true),
            shown: ref(false),
          },
        },
      });

      expect(wrapper.vm.isFetchingOptionsWhileClosed).toBe(true);
    });

    it('doesnt considers that isFetchingOptionsWhileClosed if is not fetchingOptions', () => {
      const wrapper = shallowMount(RichSelectTrigger, {
        global: {
          provide: {
            ...global.provide,
            fetchingOptions: ref(false),
            shown: ref(false),
          },
        },
      });

      expect(wrapper.vm.isFetchingOptionsWhileClosed).toBe(false);
    });

    it('doesnt considers that isFetchingOptionsWhileClosed if is fetchingOptions is true but is shown', () => {
      const wrapper = shallowMount(RichSelectTrigger, {
        global: {
          provide: {
            ...global.provide,
            fetchingOptions: ref(true),
            shown: ref(true),
          },
        },
      });

      expect(wrapper.vm.isFetchingOptionsWhileClosed).toBe(false);
    });

    it('will show a loading... placeholder and loading icon when fetching options while closed', () => {
      const wrapper = shallowMount(RichSelectTrigger, {
        global: {
          provide: {
            ...global.provide,
            configuration: computed<TSelectOptions | undefined>(() => ({
              loadingClosedPlaceholder: 'Loading...',
            })),
            fetchingOptions: ref(true),
          },
        },
      });

      expect(wrapper.vm.$refs.label).not.toBeDefined();
      expect(wrapper.vm.$refs.placeholder).not.toBeDefined();
      expect(wrapper.vm.$refs.fetchingPlaceholder).toBeDefined();
      expect(wrapper.vm.$refs.loadingIcon).toBeDefined();
      expect(wrapper.vm.$refs.fetchingPlaceholder.placeholder).toBe('Loading...');
      expect(wrapper.vm.$refs.fetchingPlaceholder.classProperty).toBe('selectButtonSearchingPlaceholder');
    });
  });
});
