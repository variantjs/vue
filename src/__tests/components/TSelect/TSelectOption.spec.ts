/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { mount, shallowMount } from '@vue/test-utils';
import { NormalizedOption } from '@variantjs/core';
import TSelectOption from '@/components/TSelect/TSelectOption.vue';

describe('TSelectOption.vue', () => {
  it('renders the option', () => {
    const option: NormalizedOption = {
      text: 'Hello World',
      value: 'hello',
    };
    const wrapper = shallowMount(TSelectOption, {
      props: {
        option,
      },
    });
    expect(wrapper.html()).toBe('<option value="hello">Hello World</option>');
  });
  it('renders an optgroup if has children elements', () => {
    const option: NormalizedOption = {
      text: 'Hello World',
      value: 'hello',
      children: [{
        text: 'Letter A', value: 'A',
      }],
    };
    const wrapper = mount(TSelectOption, {
      props: {
        option,
      },
    });

    const optGroup = wrapper.vm.$el;
    const options = optGroup.querySelectorAll(['option']);
    expect(optGroup.tagName).toBe('OPTGROUP');
    expect(options).toHaveLength(1);
    expect(options[0].value).toBe('A');
    expect((options[0] as HTMLOptionElement).text).toBe('Letter A');
  });

  it('disables optgroup ', () => {
    const option: NormalizedOption = {
      text: 'Hello World',
      value: 'hello',
      children: [{
        text: 'A', value: 'A',
      }],
      disabled: true,
    };
    const wrapper = shallowMount(TSelectOption, {
      props: {
        option,
      },
    });

    expect(wrapper.vm.$el.disabled).toBeTruthy();
  });

  it('disables the option', () => {
    const option: NormalizedOption = {
      text: 'Hello World',
      value: 'hello',
      disabled: true,
    };
    const wrapper = shallowMount(TSelectOption, {
      props: {
        option,
      },
    });
    expect(wrapper.html()).toBe('<option disabled="" value="hello">Hello World</option>');
  });

  it('disables the option with a `disabled` string', () => {
    const option: NormalizedOption = {
      text: 'Hello World',
      value: 'hello',
      disabled: 'disabled',
    };
    const wrapper = shallowMount(TSelectOption, {
      props: {
        option,
      },
    });

    expect(wrapper.html()).toBe('<option disabled="" value="hello">Hello World</option>');
  });
});
