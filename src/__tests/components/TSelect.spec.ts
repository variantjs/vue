/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { shallowMount } from '@vue/test-utils';
import TSelect from '@/components/TSelect.vue';
import { TSelectTheme } from '@variantjs/core';

describe('TSelect.vue', () => {
  it('renders the select', () => {
    const wrapper = shallowMount(TSelect);
    expect(wrapper.get('select')).toBeTruthy();
  });

  it('renders the select with a default set of classes', () => {
    const wrapper = shallowMount(TSelect);

    expect(wrapper.html()).toBe(`<select class="${TSelectTheme.classes}"></select>`);
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
    const wrapper = shallowMount(TSelect, {
      props: {
        modelValue: value,
        options: ['A', 'B', 'C'],
      },
    });

    expect(wrapper.vm.$el.value).toBe(value);
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
