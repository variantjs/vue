/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  mount, VueWrapper,
} from '@vue/test-utils';
import TDropdown from '@/components/TDropdown.vue';
import { TDropdownConfig } from '@variantjs/core';
import { h } from 'vue';

const dropdownIsReady: (wrapper: VueWrapper<any>) => Promise<void> = (wrapper: VueWrapper<any>) => new Promise((resolve) => {
  // 1. Until component is mounted
  wrapper.vm.$nextTick().then(() => {
    // 2. Popper is adjusted
    wrapper.vm.$nextTick().then(() => {
      // 4. dom update for running popper
      wrapper.vm.$nextTick().then(() => {
        // 4. dom update after popperIsAdjusted is set to `true`
        wrapper.vm.$nextTick().then(() => resolve());
      });
    });
  });
});

describe('TDropdown.vue', () => {
  it('renders the component', () => {
    const wrapper = mount(TDropdown);

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button').isVisible()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('div').element.style.visibility).toBe('hidden');
    expect(wrapper.vm.$refs.trigger).toBeTruthy();
    expect(wrapper.vm.$refs.dropdown).toBeTruthy();
  });

  it('has default classes', () => {
    const wrapper = mount(TDropdown);
    const { trigger, dropdown } = wrapper.vm.$refs;

    expect(trigger.className).toBe(TDropdownConfig.classes.trigger);
    expect(dropdown.className).toBe(TDropdownConfig.classes.dropdown);
    expect(wrapper.vm.configuration.classesList).toEqual(TDropdownConfig.classes);
  });

  it('initializes the  dropdown', async () => {
    const wrapper = mount(TDropdown);

    const { dropdown } = wrapper.vm.$refs;

    expect(wrapper.vm.shown).toBe(false);
    expect(wrapper.vm.popperIsAdjusted).toBe(false);
    expect(dropdown.style.visibility).toBe('hidden');

    await dropdownIsReady(wrapper);

    expect(wrapper.vm.popperIsAdjusted).toBe(true);
    expect(wrapper.vm.shown).toBe(false);
  });

  it('uses the content of the trigger slot inside the trigger button', () => {
    const wrapper = mount(TDropdown, {
      slots: {
        trigger: 'Press me!',
      },
    });
    expect(wrapper.find('button').text()).toBe('Press me!');
  });

  it('uses the content of the text prop inside the trigger button', () => {
    const wrapper = mount(TDropdown, {
      props: {
        text: 'Press me!',
      },
    });

    expect(wrapper.find('button').text()).toBe('Press me!');
  });

  it('prioritizes the slot over the text prop', () => {
    const wrapper = mount(TDropdown, {
      props: {
        text: 'Press me2!',
      },
      slots: {
        trigger: 'Press me!',
      },
    });

    expect(wrapper.find('button').text()).toBe('Press me!');
  });

  it('uses the content of the default slot inside the dropdown', () => {
    const wrapper = mount(TDropdown, {
      slots: {
        default: 'Dropdown stuffy',
      },
    });

    const { dropdown } = wrapper.vm.$refs;
    expect(dropdown.innerHTML).toBe('Dropdown stuffy');
  });

  it('shows the dropdown when the trigger is pressed', async () => {
    const wrapper = mount(TDropdown);

    const trigger = wrapper.get('button');
    const { dropdown } = wrapper.vm.$refs;

    await dropdownIsReady(wrapper);

    expect(dropdown.style.display).toBe('none');

    await trigger.trigger('click');

    expect(wrapper.vm.shown).toBe(true);

    expect(dropdown.style.display).toBe('');
  });

  it('hides the dropdown when the trigger is pressed two times', async () => {
    const wrapper = mount(TDropdown);

    const trigger = wrapper.get('button');
    const { dropdown } = wrapper.vm.$refs;

    await dropdownIsReady(wrapper);

    expect(dropdown.style.display).toBe('none');

    await trigger.trigger('click');

    expect(wrapper.vm.shown).toBe(true);

    expect(dropdown.style.display).toBe('');

    await trigger.trigger('click');

    expect(wrapper.vm.shown).toBe(false);

    expect(dropdown.style.display).toBe('none');
  });

  it('doesnt teleports the dropdown by default', () => {
    const wrapper = mount(TDropdown);

    expect(wrapper.find('div').exists()).toBe(true);
  });

  it('teleports the dropdown to the body if teleport option is set', () => {
    mount(TDropdown, {
      props: {
        teleport: true,
      },
      slots: {
        default: 'The body',
      },
    });

    expect(document.body.children[0].textContent).toBe('The body');
  });

  it('teleports the dropdown to the selector in the teleportTo prop', () => {
    const div = document.createElement('div');
    div.id = 'teleport-here';

    document.body.appendChild(div);

    mount(TDropdown, {
      props: {
        teleport: true,
        teleportTo: '#teleport-here',
      },
      slots: {
        default: 'The body',
      },
    });

    expect(document.querySelector('#teleport-here')!.textContent).toBe('The body');
  });

  it('teleports the dropdown to the element in the teleportTo prop', () => {
    const div = document.createElement('div');
    div.id = 'dont-teleport-here';

    document.body.appendChild(div);

    mount(TDropdown, {
      props: {
        teleport: true,
        teleportTo: div,
      },
      slots: {
        default: 'The body',
      },
    });

    expect(document.querySelector('#teleport-here')!.textContent).toBe('The body');
  });

  it('the trigger is a button with type `button`', async () => {
    const wrapper = mount(TDropdown);

    const trigger = wrapper.get('button');

    expect(trigger.attributes().type).toBe('button');
    expect(trigger.element.tagName).toBe('BUTTON');
  });

  it('disables the dropdown', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        disabled: true,
      },
    });

    const trigger = wrapper.get('button');
    const { dropdown } = wrapper.vm.$refs;

    await dropdownIsReady(wrapper);

    expect(trigger.attributes().disabled).toBeDefined();

    await trigger.trigger('click');

    expect(wrapper.vm.shown).toBe(false);

    expect(dropdown.style.display).toBe('none');
  });

  it('applies the dropdownAttributes to the dropdown', () => {
    const wrapper = mount(TDropdown, {
      props: {
        dropdownAttributes: {
          id: 'my-id',
          'data-foo': 'bar',
        },
      },
    });

    const { dropdown } = wrapper.vm.$refs;

    expect(dropdown.getAttribute('id')).toBe('my-id');
    expect(dropdown.getAttribute('data-foo')).toBe('bar');
  });

  it('applies the attributes to the trigger button', () => {
    const wrapper = mount(TDropdown, {
      attrs: {
        id: 'my-id',
        'data-foo': 'bar',
      },
    });

    const trigger = wrapper.get('button');

    expect(trigger.attributes().id).toBe('my-id');
    expect(trigger.attributes()['data-foo']).toBe('bar');
  });

  it('applies the attributes that comes from the configuration the trigger button', () => {
    const wrapper = mount(TDropdown, {
      global: {
        provide: {
          configuration: {
            TDropdown: {
              id: 'my-id',
              'data-foo': 'bar',
            },
          },
        },
      },
    });

    const trigger = wrapper.get('button');

    expect(trigger.attributes().id).toBe('my-id');
    expect(trigger.attributes()['data-foo']).toBe('bar');
  });

  it('prioritizes the local attributes', () => {
    const wrapper = mount(TDropdown, {
      global: {
        provide: {
          configuration: {
            TDropdown: {
              id: 'my-id',
            },
          },
        },
      },
      attrs: {
        id: 'my-local-id',
      },
    });

    const trigger = wrapper.get('button');

    expect(trigger.attributes().id).toBe('my-local-id');
  });

  it('uses the set tagName ', () => {
    const wrapper = mount(TDropdown, {
      props: {
        tagName: 'a',
      },
    });

    const { trigger } = wrapper.vm.$refs;

    expect(trigger.tagName).toBe('A');
  });

  it('uses the set dropdownTagName ', () => {
    const wrapper = mount(TDropdown, {
      props: {
        dropdownTagName: 'ul',
      },
    });

    const { dropdown } = wrapper.vm.$refs;

    expect(dropdown.tagName).toBe('UL');
  });

  it('doesnt toggle the dropdown on click if toggleOnClick is set to `false`', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        toggleOnClick: false,
      },
    });

    const trigger = wrapper.get('button');

    await dropdownIsReady(wrapper);

    await trigger.trigger('click');

    expect(wrapper.vm.shown).toBe(false);

    await trigger.trigger('click');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('doesnt toggle the dropdown on focus  by default', async () => {
    const wrapper = mount(TDropdown);

    const trigger = wrapper.get('button');

    await dropdownIsReady(wrapper);

    await trigger.trigger('focus');

    expect(wrapper.vm.shown).toBe(false);

    await trigger.trigger('blur');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('toggles the dropdown on focus if option is set', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        toggleOnFocus: true,
      },
    });

    const trigger = wrapper.get('button');

    await dropdownIsReady(wrapper);

    await trigger.trigger('focus');

    expect(wrapper.vm.shown).toBe(true);

    await trigger.trigger('blur');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('doesnt hides the dropdown if blur in the the dropdown', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnFocus: true,
      },
    });

    const triggerButton = wrapper.get('button');

    const { dropdown } = wrapper.vm.$refs;

    await dropdownIsReady(wrapper);

    await triggerButton.trigger('blur', {
      relatedTarget: dropdown,
    });

    expect(wrapper.vm.shown).toBe(true);
  });

  it('doesnt hides the dropdown if blur in the the trigger', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnFocus: true,
      },
    });

    const triggerButton = wrapper.get('button');

    const { trigger } = wrapper.vm.$refs;

    await dropdownIsReady(wrapper);

    await triggerButton.trigger('blur', {
      relatedTarget: trigger,
    });

    expect(wrapper.vm.shown).toBe(true);
  });

  it('doesnt hides the dropdown if blur in an element inside the dropdown', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnFocus: true,
      },
      slots: {
        default: h('button', 'focus me'),
      },
    });

    const triggerButton = wrapper.get('button');

    const { dropdown } = wrapper.vm.$refs;
    const button = dropdown.querySelector('button');

    await dropdownIsReady(wrapper);

    await triggerButton.trigger('blur', {
      relatedTarget: button,
    });

    expect(wrapper.vm.shown).toBe(true);
  });

  it('hides the dropdown on dropdown blur', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnFocus: true,
      },
    });

    const trigger = wrapper.get('button');

    await dropdownIsReady(wrapper);

    await trigger.trigger('blur');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('doesnt toggle the dropdown on hover by default', async () => {
    const wrapper = mount(TDropdown);

    const trigger = wrapper.get('button');

    await dropdownIsReady(wrapper);

    await trigger.trigger('hover');

    expect(wrapper.vm.shown).toBe(false);

    await trigger.trigger('blur');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('toggles the dropdown on hover if option is set', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        toggleOnHover: true,
      },
    });

    const trigger = wrapper.get('button');

    await dropdownIsReady(wrapper);

    await trigger.trigger('mouseover');

    expect(wrapper.vm.shown).toBe(true);

    await trigger.trigger('mouseleave');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('hides the dropdown if mouseleave the dropdown', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnHover: true,
      },
    });

    const dropdown = wrapper.get('div');

    await dropdownIsReady(wrapper);

    await dropdown.trigger('mouseleave');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('doesnt hides the dropdown if mouseleave the dropdown', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnHover: true,
      },
    });

    const triggerButton = wrapper.get('button');

    const { dropdown } = wrapper.vm.$refs;

    await dropdownIsReady(wrapper);

    await triggerButton.trigger('mouseleave', {
      relatedTarget: dropdown,
    });

    expect(wrapper.vm.shown).toBe(true);
  });

  it('doesnt hides the dropdown if mouseleave the trigger', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnHover: true,
      },
    });

    const triggerButton = wrapper.get('button');

    const { trigger } = wrapper.vm.$refs;

    await dropdownIsReady(wrapper);

    await triggerButton.trigger('mouseleave', {
      relatedTarget: trigger,
    });

    expect(wrapper.vm.shown).toBe(true);
  });

  it('emits native button events', () => {
    const onClick = jest.fn();
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onKeyup = jest.fn();

    const wrapper = mount(TDropdown, {
      attrs: {
        onClick,
        onBlur,
        onFocus,
        onKeyup,
      },
    });

    const { trigger } = wrapper.vm.$refs;

    trigger.dispatchEvent(new MouseEvent('click'));
    expect(onClick).toHaveBeenCalled();

    trigger.dispatchEvent(new FocusEvent('focus'));
    expect(onFocus).toHaveBeenCalled();

    trigger.dispatchEvent(new FocusEvent('blur'));
    expect(onBlur).toHaveBeenCalled();

    trigger.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    expect(onKeyup).toHaveBeenCalled();
  });

  it('triggers custom events', async () => {
    const onCustom = jest.fn();

    const wrapper = mount(TDropdown, {
      attrs: {
        onCustom,
      },
    });
    const { trigger } = wrapper.vm.$refs;

    const evt = new CustomEvent('custom', { detail: 'my-custom-event' });
    trigger.dispatchEvent(evt);

    expect(onCustom).toHaveBeenCalled();
  });

  it('display the dropdown if `show` prop is set ', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
      },
    });

    const { dropdown } = wrapper.vm.$refs;

    await dropdownIsReady(wrapper);

    expect(wrapper.vm.shown).toBe(true);
    expect(wrapper.vm.popperIsAdjusted).toBe(true);

    expect(dropdown.style.display).toBe('');
  });

  it('emits `update:show` when show property is updated', async () => {
    const wrapper = mount(TDropdown);

    const trigger = wrapper.get('button');

    await dropdownIsReady(wrapper);

    await trigger.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:show', [[true]]);

    await trigger.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('update:show', [[true], [false]]);
  });

  it('shows the modal if the `show` props changes', async () => {
    const wrapper = mount(TDropdown);

    await dropdownIsReady(wrapper);

    await wrapper.setProps({
      show: true,
    });

    expect(wrapper.vm.shown).toBe(true);
  });

  it('hides the modal if the `show` props changes', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
      },
    });

    await dropdownIsReady(wrapper);

    await wrapper.setProps({
      show: false,
    });

    expect(wrapper.vm.shown).toBe(false);
  });

  // it('doesnt hides outsid ', async () => {
  //   const wrapper = mount(TDropdown, {
  //     props: {
  //       show: true,
  //     },
  //   });

  //   const { dropdown } = wrapper.vm.$refs;

  //   await dropdownIsReady(wrapper);

  //   expect(wrapper.vm.shown).toBe(true);

  //   expect(dropdown.style.display).toBe('');
  // });
});
