import { NormalizedOption } from '@variantjs/core';
import { shallowMount } from '@vue/test-utils';
import { computed, ref } from 'vue';
import RichSelectState from '../../../components/TRichSelect/RichSelectState.vue';

describe('RichSelectState', () => {
  const configuration = {
    noResultsText: 'No results',
    searchingText: 'Searching...',
  };
  const options = computed<NormalizedOption[]>(() => ([{ value: 'a', text: 'A' }]));
  const fetchingOptions = ref<boolean>(false);
  const needsMoreCharsToFetch = ref<boolean>(false);
  const needsMoreCharsMessage = ref<string>('Needs more chars');

  const global = {
    provide: {
      configuration,
      options,
      fetchingOptions,
      needsMoreCharsToFetch,
      needsMoreCharsMessage,
    },
  };

  beforeEach(() => {
    fetchingOptions.value = false;
    needsMoreCharsToFetch.value = false;
  });

  describe('have options', () => {
    const wrapper = shallowMount(RichSelectState, { global });

    it('doesnt render anything by default', () => {
      expect(wrapper.text()).toBe('');
    });

    it('renders the searching text if fetchingOptions', async () => {
      fetchingOptions.value = true;

      await wrapper.vm.$nextTick();

      expect(wrapper.text()).toBe('Searching...');
    });

    it('renders the searching text if fetchingOptions and need more chars', async () => {
      fetchingOptions.value = true;
      needsMoreCharsToFetch.value = true;

      await wrapper.vm.$nextTick();

      expect(wrapper.text()).toBe('Searching...');
    });

    it('renders the need more chars message if need more chars', async () => {
      needsMoreCharsToFetch.value = true;

      await wrapper.vm.$nextTick();

      expect(wrapper.text()).toBe('Needs more chars');
    });
  });

  describe('doesnt have options', () => {
    const wrapper = shallowMount(RichSelectState, {
      global: {
        provide: {
          ...global.provide,
          options: computed(() => []),
        },
      },
    });

    it('shows the noResultsText by default', async () => {
      expect(wrapper.text()).toBe('No results');
    });

    it('doesnt shows the noResultsText if it need more chars to fetch ', async () => {
      needsMoreCharsToFetch.value = true;

      await wrapper.vm.$nextTick();

      expect(wrapper.text()).toBe('Needs more chars');
    });

    it('renders the searching text if fetchingOptions and need more chars', async () => {
      fetchingOptions.value = true;
      needsMoreCharsToFetch.value = true;

      await wrapper.vm.$nextTick();

      expect(wrapper.text()).toBe('Searching...');
    });
  });
});
