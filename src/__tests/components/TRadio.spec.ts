/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { shallowMount } from '@vue/test-utils';
import TRadio from '@/components/TRadio.vue';
import { TRadioConfig } from '@variantjs/core';

describe('TRadio.vue', () => {
  it('renders the input', () => {
    const wrapper = shallowMount(TRadio);
    expect(wrapper.get('input')).toBeTruthy();
  });

  it('renders the radio input with a default set of classes', () => {
    const wrapper = shallowMount(TRadio);

    expect(wrapper.html()).toBe(`<input type="radio" class="${TRadioConfig.classes}">`);
  });

  it('renders the input without attributes if no default theme', () => {
    const wrapper = shallowMount(TRadio, {
      global: {
        provide: {
          configuration: {
            TRadio: {
              classes: undefined,
            },
          },
        },
      },
    });

    expect(wrapper.html()).toBe('<input type="radio">');
  });

  it('adds the value attribute', () => {
    const value = 'input value';
    const wrapper = shallowMount(TRadio, {
      attrs: { value },
    });

    expect(wrapper.vm.$el.value).toBe(value);
  });

  it('doesnt add the modelValue as attribute', () => {
    const value = 'input value';
    const wrapper = shallowMount(TRadio, {
      props: { modelValue: value },
      attrs: { value },
    });

    expect(wrapper.vm.$el.attributes.modelValue).toBeUndefined();
  });

  it('set as checked if model value is same as value', async () => {
    const value = 'input value';
    const wrapper = shallowMount(TRadio, {
      props: { modelValue: 'something else' },
      attrs: { value },
    });

    const radio = wrapper.vm.$el as HTMLInputElement;
    expect(radio.value).toBe(value);
    expect(radio.checked).toBe(false);

    await wrapper.setProps({
      modelValue: value,
    });

    expect(radio.value).toBe(value);
    expect(radio.checked).toBe(true);
  });

  it('disables the input', async () => {
    const wrapper = shallowMount(TRadio, {
      props: { disabled: false },
    });
    expect(wrapper.vm.$el.disabled).toBe(false);

    await wrapper.setProps({ disabled: true });

    expect(wrapper.vm.$el.disabled).toBe(true);
  });

  it('accepts misc input attributes', async () => {
    const wrapper = shallowMount(TRadio);

    const values = {
      id: {
        default: '',
        new: 'new-id',
      },
      autocomplete: {
        default: '',
        new: 'on',
      },
      autofocus: {
        default: false,
        new: true,
      },
      disabled: {
        default: false,
        new: true,
      },
      max: {
        default: '',
        new: '10',
      },
      maxlength: {
        keyName: 'maxLength',
        default: 524288,
        new: 12,
      },
      minlength: {
        keyName: 'minLength',
        default: 0,
        new: 2,
      },
      min: {
        default: '',
        new: '3',
      },
      multiple: {
        default: false,
        new: true,
      },
      name: {
        default: '',
        new: 'new-name',
      },
      pattern: {
        default: '',
        new: '[A-Za-z]{3}',
      },
      placeholder: {
        default: '',
        new: 'new placeholder',
      },
      readonly: {
        keyName: 'readOnly',
        default: false,
        new: true,
      },
      required: {
        default: false,
        new: true,
      },
    };

    const netProps: any = {};
    // Check for the default values
    Object.keys(values).forEach((key) => {
      const elementValue = (values as any)[key];
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.default);

      netProps[key as any] = elementValue.new;
    });

    await wrapper.setProps(netProps);

    // Check for the new values
    Object.keys(values).forEach((key) => {
      const elementValue = (values as any)[key];
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.new);
    });
  });

  it('emits an update event with the input value', () => {
    const modelValue = 'original value';

    const wrapper = shallowMount(TRadio, {
      props: {
        modelValue,
      },
    });

    const inputValue = 'new value';

    wrapper.setValue(inputValue);

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('update:modelValue')?.length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([inputValue]);
  });

  it('emits native input events', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onKeyup = jest.fn();
    const onInput = jest.fn();

    const wrapper = shallowMount(TRadio, {
      attrs: {
        onChange,
        onBlur,
        onFocus,
        onKeyup,
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

    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    expect(onKeyup).toHaveBeenCalled();
  });

  it('has native input methods', () => {
    const wrapper = shallowMount(TRadio);

    const input = wrapper.vm.$el;

    expect(typeof input.click).toBe('function');
    expect(typeof input.focus).toBe('function');
  });

  it('triggers custom events', async () => {
    const onCustom = jest.fn();

    const wrapper = shallowMount(TRadio, {
      attrs: {
        onCustom,
      },
    });
    const input = wrapper.vm.$el as HTMLInputElement;

    const evt = new CustomEvent('custom', { detail: 'my-custom-event' });
    input.dispatchEvent(evt);

    expect(onCustom).toHaveBeenCalled();
  });
});
