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

  it('disables the input', async () => {
    const wrapper = shallowMount(TInput, {
      props: { disabled: false },
    });
    expect(wrapper.vm.$el.disabled).toBe(false);

    wrapper.setProps({ disabled: true });
    await wrapper.vm.$nextTick();
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

    wrapper.setProps(newProps);

    await wrapper.vm.$nextTick();

    // Check for the new values
    Object.keys(values).forEach((key) => {
      const elementValue = (values as any)[key];
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.new);
    });
  });
});
