import { NormalizedOption } from '@variantjs/core';
import { shallowMount } from '@vue/test-utils';
import { ref } from 'vue';
import RichSelectOption from '../../../components/TRichSelect/RichSelectOption.vue';

describe('RichSelectOption', () => {
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

  it('will scroll into the view if shown and is active', async () => {
    const scrollIntoViewMock = jest.fn();

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

  it('will not scroll into the view if shown but is not active', async () => {
    const scrollIntoViewMock = jest.fn();

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
    const scrollIntoViewMock = jest.fn();

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
});
