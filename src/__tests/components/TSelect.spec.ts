/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { mount, shallowMount } from '@vue/test-utils';
import { TSelectConfig } from '@variantjs/core';
import TSelect from '@/components/TSelect.vue';

describe('TSelect.vue', () => {
  it('renders the select', () => {
    const wrapper = shallowMount(TSelect);
    expect(wrapper.get('select')).toBeTruthy();
  });

  it('renders the select with a default set of classes', () => {
    const wrapper = shallowMount(TSelect);

    expect(wrapper.html()).toBe(`<select class="${TSelectConfig.classes}"></select>`);
  });

  it('renders the select without attributes if no default theme', () => {
    const wrapper = shallowMount(TSelect, {
      global: {
        provide: {
          configuration: {
            TSelect: {
              classes: undefined,
            },
          },
        },
      },
    });

    expect(wrapper.html()).toBe('<select></select>');
  });

  it('selects the props.value', () => {
    const value = 'B';
    const wrapper = mount(TSelect, {
      props: {
        modelValue: value,
        options: ['A', 'B', 'C'],
      },
    });

    expect(wrapper.vm.localValue).toBe(value);
    expect(wrapper.vm.$el.value).toEqual(value);
  });

  it('doesnt add the modelValue as attribute', () => {
    const value = 'B';
    const wrapper = shallowMount(TSelect, {
      props: { modelValue: value, options: ['A', 'B', 'C'] },

    });

    expect(wrapper.vm.$el.attributes.modelValue).toBeUndefined();
  });

  it('adds the multiple attribute', async () => {
    const wrapper = shallowMount(TSelect, {
      props: { multiple: false },
    });
    expect(wrapper.vm.$el.multiple).toBe(false);

    await wrapper.setProps({ multiple: true });

    expect(wrapper.vm.$el.multiple).toBe(true);
  });

  it('handles multiptions', async () => {
    const value = ['B', 'C'];
    const wrapper = mount(TSelect, {
      props: {
        modelValue: value,
        multiple: true,
        options: ['A', 'B', 'C'],
      },
    });

    const select = wrapper.vm.$el;

    expect(wrapper.vm.localValue).toEqual(value);

    const values = Array
      .from(select.querySelectorAll('option:checked'))
      .map((el) => (el as HTMLOptionElement).value);

    expect(values).toEqual(value);

    const newValue = ['A', 'C'];

    // await wrapper.setValue(newValue, 'modelValue');
    await wrapper.setProps({
      modelValue: newValue,
    });

    expect(wrapper.vm.localValue).toEqual(newValue);

    const newValues = Array
      .from(select.querySelectorAll('option:checked'))
      .map((el) => (el as HTMLOptionElement).value);

    expect(newValues).toEqual(newValue);
  });

  it('assigns undefined as default', () => {
    const wrapper = shallowMount(TSelect);

    expect(wrapper.vm.localValue).toBeUndefined();
  });

  it('assigns an array as default to multiptions', () => {
    const wrapper = shallowMount(TSelect, {
      props: {
        multiple: true,
      },
    });

    expect(wrapper.vm.localValue).toEqual([]);
  });

  it('disables the select', async () => {
    const wrapper = shallowMount(TSelect, {
      props: { disabled: false },
    });
    expect(wrapper.vm.$el.disabled).toBe(false);

    await wrapper.setProps({ disabled: true });

    expect(wrapper.vm.$el.disabled).toBe(true);
  });

  it('accepts different attributes', async () => {
    const wrapper = shallowMount(TSelect);

    const values = {
      id: {
        default: '',
        new: 'new-id',
      },
      autofocus: {
        default: false,
        new: true,
      },
      disabled: {
        default: false,
        new: true,
      },
      name: {
        default: '',
        new: 'new-name',
      },
      required: {
        default: false,
        new: true,
      },
    };

    const select = wrapper.vm.$el;

    const newProps: any = {};
    // Check for the default values
    Object.keys(values).forEach((key) => {
      const elementValue = (values as any)[key];
      expect(select[elementValue.keyName || key]).toBe(elementValue.default);

      newProps[key as any] = elementValue.new;
    });

    await wrapper.setProps(newProps);

    // Check for the new values
    Object.keys(values).forEach((key) => {
      const elementValue = (values as any)[key];
      expect(select[elementValue.keyName || key]).toBe(elementValue.new);
    });
  });

  it('emits an update event with the select value', () => {
    const modelValue = 'A';

    const wrapper = shallowMount(TSelect, {
      props: {
        modelValue,
        options: ['A', 'B'],
      },
    });

    const inputValue = 'B';

    wrapper.setValue(inputValue);

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('update:modelValue')?.length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([inputValue]);
  });

  it('emits native select events', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onInput = jest.fn();

    const wrapper = shallowMount(TSelect, {
      attrs: {
        onChange,
        onBlur,
        onFocus,
        onInput,
      },
    });

    const input = wrapper.vm.$el;

    input.dispatchEvent(new Event('change'));
    expect(onChange).toHaveBeenCalled();

    input.dispatchEvent(new FocusEvent('focus'));
    expect(onFocus).toHaveBeenCalled();

    input.dispatchEvent(new FocusEvent('blur'));
    expect(onBlur).toHaveBeenCalled();

    input.dispatchEvent(new InputEvent('input'));
    expect(onInput).toHaveBeenCalled();
  });

  it('has native select methods', () => {
    const wrapper = shallowMount(TSelect);

    const select = wrapper.vm.$el;

    expect(typeof select.click).toBe('function');
    expect(typeof select.focus).toBe('function');
  });

  it('triggers custom events', async () => {
    const onCustom = jest.fn();

    const wrapper = shallowMount(TSelect, {
      attrs: {
        onCustom,
      },
    });
    const select = wrapper.vm.$el as HTMLSelectElement;

    const evt = new CustomEvent('custom', { detail: 'my-custom-event' });
    select.dispatchEvent(evt);

    expect(onCustom).toHaveBeenCalled();
  });
});
