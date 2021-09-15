import { NormalizedOption } from '@variantjs/core';
import { mount, shallowMount } from '@vue/test-utils';
import { ref } from 'vue';
import RichSelectOption from '../../../components/TRichSelect/RichSelectOption.vue';

describe('RichSelectOption', () => {
  const scrollIntoViewMock = jest.fn();
  window.HTMLLIElement.prototype.scrollIntoView = scrollIntoViewMock;

  const toggleOption = jest.fn();
  const setActiveOption = jest.fn();
  const optionIsSelected = jest.fn();
  const optionIsActive = jest.fn();
  const shown = ref(true);
  const option: NormalizedOption = {
    value: 'a',
    text: 'Option A',
  };
  const deep = 0;

  const global = {
    provide: {
      toggleOption,
      setActiveOption,
      optionIsSelected,
      optionIsActive,
      shown,
    },
    stubs: {
      RichSelectOptionsList: {
        template: '<div />',
      },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();

    optionIsActive.mockReturnValue(false);

    scrollIntoViewMock.mockReset();
  });

  it('renders the component', () => {
    const wrapper = shallowMount(RichSelectOption, {
      props: {
        option,
        deep,
      },
      global,
    });

    expect(wrapper.vm.$el.tagName).toBe('LI');
    expect(wrapper.vm.$el.textContent).toBe('Option A');
  });

  it('determines if option has children', () => {
    const wrapper = shallowMount(RichSelectOption, {
      props: {
        option,
        deep,
      },
      global,
    });

    expect(wrapper.vm.hasChildren).toBe(false);
  });

  it('determines if option has children when empty', () => {
    const wrapper = shallowMount(RichSelectOption, {
      props: {
        option: {
          ...option,
          children: [],
        },
        deep,
      },
      global,
    });

    expect(wrapper.vm.hasChildren).toBe(false);
  });

  it('determines if option has children when not empty', () => {
    const wrapper = shallowMount(RichSelectOption, {
      props: {
        option: {
          ...option,
          children: [
            { value: 1, text: 1 },
          ],
        },
        deep,
      },
      global,
    });

    expect(wrapper.vm.hasChildren).toBe(true);
  });

  it('determines if option is selected', () => {
    optionIsSelected.mockReturnValue(true);

    const wrapper = shallowMount(RichSelectOption, {
      props: {
        option,
        deep,
      },
      global,
    });

    expect(wrapper.vm.isSelected).toBe(true);
  });

  it('determines if option is selected when false', () => {
    optionIsSelected.mockReturnValue(false);

    const wrapper = shallowMount(RichSelectOption, {
      props: {
        option,
        deep,
      },
      global,
    });

    expect(wrapper.vm.isSelected).toBe(false);
  });

  it('determines if option is active', () => {
    optionIsActive.mockReturnValue(true);

    const wrapper = shallowMount(RichSelectOption, {
      props: {
        option,
        deep,
      },
      global,
    });

    jest.spyOn(wrapper.vm, 'scrollIntoViewIfNeccesary').mockImplementation(() => {});

    expect(wrapper.vm.isActive).toBe(true);
  });

  it('determines if option is active when false', () => {
    optionIsActive.mockReturnValue(false);

    const wrapper = shallowMount(RichSelectOption, {
      props: {
        option,
        deep,
      },
      global,
    });

    expect(wrapper.vm.isActive).toBe(false);
  });

  it('shows the checkmark icon if option is selected', () => {
    optionIsSelected.mockReturnValue(true);

    const wrapper = mount(RichSelectOption, {
      props: {
        option,
        deep,
      },
      global,
    });

    expect(wrapper.vm.$refs.checkIcon).toBeDefined();
  });

  it('hides the checkmark icon if option is not selected', () => {
    optionIsSelected.mockReturnValue(false);

    const wrapper = mount(RichSelectOption, {
      props: {
        option,
        deep,
      },
      global,
    });

    expect(wrapper.vm.$refs.checkIcon).toBeUndefined();
  });

  it('will scroll into the view if shown and is active', async () => {
    optionIsActive.mockReturnValue(true);

    const wrapper = shallowMount(RichSelectOption, {
      props: {
        option,
        deep,
      },
      global,
    });

    wrapper.vm.$el.scrollIntoView = scrollIntoViewMock;

    await wrapper.vm.$nextTick();

    expect(scrollIntoViewMock).toHaveBeenCalled();
  });

  it('will scroll into the view if active changes state', async () => {
    optionIsActive.mockReturnValue(true);

    const wrapper = shallowMount(RichSelectOption, {
      props: {
        option,
        deep,
      },
      global,
    });

    await wrapper.vm.$nextTick();
    // First time when created
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);

    wrapper.vm.$options.watch.isActive.call(wrapper.vm);

    // Second time when state changed
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(2);
  });

  it('will not scroll into the view if shown but is not active', async () => {
    optionIsActive.mockReturnValue(false);

    const wrapper = shallowMount(RichSelectOption, {
      props: {
        option,
        deep,
      },
      global,
    });

    wrapper.vm.$el.scrollIntoView = scrollIntoViewMock;

    await wrapper.vm.$nextTick();

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });

  it('will not scroll into the view if is active but is not shown', async () => {
    optionIsActive.mockReturnValue(true);

    const wrapper = shallowMount(RichSelectOption, {
      props: {
        option,
        deep,
      },
      global: {
        provide: {
          ...global.provide,
          shown: ref(false),
        },
        stubs: global.stubs,
      },
    });

    wrapper.vm.$el.scrollIntoView = scrollIntoViewMock;

    await wrapper.vm.$nextTick();

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });

  describe('event handlers', () => {
    it('calls the `mousemoveHandler` when option mousemove', () => {
      const wrapper = shallowMount(RichSelectOption, {
        props: {
          option,
          deep,
        },
        global,
      });

      const mousemoveHandlerSpy = jest.spyOn(wrapper.vm, 'mousemoveHandler');

      wrapper.vm.$el.dispatchEvent(new MouseEvent('mousemove'));

      expect(mousemoveHandlerSpy).toHaveBeenCalled();
    });

    it('the `mousemoveHandler` sets the option as active', () => {
      const wrapper = shallowMount(RichSelectOption, {
        props: {
          option,
          deep,
        },
        global,
      });

      wrapper.vm.mousemoveHandler();

      expect(setActiveOption).toHaveBeenCalledWith(option);
    });

    it('calls the `mousewheelHandler` when mousewheel event', () => {
      const wrapper = shallowMount(RichSelectOption, {
        props: {
          option,
          deep,
        },
        global,
      });

      const mousewheelHandlerSpy = jest.spyOn(wrapper.vm, 'mousewheelHandler');

      wrapper.vm.$el.dispatchEvent(new MouseEvent('mousewheel'));

      expect(mousewheelHandlerSpy).toHaveBeenCalled();
    });

    it('the `mousewheelHandler` sets the option as active', () => {
      const wrapper = shallowMount(RichSelectOption, {
        props: {
          option,
          deep,
        },
        global,
      });

      wrapper.vm.mousewheelHandler();

      expect(setActiveOption).toHaveBeenCalledWith(option);
    });

    it('calls the `clickHandler` when option clicked', () => {
      const wrapper = shallowMount(RichSelectOption, {
        props: {
          option,
          deep,
        },
        global,
      });

      const clickHandlerSpy = jest.spyOn(wrapper.vm, 'clickHandler');

      wrapper.vm.$el.dispatchEvent(new MouseEvent('click'));

      expect(clickHandlerSpy).toHaveBeenCalled();
    });

    it('the `clickHandler` toggles the option', () => {
      const wrapper = shallowMount(RichSelectOption, {
        props: {
          option,
          deep,
        },
        global,
      });

      wrapper.vm.clickHandler();

      expect(toggleOption).toHaveBeenCalledWith(option);
    });
  });

  describe('regular option attributes', () => {
    it('has the correct `aria-selected` attribute when is selected', () => {
      optionIsSelected.mockReturnValue(true);

      const wrapper = shallowMount(RichSelectOption, {
        props: {
          option,
          deep,
        },
        global,
      });

      expect(wrapper.vm.$el.querySelector('button').getAttribute('aria-selected')).toBe('true');
    });

    it('has the correct `aria-selected` attribute when is not selected', () => {
      optionIsSelected.mockReturnValue(false);

      const wrapper = shallowMount(RichSelectOption, {
        props: {
          option,
          deep,
        },
        global,
      });

      expect(wrapper.vm.$el.querySelector('button').getAttribute('aria-selected')).toBe('false');
    });

    it('has the role=option attribute', () => {
      const wrapper = shallowMount(RichSelectOption, {
        props: {
          option,
          deep,
        },
        global,
      });

      expect(wrapper.vm.$el.querySelector('button').getAttribute('role')).toBe('option');
    });
    it('has the tabindex=-1 attribute', () => {
      const wrapper = shallowMount(RichSelectOption, {
        props: {
          option,
          deep,
        },
        global,
      });

      expect(wrapper.vm.$el.querySelector('button').getAttribute('tabindex')).toBe('-1');
    });

    it.each([1, 'foo', undefined, NaN])('adds a value attribute for regular values with %s', (value) => {
      const wrapper = shallowMount(RichSelectOption, {
        props: {
          option: {
            value,
            text: 'Foo',
          },
          deep,
        },
        global,
      });

      expect(wrapper.vm.$el.querySelector('button').getAttribute('value')).toBe(String(value));
    });

    it.each([{ foo: 'bar' }, [1, 2], null])('adds a value attribute for objects %s', (value) => {
      const wrapper = shallowMount(RichSelectOption, {
        props: {
          option: {
            value,
            text: 'Foo',
          },
          deep,
        },
        global,
      });

      expect(wrapper.vm.$el.querySelector('button').getAttribute('value')).toBe(JSON.stringify(value));
    });
  });

  describe('option has children', () => {
    const wrapper = shallowMount(RichSelectOption, {
      props: {
        option: {
          value: 'foo',
          text: 'Foo',
          children: [{ value: 1, text: 1 }],
        },
        deep: 0,
      },
      global,
    });

    it('has the role=optgroup attribute', () => {
      expect(wrapper.vm.$el.getAttribute('role')).toBe('optgroup');
    });

    it('has the option  text', () => {
      expect(wrapper.vm.$el.textContent).toBe('Foo');
    });

    it('shows the childrenOptions component', () => {
      expect(wrapper.vm.$refs.childrenOptions).toBeDefined();
    });
  });
});
