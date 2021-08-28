import { NormalizedOptions } from '@variantjs/core';
import { shallowMount } from '@vue/test-utils';
import { ref, computed } from 'vue';
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
      configuration: computed<TSelectOptions | undefined>(() => ({})),
      fetchingMoreOptions: ref(false),
      shown: ref(false),
      dropdownBottomReachedHandler: jest.fn(),
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
          ...global.provide,
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
          ...global.provide,
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

  it('scroll the list to the "fetchingMoreOptions" element after loaded more options ends', async () => {
    const fetchingMoreOptions = ref(false);

    const scrollElementMock = jest.fn();
    window.HTMLLIElement.prototype.scrollIntoView = scrollElementMock;

    const wrapper = shallowMount(RichSelectOptionsList, {
      props,
      global: {
        provide: {
          ...global.provide,
          fetchingMoreOptions,
        },
      },
    });

    expect(scrollElementMock).not.toHaveBeenCalled();

    fetchingMoreOptions.value = true;

    await wrapper.vm.$nextTick();

    expect(scrollElementMock).toHaveBeenCalled();
  });

  it('doesnt scroll the list to the "fetchingMoreOptions" element when loading ends', async () => {
    const fetchingMoreOptions = ref(true);

    const scrollElementMock = jest.fn();
    window.HTMLLIElement.prototype.scrollIntoView = scrollElementMock;

    const wrapper = shallowMount(RichSelectOptionsList, {
      props,
      global: {
        provide: {
          ...global.provide,
          fetchingMoreOptions,
        },
      },
    });

    expect(scrollElementMock).not.toHaveBeenCalled();

    fetchingMoreOptions.value = false;

    await wrapper.vm.$nextTick();

    expect(scrollElementMock).not.toHaveBeenCalled();
  });

  describe('dropdownBottomReachedHandler', () => {
    it('adds a scroll listener attaced to the bottomReachedObserver when component is mounted', () => {
      const addEventListenerSpy = jest.spyOn(window.HTMLUListElement.prototype, 'addEventListener');

      const wrapper = shallowMount(RichSelectOptionsList, {
        props,
        global,
      });

      expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', wrapper.vm.$.setupState.bottomReachedObserver);

      addEventListenerSpy.mockRestore();
    });

    it('removes the scroll listener when component is unmounted', () => {
      const removeEventListenerSpy = jest.spyOn(window.HTMLUListElement.prototype, 'removeEventListener');

      const wrapper = shallowMount(RichSelectOptionsList, {
        props,
        global,
      });

      wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', wrapper.vm.$.setupState.bottomReachedObserver);

      removeEventListenerSpy.mockRestore();
    });

    it('calls the dropdownBottomReachedHandler when bottom reached', () => {
      const dropdownBottomReachedHandlerMock = jest.fn();

      jest.useFakeTimers();

      const wrapper = shallowMount(RichSelectOptionsList, {
        props,
        global: {
          provide: {
            ...global.provide,
            dropdownBottomReachedHandler: dropdownBottomReachedHandlerMock,
          },
        },
      });

      const container = wrapper.vm.$el;

      jest.spyOn(container, 'clientHeight', 'get').mockReturnValue(100);
      // 150 - 49 != 100 (which is the not height of the container) meaning it
      // not reached the bottom yet
      jest.spyOn(container, 'scrollHeight', 'get').mockReturnValue(150);
      jest.spyOn(container, 'scrollTop', 'get').mockReturnValue(49);

      container.dispatchEvent(new Event('scroll', {
        target: container,
      } as any));

      // (is debounced 200ms)
      jest.advanceTimersByTime(200);
      expect(dropdownBottomReachedHandlerMock).not.toHaveBeenCalled();

      // 150 - 50 === 100 (meaning reached the bottom)
      jest.spyOn(container, 'scrollTop', 'get').mockReturnValue(50);

      container.dispatchEvent(new Event('scroll', {
        target: container,
      } as any));

      // (is debounced 200ms)
      jest.advanceTimersByTime(199);
      expect(dropdownBottomReachedHandlerMock).not.toHaveBeenCalled();
      jest.advanceTimersByTime(1);
      expect(dropdownBottomReachedHandlerMock).toHaveBeenCalled();

      jest.useRealTimers();
    });
  });
});
