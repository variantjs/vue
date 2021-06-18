/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { shallowMount } from '@vue/test-utils';
import TInput from '@/components/TInput.vue';
import { TInputTheme } from '@variantjs/core';

describe('TInput.vue', () => {
  it('renders the input', () => {
    const wrapper = shallowMount(TInput);
    expect(wrapper.get('input')).toBeTruthy();
  });

  it('renders the input with a default set of classes', () => {
    const wrapper = shallowMount(TInput);

    expect(wrapper.html()).toBe(`<input class="${TInputTheme.classes}">`);
  });

  it('renders the input without attributes if no default theme', () => {
    const wrapper = shallowMount(TInput, {
      global: {
        provide: {
          configuration: {
            TInput: {
              classes: undefined,
            },
          },
        },
      },
    });

    expect(wrapper.html()).toBe('<input>');
  });

  it('set the props.value into the input value', () => {
    const value = 'input value';
    const wrapper = shallowMount(TInput, {
      props: { modelValue: value },
    });

    expect(wrapper.vm.$el.value).toBe(value);
  });

  it('doesnt add the modelValue as attribute', () => {
    const value = 'input value';
    const wrapper = shallowMount(TInput, {
      props: { modelValue: value },
    });

    expect(wrapper.vm.$el.attributes.modelValue).toBeUndefined();
  });

  it('disables the input', async () => {
    const wrapper = shallowMount(TInput, {
      props: { disabled: false },
    });
    expect(wrapper.vm.$el.disabled).toBe(false);

    await wrapper.setProps({ disabled: true });

    expect(wrapper.vm.$el.disabled).toBe(true);
  });

  it('has input attributes', async () => {
    const wrapper = shallowMount(TInput);

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
      value: {
        default: '',
        new: 'my value',
      },
      type: {
        default: 'text',
        new: 'email',
      },
    };

    const newProps: any = {};
    // Check for the default values
    Object.keys(values).forEach((key) => {
      const elementValue = (values as any)[key];
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.default);

      newProps[key as any] = elementValue.new;
    });

    await wrapper.setProps(newProps);

    // Check for the new values
    Object.keys(values).forEach((key) => {
      const elementValue = (values as any)[key];
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.new);
    });
  });

  it('set the model value', () => {
    const modelValue = 'original value';

    const wrapper = shallowMount(TInput, {
      props: {
        modelValue,
      },
    });

    expect(wrapper.vm.$el.value).toBe(modelValue);
  });

  it('emits an update event with the input value', () => {
    const modelValue = 'original value';

    const wrapper = shallowMount(TInput, {
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

    const wrapper = shallowMount(TInput, {
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
    const wrapper = shallowMount(TInput);

    const input = wrapper.vm.$el;

    expect(typeof input.click).toBe('function');
    expect(typeof input.select).toBe('function');
    expect(typeof input.setSelectionRange).toBe('function');
    expect(typeof input.setRangeText).toBe('function');
  });

  it('triggers custom events', async () => {
    const onCustom = jest.fn();

    const wrapper = shallowMount(TInput, {
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
