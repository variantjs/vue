import { shallowMount } from '@vue/test-utils';
import TToggle from '../../components/TToggle.vue';

describe('TToggle.vue', () => {
  it('renders the toggle component', () => {
    const wrapper = shallowMount(TToggle);
    expect(wrapper.get('button')).toBeTruthy();
  });

  it('assigns the uncheckedValue to the localValue', () => {
    const wrapper = shallowMount(TToggle, {
      props: {
        value: 'checked',
        uncheckedValue: 'unchecked',
      },
    });

    expect(wrapper.vm.localValue).toBe('unchecked');
  });

  it('assigns the checked to the localValue if has a checked prop', () => {
    const wrapper = shallowMount(TToggle, {
      props: {
        value: 'checked',
        uncheckedValue: 'unchecked',
        checked: true,
      },
    });

    expect(wrapper.vm.localValue).toBe('checked');
  });

  it('assigns the model value to localValue ', () => {
    const wrapper = shallowMount(TToggle, {
      props: {
        value: 'checked',
        uncheckedValue: 'unchecked',
        checked: true,
        modelValue: 'other',
      },
    });

    expect(wrapper.vm.localValue).toBe('other');
  });

  it('syncs the modelValue', async () => {
    const wrapper = shallowMount(TToggle, {
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.vm.localValue).toBe(true);

    await wrapper.setProps({
      modelValue: false,
    });

    expect(wrapper.vm.localValue).toBe(false);
  });

  it('syncs the checked prop', async () => {
    const wrapper = shallowMount(TToggle, {
      props: {
        checked: false,
        value: 'checked',
        uncheckedValue: 'unchecked',
      },
    });

    expect(wrapper.vm.localValue).toBe('unchecked');

    await wrapper.setProps({
      checked: true,
    });

    expect(wrapper.vm.localValue).toBe('checked');
  });

  it('syncs the checked prop', async () => {
    const wrapper = shallowMount(TToggle, {
      props: {
        checked: false,
        value: 'checked',
        uncheckedValue: 'unchecked',
      },
    });

    expect(wrapper.vm.localValue).toBe('unchecked');

    await wrapper.setProps({
      checked: true,
    });

    expect(wrapper.vm.localValue).toBe('checked');
  });

  it('adds the name property to the hidden input', () => {
    const wrapper = shallowMount(TToggle, {
      props: {
        name: 'my-toggle',
      },
    });

    expect(wrapper.find('input').attributes('name')).toBe('my-toggle');
  });

  it('assigns the value to the hidden input', async () => {
    const wrapper = shallowMount(TToggle, {
      props: {
        value: 'checked',
        uncheckedValue: 'unchecked',
      },
    });

    expect(wrapper.find('input').attributes('value')).toBe('unchecked');

    wrapper.vm.toggle();

    await wrapper.vm.$nextTick();

    expect(wrapper.find('input').attributes('value')).toBe('checked');
  });

  it('toggle the value when multiple', async () => {
    const wrapper = shallowMount(TToggle, {
      props: {
        modelValue: ['a', 'b'],
        value: 'c',
      },
    });

    wrapper.vm.toggle();

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.localValue).toEqual(['a', 'b', 'c']);

    wrapper.vm.toggle();

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.localValue).toEqual(['a', 'b']);
  });

  it('hides the hidden input when its an array and value is not selected', async () => {
    const wrapper = shallowMount(TToggle, {
      props: {
        modelValue: ['a', 'c'],
        value: 'b',
      },
    });

    // Not checked since its not part of the modelValue
    expect(wrapper.find('input').exists()).toBe(false);

    wrapper.vm.toggle();

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.localValue).toEqual(['a', 'c', 'b']);
    expect(wrapper.find('input').attributes('value')).toBe('b');
  });

  it('returns the classes for the wrapper and the button according to the state', async () => {
    const wrapper = shallowMount(TToggle, {
      props: {
        fixedClasses: undefined,
        classes: {
          wrapper: 'wrapper',
          button: 'button',
          wrapperChecked: 'wrapper-checked',
          buttonChecked: 'button-checked',
          wrapperDisabled: 'wrapper-disabled',
          wrapperCheckedDisabled: 'wrapper-checked-disabled',
        },
      },
    });

    expect(wrapper.vm.classes).toEqual({
      wrapper: 'wrapper',
      button: 'button',
    });

    await wrapper.setProps({
      checked: true,
    });

    expect(wrapper.vm.classes).toEqual({
      wrapper: 'wrapper-checked',
      button: 'button-checked',
    });

    await wrapper.setProps({
      checked: true,
      disabled: true,
    });

    expect(wrapper.vm.classes).toEqual({
      wrapper: 'wrapper-checked-disabled',
      button: 'button-checked',
    });

    await wrapper.setProps({
      checked: false,
      disabled: true,
    });

    expect(wrapper.vm.classes).toEqual({
      wrapper: 'wrapper-disabled',
      button: 'button',
    });
  });
});
