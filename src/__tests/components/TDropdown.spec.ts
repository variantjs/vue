/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { mount, VueWrapper } from '@vue/test-utils';
import { TDropdownConfig, TDropdownPopperDefaultOptions } from '@variantjs/core';
import { h } from 'vue';
import TDropdown from '@/components/TDropdown.vue';
import { scopedParamsAsString, parseScopedParams } from '../testUtils';

describe('TDropdown.vue', () => {
  let updatePopperMock: jest.Mock<any, any>;
  const originalUpdatePopperMethod = TDropdown.methods!.updatePopper;

  beforeEach(() => {
    updatePopperMock = jest.fn().mockReturnValue(Promise.resolve());

    TDropdown.methods!.updatePopper = updatePopperMock;
  });

  afterEach(() => {
    updatePopperMock.mockRestore();
    TDropdown.methods!.updatePopper = originalUpdatePopperMethod;
  });

  it('renders the component', () => {
    const wrapper = mount(TDropdown);

    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('button').isVisible()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
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

  it('initializes the dropdown', async () => {
    const wrapper = mount(TDropdown);

    expect(wrapper.vm.shown).toBe(false);
    expect(wrapper.vm.popperIsAdjusted).toBe(false);
    expect(wrapper.vm.popper).toBe(null);
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

  it('exposes the `isShow` variable and the configuration ', () => {
    const wrapper = mount(TDropdown, {
      slots: {
        trigger: (params) => scopedParamsAsString(params),
      },
    });

    const scopeParamKeys = parseScopedParams(wrapper.text());

    expect(scopeParamKeys).toEqual({
      isShow: 'boolean',
      configuration: 'object',
      popper: 'object',
    });
  });

  it('exposes the `toggle`, `show` and `hide` methods and the configuration to the dropdown slot ', () => {
    const wrapper = mount(TDropdown, {
      slots: {
        default: (params) => scopedParamsAsString(params),
      },
    });

    const scopeParamKeys = parseScopedParams(wrapper.text());

    expect(scopeParamKeys).toEqual({
      show: 'function',
      hide: 'function',
      toggle: 'function',
      configuration: 'object',
      popper: 'object',
    });
  });

  it('renders an empty button if no slot or text', () => {
    const wrapper = mount(TDropdown);

    expect(wrapper.find('button').text()).toBe('');
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
    const wrapper = mount(TDropdown, {
      props: {
        toggleOnClick: true,
        toggleOnFocus: false,
      },
    });

    const trigger = wrapper.get('button');

    await trigger.trigger('click');

    expect(wrapper.vm.shown).toBe(true);
  });

  it('hides the dropdown when the trigger is pressed and is openede ', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        toggleOnClick: true,
        show: true,
      },
    });

    const trigger = wrapper.get('button');

    await trigger.trigger('click');

    expect(wrapper.vm.shown).toBe(false);
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

    await trigger.trigger('click');

    expect(wrapper.vm.shown).toBe(false);

    await trigger.trigger('click');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('shows the dropdown on click by default', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        // To avoid false positives
        toggleOnFocus: false,
      },
    });

    const trigger = wrapper.get('button');

    await trigger.trigger('click');

    expect(wrapper.vm.shown).toBe(true);
  });

  it('hides the dropdown on click by default', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        // To avoid false positives
        toggleOnFocus: false,
        show: true,
      },
    });

    const trigger = wrapper.get('button');

    await trigger.trigger('click');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('shows the dropdown on focus by default', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        // To avoid false positives
        toggleOnClick: false,
      },
    });

    const trigger = wrapper.get('button');

    await trigger.trigger('focus');

    expect(wrapper.vm.shown).toBe(true);
  });

  it('doesnt hide the dropdown when focus when doesnt have the `toggleOnFocus` options', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnFocus: false,
      },
    });

    const trigger = wrapper.get('button');

    await trigger.trigger('focus');

    expect(wrapper.vm.shown).toBe(true);
  });

  it('hides the dropdown on blur by default', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        // To avoid false positives
        toggleOnClick: false,
      },
    });

    const trigger = wrapper.get('button');

    await trigger.trigger('blur');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('doesnt shows the dropdown on hover by default', async () => {
    const wrapper = mount(TDropdown);

    const trigger = wrapper.get('button');

    await trigger.trigger('hover');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('doesnt hides the drodown on hoverout by default', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
      },
    });

    const trigger = wrapper.get('button');

    await trigger.trigger('hover');

    expect(wrapper.vm.shown).toBe(true);
  });

  it('toggles the dropdown on focus if option is set', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        toggleOnFocus: true,
      },
    });

    const trigger = wrapper.get('button');

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

    await triggerButton.trigger('blur', {
      relatedTarget: dropdown,
    });

    expect(wrapper.vm.shown).toBe(true);
  });

  it('adds and remove blur listener to focusable elements inside the dropdown when shown', async () => {
    const addEventListenerMock = jest.fn();
    const removeEventListenerMock = jest.fn();
    window.HTMLInputElement.prototype.addEventListener = addEventListenerMock;
    window.HTMLInputElement.prototype.removeEventListener = removeEventListenerMock;
    const wrapper = mount(TDropdown, {
      slots: {
        default: h('input'),
      },
    });

    wrapper.vm.doShow();

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(addEventListenerMock).toHaveBeenCalled();

    wrapper.vm.doHide();

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(removeEventListenerMock).toHaveBeenCalled();
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

    await triggerButton.trigger('blur', {
      relatedTarget: button,
    });

    expect(wrapper.vm.shown).toBe(true);
  });

  it('hides the dropdown on trigger blur', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnFocus: true,
      },
    });

    const trigger = wrapper.get('button');

    await trigger.trigger('blur');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('hides the dropdown on dropdown blur', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnFocus: true,
      },
    });

    const dropdown = wrapper.get('div');

    await dropdown.trigger('blur');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('hides the dropdown if blur on an element that is not a child', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnFocus: true,
      },
      slots: {
        default: h('button', {}, 'blur me'),
      },
    });

    const button = wrapper.find('button') as any;

    button.trigger('blur');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('removes the child element blur handler if toggleOnFocus changes', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnFocus: true,
      },
      slots: {
        default: h('button', {}, 'blur me'),
      },
    });

    wrapper.setProps({
      toggleOnFocus: false,
    });

    const { dropdown } = wrapper.vm.$refs;

    const button = dropdown.querySelector('button') as HTMLButtonElement;

    button.dispatchEvent(new FocusEvent('blur'));

    expect(wrapper.vm.shown).toBe(true);
    expect(wrapper.vm.focusableElements).toEqual([]);
  });

  it('doesnt toggle the dropdown on hover by default', async () => {
    const wrapper = mount(TDropdown);

    const trigger = wrapper.get('button');

    await trigger.trigger('hover');

    expect(wrapper.vm.shown).toBe(false);

    await trigger.trigger('blur');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('toggles the dropdown on hover immediatly if option is set', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        toggleOnHover: true,
        hideOnLeaveTimeout: null,
      },
    });

    const trigger = wrapper.get('button');

    await trigger.trigger('mouseover');

    expect(wrapper.vm.shown).toBe(true);

    await trigger.trigger('mouseleave');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('doesnt toggles the dropdown on hover if option is not set', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        toggleOnHover: false,
        hideOnLeaveTimeout: null,
      },
    });

    const trigger = wrapper.get('button');

    await trigger.trigger('mouseover');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('hides the dropdown if mouseleave the dropdown', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnHover: true,
        hideOnLeaveTimeout: null,
      },
    });

    const dropdown = wrapper.get('div');

    await dropdown.trigger('mouseleave');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('hides the dropdown after the timeout', async () => {
    jest.useFakeTimers();

    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnHover: true,
        hideOnLeaveTimeout: 500,
      },
    });

    const dropdown = wrapper.get('div');

    await dropdown.trigger('mouseleave');

    expect(wrapper.vm.shown).toBe(true);

    jest.advanceTimersByTime(499);

    expect(wrapper.vm.shown).toBe(true);

    jest.advanceTimersByTime(1);

    expect(wrapper.vm.shown).toBe(false);

    jest.useRealTimers();
  });

  it('clears the hidetimeout if something receives mouseover ', async () => {
    jest.useFakeTimers();

    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnHover: true,
        hideOnLeaveTimeout: 500,
      },
    });

    const button = wrapper.get('button');
    const dropdown = wrapper.get('div');

    await dropdown.trigger('mouseleave');

    expect(wrapper.vm.shown).toBe(true);

    jest.advanceTimersByTime(499);

    await button.trigger('mouseover');

    expect(wrapper.vm.shown).toBe(true);

    jest.advanceTimersByTime(500);

    expect(wrapper.vm.shown).toBe(true);

    jest.useRealTimers();
  });

  it('doesnt hides the dropdown if mouseleave the dropdown', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        show: true,
        toggleOnHover: true,
        hideOnLeaveTimeout: null,
      },
    });

    const triggerButton = wrapper.get('button');

    const { dropdown } = wrapper.vm.$refs;

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
        hideOnLeaveTimeout: null,
      },
    });

    const triggerButton = wrapper.get('button');

    const { trigger } = wrapper.vm.$refs;

    await triggerButton.trigger('mouseleave', {
      relatedTarget: trigger,
    });

    expect(wrapper.vm.shown).toBe(true);
  });

  it('has a focus method that focus the trigger', async () => {
    const wrapper = mount(TDropdown);
    const { trigger } = wrapper.vm.$refs;

    const focusMock = jest.fn();
    trigger.focus = focusMock;

    wrapper.vm.focus();

    expect(focusMock).toHaveBeenCalled();
  });

  it('emits native button events', () => {
    const onClick = jest.fn();
    const onBlur = jest.fn();
    const onFocus = jest.fn();

    const wrapper = mount(TDropdown, {
      attrs: {
        onClick,
        onBlur,
        onFocus,
      },
    });

    const { trigger } = wrapper.vm.$refs;

    trigger.dispatchEvent(new MouseEvent('click'));
    expect(onClick).toHaveBeenCalled();

    trigger.dispatchEvent(new FocusEvent('focus'));
    expect(onFocus).toHaveBeenCalled();

    trigger.dispatchEvent(new FocusEvent('blur'));
    expect(onBlur).toHaveBeenCalled();
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

    expect(wrapper.vm.shown).toBe(true);
    expect(dropdown.style.display).toBe('');
  });

  it('emits `update:show` when show property is updated', async () => {
    const wrapper = mount(TDropdown, {
      global: {
        stubs: {
          transition: false,
        },
      },
    });

    wrapper.vm.doShow();

    await wrapper.vm.$nextTick();

    await wrapper.vm.$nextTick();

    // assert event has been emitted
    expect(wrapper.emitted()['update:show']).toBeTruthy();

    // assert event payload
    expect(wrapper.emitted()['update:show']).toEqual([[true]]);

    wrapper.vm.doHide();

    await new Promise((resolve) => {
      setTimeout(resolve, 50);
    });

    // assert event has been emitted
    expect(wrapper.emitted()['update:show']).toBeTruthy();

    // assert event payload
    expect(wrapper.emitted()['update:show']).toEqual([[true], [false]]);
  });

  it('shows the modal if the `show` props changes', async () => {
    const wrapper = mount(TDropdown);

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

    await wrapper.setProps({
      show: false,
    });

    expect(wrapper.vm.shown).toBe(false);
  });

  it('clears the hidetimeout when unmounted', async () => {
    jest.useFakeTimers();

    const jestMock = jest.fn();

    const wrapper = mount(TDropdown);

    wrapper.vm.hideTimeout = setTimeout(jestMock, 100);

    wrapper.unmount();

    jest.advanceTimersByTime(100);

    expect(jestMock).not.toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('invalidates invalid dropdown placements', () => {
    const { validator } = TDropdown.props.placement;
    expect(validator('invalid')).toBe(false);
  });

  it.each([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end',
  ])('accept valid dropdown placements', (placement) => {
    const { validator } = TDropdown.props.placement;
    expect(validator(placement)).toBe(true);
  });

  it('has a default the popper configuration', async () => {
    const wrapper = mount(TDropdown);

    expect(wrapper.vm.popperOptions).toEqual(TDropdownPopperDefaultOptions);
  });

  it('assigns the default popper configuration if undefined', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        popperOptions: undefined,
      },
    });

    expect(wrapper.vm.popperOptions).toEqual(TDropdownPopperDefaultOptions);
  });

  it('the dropdownAfterLeave method removes the `visibility` property', async () => {
    const wrapper = mount(TDropdown);

    const { dropdown } = wrapper.vm.$refs;

    dropdown.style.visibility = 'hidden';

    expect(dropdown.style.visibility).toBe('hidden');

    wrapper.vm.dropdownAfterLeave();

    expect(dropdown.style.visibility).toBe('');
  });

  describe('touch-only devices', () => {
    let windowSpy: any;

    beforeAll(() => {
      windowSpy = jest.spyOn(window, 'window', 'get');
      const windowImplementation = Object.assign(window, {
        matchMedia: () => ({
          matches: true,
        }),
      });

      windowSpy.mockImplementation(() => windowImplementation);
    });

    afterAll(() => {
      windowSpy.mockRestore();
    });

    it('detects touch only devces', () => {
      expect(window.matchMedia('(any-hover: none)')).toEqual({
        matches: true,
      });

      const wrapper = mount(TDropdown);

      expect(wrapper.vm.isTouchOnlyDevice).toBe(true);
    });

    it('ignores mouseoverHandler action in touch-only devices', async () => {
      const wrapper = mount(TDropdown, {
        props: {
          toggleOnHover: true,
        },
      });

      wrapper.vm.isTouchOnlyDevice = true;

      const action = jest.spyOn(wrapper.vm, 'doShow');

      const trigger = wrapper.get('button');

      await trigger.trigger('mouseover');

      expect(action).not.toHaveBeenCalled();
    });

    it('ignores mouseleaveHandler action in touch-only devices', async () => {
      const wrapper = mount(TDropdown, {
        props: {
          toggleOnHover: true,
        },
      });

      wrapper.vm.isTouchOnlyDevice = true;

      const action = jest.spyOn(wrapper.vm, 'targetIsChild');

      const trigger = wrapper.get('button');

      await trigger.trigger('mouseleave');

      expect(action).not.toHaveBeenCalled();
    });

    it('ignores focusHandler action in touch-only devices', async () => {
      const wrapper = mount(TDropdown, {
        props: {
          toggleOnFocus: true,
        },
      });

      const trigger = wrapper.get('button');

      await trigger.trigger('focus');

      expect(wrapper.vm.shown).toBe(false);
    });

    it('ignores blurHandler action in touch-only devices', async () => {
      const wrapper = mount(TDropdown, {
        props: {
          toggleOnFocus: true,
        },
      });

      // doHide should not be called
      const action = jest.spyOn(wrapper.vm, 'doHide');

      const trigger = wrapper.get('button');

      await trigger.trigger('blur');

      expect(action).not.toHaveBeenCalled();
    });

    it('shows the dropdown when clicked on touch-only devices if `toggleOnFocus` is set even if `toggleOnClick` is false', async () => {
      const wrapper = mount(TDropdown, {
        props: {
          toggleOnFocus: true,
          toggleOnClick: false,
        },
      });

      const trigger = wrapper.get('button');

      await trigger.trigger('click');

      expect(wrapper.vm.shown).toBe(true);
    });

    it('shows the dropdown when clicked on touch-only devices if `toggleOnHover` is set even if `toggleOnClick` is false', async () => {
      const wrapper = mount(TDropdown, {
        props: {
          toggleOnHover: true,
          toggleOnFocus: false,
          toggleOnClick: false,
        },
      });

      const trigger = wrapper.get('button');

      await trigger.trigger('click');

      expect(wrapper.vm.shown).toBe(true);
    });

    it('adds the `touchstartHandler` to the current window when dropdown is shown and is isTouchOnlyDevice', async () => {
      const wrapper = mount(TDropdown);

      const addSpy = jest.spyOn(window, 'addEventListener');
      const removeSpy = jest.spyOn(window, 'removeEventListener');

      wrapper.vm.doShow();

      await wrapper.vm.$nextTick();

      expect(addSpy).toHaveBeenCalledWith('touchstart', wrapper.vm.touchstartHandler);

      wrapper.vm.doHide();

      await wrapper.vm.$nextTick();

      expect(removeSpy).toHaveBeenCalledWith('touchstart', wrapper.vm.touchstartHandler);
    });

    it('adds the `touchstartHandler` if the component is shown when mounted', async () => {
      const addSpy = jest.spyOn(window, 'addEventListener');

      const wrapper = mount(TDropdown, {
        props: {
          show: true,
        },
      });

      expect(addSpy).toHaveBeenCalledWith('touchstart', wrapper.vm.touchstartHandler);
    });

    it('removes the `touchstartHandler` if the component when component is unmounted', async () => {
      const removeSpy = jest.spyOn(window, 'removeEventListener');

      const wrapper = mount(TDropdown, {
        props: {
          show: true,
        },
      });

      wrapper.unmount();

      expect(removeSpy).toHaveBeenCalledWith('touchstart', wrapper.vm.touchstartHandler);
    });

    it('hides the dropdown if toggle on focus is set and when touch outside', async () => {
      const wrapper = mount(TDropdown, {
        props: {
          toggleOnFocus: true,
          toggleOnClick: false,
          show: true,
        },
      });

      window.dispatchEvent(new TouchEvent('touchstart'));

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.shown).toBe(false);
    });

    it('doesnt hides the dropdown if touch a children even if toggle on focus is set', async () => {
      const wrapper = mount(TDropdown, {
        props: {
          toggleOnFocus: true,
          toggleOnClick: false,
          show: true,
        },
      });

      window.dispatchEvent(new TouchEvent('touchstart', {
        targetTouches: [
          {
            identifier: 1,
            target: wrapper.vm.$refs.dropdown as EventTarget,
          } as Touch,
        ],
      }));

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.shown).toBe(true);
    });

    it('hides the dropdown if toggle on hover is set and when touch outside', async () => {
      const wrapper = mount(TDropdown, {
        props: {
          toggleOnFocus: false,
          toggleOnClick: false,
          toggleOnHover: true,
          show: true,
        },
      });

      window.dispatchEvent(new TouchEvent('touchstart'));

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.shown).toBe(false);
    });

    it('doesnt hides the dropdown if toggle on hover and toggle on focus is not set when touch outside', async () => {
      const wrapper = mount(TDropdown, {
        props: {
          toggleOnFocus: false,
          toggleOnClick: false,
          toggleOnHover: false,
          show: true,
        },
      });

      window.dispatchEvent(new TouchEvent('touchstart'));

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.shown).toBe(true);
    });

    it('calls the `enablePopperNeedsAdjustmentListener` when popperIsAdjusted is set', async () => {
      const wrapper = mount(TDropdown);

      const enablePopperNeedsAdjustmentListenerSpy = jest.spyOn(wrapper.vm, 'enablePopperNeedsAdjustmentListener');

      wrapper.vm.popperIsAdjusted = true;

      await wrapper.vm.$nextTick();

      expect(enablePopperNeedsAdjustmentListenerSpy).toHaveBeenCalled();
    });

    it('calls the `disablePopperNeedsAdjustmentListener` when popperIsAdjusted is set to false', async () => {
      const wrapper = mount(TDropdown);

      const disablePopperNeedsAdjustmentListenerSpy = jest.spyOn(wrapper.vm, 'disablePopperNeedsAdjustmentListener');

      wrapper.vm.popperIsAdjusted = true;

      await wrapper.vm.$nextTick();

      wrapper.vm.popperIsAdjusted = false;

      await wrapper.vm.$nextTick();

      expect(disablePopperNeedsAdjustmentListenerSpy).toHaveBeenCalled();
    });

    it('set popperIsAdjusted to false when scroll event after is adjusted', async () => {
      jest.useFakeTimers();

      const wrapper = mount(TDropdown);

      wrapper.vm.popperIsAdjusted = true;

      await wrapper.vm.$nextTick();

      window.dispatchEvent(new Event('scroll'));

      expect(wrapper.vm.popperIsAdjusted).toBe(true);

      // need to wait because is throttled
      jest.advanceTimersByTime(200);

      expect(wrapper.vm.popperIsAdjusted).toBe(false);

      jest.useRealTimers();
    });

    it('set popperIsAdjusted to false when resize event after is adjusted', async () => {
      jest.useFakeTimers();

      const wrapper = mount(TDropdown);

      wrapper.vm.popperIsAdjusted = true;

      await wrapper.vm.$nextTick();

      window.dispatchEvent(new Event('resize'));

      expect(wrapper.vm.popperIsAdjusted).toBe(true);

      // need to wait because is throttled
      jest.advanceTimersByTime(200);

      expect(wrapper.vm.popperIsAdjusted).toBe(false);

      jest.useRealTimers();
    });

    it('removes the listener to resize and scroll after component is unmounted', async () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const wrapper = mount(TDropdown);

      wrapper.unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', wrapper.vm.popperAdjusterListener);
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', wrapper.vm.popperAdjusterListener);
    });
  });
});

describe('TDropdown popper instance', () => {
  const popperWasCreated = async (wrapper: VueWrapper<any>) => {
    do {
      // eslint-disable-next-line no-await-in-loop
      await wrapper.vm.$nextTick();
    } while (wrapper.vm.popper === null);

    return Promise.resolve();
  };

  const popperIsAdjusted = async (wrapper: VueWrapper<any>) => {
    do {
      // eslint-disable-next-line no-await-in-loop
      await wrapper.vm.$nextTick();
    } while (wrapper.vm.popperIsAdjusted === false);

    return Promise.resolve();
  };

  it('creates a popper instance when shown', async () => {
    const wrapper = mount(TDropdown);

    expect(wrapper.vm.popper).toBeNull();

    wrapper.vm.doShow();

    await popperWasCreated(wrapper);

    expect(wrapper.vm.popper).toBeTruthy();

    await popperIsAdjusted(wrapper);

    expect(wrapper.vm.popperIsAdjusted).toBe(true);
  });

  it('doesnt create popper if already exists', async () => {
    const wrapper = mount(TDropdown);

    const createPopperSpy = jest.spyOn(wrapper.vm, 'createPopper');

    wrapper.vm.doShow();

    await popperWasCreated(wrapper);

    expect(createPopperSpy).toHaveBeenCalledTimes(1);

    expect(wrapper.vm.popper).toBeTruthy();

    wrapper.vm.doHide();

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.shown).toBe(false);

    expect(createPopperSpy).toHaveBeenCalledTimes(1);
  });

  it('adjust popper if marked as not adjusted', async () => {
    const wrapper = mount(TDropdown);

    wrapper.vm.doShow();

    await popperWasCreated(wrapper);

    const popperUpdateSpy = jest.spyOn(wrapper.vm.popper, 'update');

    wrapper.vm.doHide();

    wrapper.vm.popperIsAdjusted = false;

    wrapper.vm.doShow();

    await wrapper.vm.$nextTick();

    expect(popperUpdateSpy).toHaveBeenCalled();
  });

  it('doesnt adjust popper if marked as adjusted', async () => {
    const wrapper = mount(TDropdown);

    wrapper.vm.doShow();

    await popperWasCreated(wrapper);

    const popperUpdateSpy = jest.spyOn(wrapper.vm.popper, 'update');

    wrapper.vm.doHide();

    wrapper.vm.popperIsAdjusted = true;

    await wrapper.vm.$nextTick();

    expect(popperUpdateSpy).not.toHaveBeenCalled();

    wrapper.vm.doShow();

    await wrapper.vm.$nextTick();

    expect(popperUpdateSpy).not.toHaveBeenCalled();
  });

  it('doesnt adjust popper if marked as adjusted (method check)', async () => {
    const wrapper = mount(TDropdown);

    wrapper.vm.doShow();

    await popperWasCreated(wrapper);

    const popperUpdateSpy = jest.spyOn(wrapper.vm, 'adjustPopper');

    wrapper.vm.doHide();

    wrapper.vm.popperIsAdjusted = true;

    await wrapper.vm.$nextTick();

    expect(popperUpdateSpy).not.toHaveBeenCalled();

    wrapper.vm.doShow();

    await wrapper.vm.$nextTick();

    expect(popperUpdateSpy).not.toHaveBeenCalled();
  });

  it('doesnt adjust popper if is hidden and adjustingPopper is false', async () => {
    const wrapper = mount(TDropdown);

    // Show the dropdown to initialize popper
    wrapper.vm.doShow();
    await popperWasCreated(wrapper);
    wrapper.vm.doHide();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.adjustingPopper = false;

    const popperUpdateSpy = jest.spyOn(wrapper.vm.popper, 'update');

    await wrapper.vm.adjustPopper();

    await wrapper.vm.$nextTick();

    expect(popperUpdateSpy).not.toHaveBeenCalled();
  });

  it('adjust popper if is hidden but adjustingPopper is true', async () => {
    const wrapper = mount(TDropdown);

    // Show the dropdown to initialize popper
    wrapper.vm.doShow();
    await popperWasCreated(wrapper);
    wrapper.vm.doHide();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.adjustingPopper = true;

    const popperUpdateSpy = jest.spyOn(wrapper.vm.popper, 'update');

    await wrapper.vm.adjustPopper();

    await wrapper.vm.$nextTick();

    expect(popperUpdateSpy).toHaveBeenCalled();
  });

  it('adjust popper if not is hidden and adjustingPopper is false', async () => {
    const wrapper = mount(TDropdown);

    // Show the dropdown to initialize popper
    wrapper.vm.doShow();
    await popperWasCreated(wrapper);
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    wrapper.vm.adjustingPopper = true;

    const popperUpdateSpy = jest.spyOn(wrapper.vm.popper, 'update');

    await wrapper.vm.adjustPopper();

    await wrapper.vm.$nextTick();

    expect(popperUpdateSpy).toHaveBeenCalled();
  });

  it('accepts undefined as the placement', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        placement: undefined,
      },
    });

    wrapper.vm.doShow();

    await popperWasCreated(wrapper);

    expect(wrapper.vm.popper).toBeTruthy();
    expect(wrapper.vm.popper.state.placement).toBe(TDropdownPopperDefaultOptions.placement);
  });

  it('overrides the popper placement if placement is set', async () => {
    const wrapper = mount(TDropdown, {
      props: {
        placement: 'top',
      },
    });

    wrapper.vm.doShow();

    await popperWasCreated(wrapper);

    expect(wrapper.vm.popper).toBeTruthy();
    expect(wrapper.vm.popper.state.placement).toBe('top');
  });
});
