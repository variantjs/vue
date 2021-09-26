/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { shallowMount } from '@vue/test-utils';
import { TTextareaConfig } from '@variantjs/core';
import TTextarea from '@/components/TTextarea.vue';

describe('TTextarea.vue', () => {
  it('renders the textarea', () => {
    const wrapper = shallowMount(TTextarea);
    expect(wrapper.get('textarea')).toBeTruthy();
  });

  it('renders the textarea with a default set of classes', () => {
    const wrapper = shallowMount(TTextarea);

    expect(wrapper.html()).toBe(`<textarea class="${TTextareaConfig.classes}"></textarea>`);
  });

  it('adds the value attribute', () => {
    const wrapper = shallowMount(TTextarea,
      {
        global: {
          provide: {
            configuration: {
              TInput: {
                classes: undefined,
              },
            },
          },
        },
        attrs: {
          value: 'foo bar',
        },
      });

    expect(wrapper.vm.$el.value).toBe('foo bar');
  });

  it('renders the textarea without attributes if no default theme', () => {
    const wrapper = shallowMount(TTextarea, {
      global: {
        provide: {
          configuration: {
            TTextarea: {
              classes: undefined,
            },
          },
        },
      },
    });

    expect(wrapper.html()).toBe('<textarea></textarea>');
  });

  it('set the props.value into the textarea value', () => {
    const value = 'textarea value';
    const wrapper = shallowMount(TTextarea, {
      props: { modelValue: value, classes: undefined },
    });

    expect(wrapper.vm.$el.value).toBe(value);
  });

  it('doesnt add the modelValue as attribute', () => {
    const value = 'textarea value';
    const wrapper = shallowMount(TTextarea, {
      props: { modelValue: value },
    });

    expect(wrapper.vm.$el.attributes.modelValue).toBeUndefined();
  });

  it('disables the textarea', async () => {
    const wrapper = shallowMount(TTextarea, {
      props: { disabled: false },
    });
    expect(wrapper.vm.$el.disabled).toBe(false);

    await wrapper.setProps({ disabled: true });

    expect(wrapper.vm.$el.disabled).toBe(true);
  });

  it('accepts misc textarea attributes', async () => {
    const wrapper = shallowMount(TTextarea);

    const values = {
      id: {
        default: '',
        new: 'new-id',
      },
      rows: {
        default: 2,
        new: 4,
      },
      cols: {
        default: 20,
        new: 4,
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
      maxlength: {
        keyName: 'maxLength',
        default: 0,
        new: 12,
      },
      minlength: {
        keyName: 'minLength',
        default: 0,
        new: 2,
      },
      name: {
        default: '',
        new: 'new-name',
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

    const wrapper = shallowMount(TTextarea, {
      props: {
        modelValue,
      },
    });

    expect(wrapper.vm.$el.value).toBe(modelValue);
  });

  it('emits an update event with the textarea value', () => {
    const modelValue = 'original value';

    const wrapper = shallowMount(TTextarea, {
      props: {
        modelValue,
      },
    });

    const textareaValue = 'new value';

    wrapper.setValue(textareaValue);

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();

    // assert event count
    expect(wrapper.emitted('update:modelValue')?.length).toBe(1);

    // assert event payload
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([textareaValue]);
  });

  it('emits native textarea events', () => {
    const onChange = jest.fn();
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onKeyup = jest.fn();
    const onInput = jest.fn();

    const wrapper = shallowMount(TTextarea, {
      attrs: {
        onChange,
        onBlur,
        onFocus,
        onKeyup,
        onInput,
      },
    });

    const textarea = wrapper.vm.$el;

    textarea.dispatchEvent(new Event('change'));
    expect(onChange).toHaveBeenCalled();

    textarea.dispatchEvent(new FocusEvent('focus'));
    expect(onFocus).toHaveBeenCalled();

    textarea.dispatchEvent(new FocusEvent('blur'));
    expect(onBlur).toHaveBeenCalled();

    textarea.dispatchEvent(new InputEvent('input'));
    expect(onInput).toHaveBeenCalled();

    textarea.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    expect(onKeyup).toHaveBeenCalled();
  });

  it('has native textarea methods', () => {
    const wrapper = shallowMount(TTextarea);

    const textarea = wrapper.vm.$el;

    expect(typeof textarea.click).toBe('function');
    expect(typeof textarea.select).toBe('function');
    expect(typeof textarea.setSelectionRange).toBe('function');
    expect(typeof textarea.setRangeText).toBe('function');
  });

  it('triggers custom events', async () => {
    const onCustom = jest.fn();

    const wrapper = shallowMount(TTextarea, {
      attrs: {
        onCustom,
      },
    });
    const textarea = wrapper.vm.$el as HTMLTextAreaElement;

    const evt = new CustomEvent('custom', { detail: 'my-custom-event' });
    textarea.dispatchEvent(evt);

    expect(onCustom).toHaveBeenCalled();
  });
});
