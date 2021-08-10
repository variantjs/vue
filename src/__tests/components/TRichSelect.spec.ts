import { NormalizedOption, NormalizedOptions } from '@variantjs/core';
import { shallowMount } from '@vue/test-utils';
import TRichSelect from '../../components/TRichSelect.vue';
import { componentHasAttributeWithInlineHandlerAndParameter, componentHasAttributeWithValue, getChildComponentNameByRef } from '../testUtils';

describe('TRichSelect.vue', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(TRichSelect);
    expect(wrapper.get('div')).toBeTruthy();
  });

  it('hides the dropdown and focus the trigger when the vmodel value changes and the `closeOnSelect` option is set', async () => {
    const focusDropdownTriggerMock = jest.fn();
    const options = [1, 2];
    const wrapper = shallowMount(TRichSelect, {
      props: {
        options,
        modelValue: 1,
        closeOnSelect: true,
      },
      global: {
        stubs: {
          TDropdown: {
            template: '<div />',
            methods: {
              focus: focusDropdownTriggerMock,
            },
          },
        },
      },
    });

    wrapper.vm.shown = true;

    await wrapper.vm.$nextTick();

    await wrapper.setProps({
      modelValue: 2,
    });

    expect(wrapper.vm.shown).toBe(false);
    expect(focusDropdownTriggerMock).toHaveBeenCalled();
  });

  it('hides the dropdown and focus the trigger when the vmodel value changes and the `closeOnSelect` is undefined and is not multipe', async () => {
    const focusDropdownTriggerMock = jest.fn();
    const options = [1, 2];
    const wrapper = shallowMount(TRichSelect, {
      props: {
        options,
        modelValue: 1,
        closeOnSelect: undefined,
        multiple: false,
      },
      global: {
        stubs: {
          TDropdown: {
            template: '<div />',
            methods: {
              focus: focusDropdownTriggerMock,
            },
          },
        },
      },
    });

    wrapper.vm.shown = true;

    await wrapper.vm.$nextTick();

    await wrapper.setProps({
      modelValue: 2,
    });

    expect(wrapper.vm.shown).toBe(false);
    expect(focusDropdownTriggerMock).toHaveBeenCalled();
  });

  it('doesnt hide the dropdown and focus the trigger when the vmodel value changes and the `closeOnSelect` is undefined but is multipe', async () => {
    const focusDropdownTriggerMock = jest.fn();
    const options = [1, 2];
    const wrapper = shallowMount(TRichSelect, {
      props: {
        options,
        modelValue: 1,
        closeOnSelect: undefined,
        multiple: true,
      },
      global: {
        stubs: {
          TDropdown: {
            template: '<div />',
            methods: {
              focus: focusDropdownTriggerMock,
            },
          },
        },
      },
    });

    wrapper.vm.shown = true;

    await wrapper.vm.$nextTick();

    await wrapper.setProps({
      modelValue: 2,
    });

    expect(wrapper.vm.shown).toBe(true);
    expect(focusDropdownTriggerMock).not.toHaveBeenCalled();
  });

  it('doesnt hide the dropdown and focus the trigger when the vmodel value changes, is not multiple but closeOnSelect is `false`', async () => {
    const focusDropdownTriggerMock = jest.fn();
    const options = [1, 2];
    const wrapper = shallowMount(TRichSelect, {
      props: {
        options,
        modelValue: 1,
        closeOnSelect: false,
        multiple: false,
      },
      global: {
        stubs: {
          TDropdown: {
            template: '<div />',
            methods: {
              focus: focusDropdownTriggerMock,
            },
          },
        },
      },
    });

    wrapper.vm.shown = true;

    await wrapper.vm.$nextTick();

    await wrapper.setProps({
      modelValue: 2,
    });

    expect(wrapper.vm.shown).toBe(true);
    expect(focusDropdownTriggerMock).not.toHaveBeenCalled();
  });

  describe('selectedOption', () => {
    it('sets the selectedOption from the initial v-model ', () => {
      const options = [1, 2, 3];
      const modelValue = 2;

      const wrapper = shallowMount(TRichSelect, {
        props: {
          options,
          modelValue,
        },
      });

      expect(wrapper.vm.selectedOption).toEqual({
        value: 2,
        text: 2,
        raw: 2,
      });
    });

    it('sets the selectedOption from the initial v-model when not defined', () => {
      const options = [1, 2, 3];

      const wrapper = shallowMount(TRichSelect, {
        props: {
          options,
        },
      });

      expect(wrapper.vm.selectedOption).toBeUndefined();
    });

    it('updates the selectedOption within the v-model ', async () => {
      const options = [1, 2, 3];
      const modelValue = 2;

      const wrapper = shallowMount(TRichSelect, {
        props: {
          options,
          modelValue,
        },
      });

      await wrapper.setProps({
        modelValue: 3,
      });

      expect(wrapper.vm.selectedOption).toEqual({
        value: 3,
        text: 3,
        raw: 3,
      });
    });

    it('updates the selectedOption within the v-model when set to null ', async () => {
      const options = [1, 2, 3];
      const modelValue = 2;

      const wrapper = shallowMount(TRichSelect, {
        props: {
          options,
          modelValue,
        },
      });

      await wrapper.setProps({
        modelValue: null,
      });

      expect(wrapper.vm.selectedOption).toBeUndefined();
    });
  });

  describe('ClearButton', () => {
    it('set showClearButton as `true` if `selectedOption` is clearable and is not multiple', () => {
      const options = [1, 2, 3];
      const modelValue = 2;

      const wrapper = shallowMount(TRichSelect, {
        props: {
          clearable: true,
          multiple: false,
          options,
          modelValue,
        },
      });

      expect(wrapper.vm.showClearButton).toBe(true);
    });

    it('set showClearButton as `false` if `selectedOption`, is clearable but is multiple', () => {
      const options = [1, 2, 3];
      const modelValue = 2;

      const wrapper = shallowMount(TRichSelect, {
        props: {
          clearable: true,
          multiple: true,
          options,
          modelValue,
        },
      });

      expect(wrapper.vm.showClearButton).toBe(false);
    });

    it('set showClearButton as `false` if `selectedOption` is multiple but is not clearable', () => {
      const options = [1, 2, 3];
      const modelValue = 2;

      const wrapper = shallowMount(TRichSelect, {
        props: {
          clearable: false,
          multiple: false,
          options,
          modelValue,
        },
      });

      expect(wrapper.vm.showClearButton).toBe(false);
    });

    it('set showClearButton as `false` if no selectedOption even if is clearable and is not multiple', () => {
      const options = [1, 2, 3];

      const wrapper = shallowMount(TRichSelect, {
        props: {
          clearable: true,
          multiple: false,
          options,
        },
      });

      expect(wrapper.vm.showClearButton).toBe(false);
    });

    it('shows the clearButton if showClearButton is `true`', () => {
      const options = [1, 2, 3];
      const modelValue = 2;

      const wrapper = shallowMount(TRichSelect, {
        props: {
          clearable: true,
          multiple: false,
          options,
          modelValue,
        },
      });

      expect(wrapper.vm.$refs.clearButton).toBeDefined();
      expect(getChildComponentNameByRef(wrapper, 'clearButton')).toEqual('RichSelectClearButton');
    });

    it('hides the clearButton if showClearButton is `false`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect(wrapper.vm.$refs.clearButton).not.toBeDefined();
    });

    it('contains a `click` handler that calls the `clearValue` method', async () => {
      const options = [1, 2, 3];
      const modelValue = 2;

      const wrapper = shallowMount(TRichSelect, {
        props: {
          clearable: true,
          multiple: false,
          options,
          modelValue,
        },
      });

      const component = wrapper.vm.$refs.clearButton;

      expect(componentHasAttributeWithValue(component, 'onClick', wrapper.vm.clearValue)).toBe(true);
    });
  });

  describe('event handlers', () => {
    it.each([
      ['onBeforeShow', 'beforeShowHandler'],
      ['onBeforeHide', 'beforeHideHandler'],
      ['onBlur', 'blurHandler'],
      ['onFocus', 'focusHandler'],
      ['onMousedown', 'mousedownHandler'],
      ['onBlurOnChild', 'blurOnChildHandler'],
    ])('has the `%s` event handler pointing to `%s`', (eventName, eventHandlerName) => {
      const wrapper = shallowMount(TRichSelect);
      const component = wrapper.vm.$refs.dropdown;

      expect(componentHasAttributeWithValue(component, eventName, wrapper.vm[eventHandlerName])).toBe(true);
    });

    it('hides the dropdown with blurHandler', () => {
      const wrapper = shallowMount(TRichSelect);
      wrapper.vm.shown = true;
      const event = new FocusEvent('blur');
      wrapper.vm.blurHandler(event);
      expect(wrapper.vm.shown).toBe(false);
      expect(wrapper.emitted().blur).toEqual([[event]]);
    });

    describe('focusHandler', () => {
      it('shows the dropdown with focusHandler when `toggleOnFocus` is set', () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnFocus: true,
          },
        });
        const event = new FocusEvent('focus');
        wrapper.vm.focusHandler(event);
        expect(wrapper.vm.shown).toBe(true);
        expect(wrapper.emitted().focus).toEqual([[event]]);
      });

      it('doesnt shows the dropdown with focusHandler when `toggleOnFocus` is set to `false`', () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnFocus: false,
          },
        });
        const event = new FocusEvent('focus');
        wrapper.vm.focusHandler(event);
        expect(wrapper.vm.shown).toBe(false);
        expect(wrapper.emitted().focus).toEqual([[event]]);
      });
    });

    describe('blurOnChildHandler', () => {
      it('will restore the original focus when blurred from the search form to a child focusable element', () => {
        const wrapper = shallowMount(TRichSelect);
        wrapper.vm.shown = true;

        const target = document.createElement('DIV');
        const relatedTarget = document.createElement('DIV');

        target.setAttribute('data-rich-select-search', 'true');
        const focusSpy = jest.spyOn(target, 'focus');

        wrapper.vm.blurOnChildHandler({ target, relatedTarget });
        expect(focusSpy).toHaveBeenCalled();
        expect(wrapper.vm.shown).toBe(true);
      });

      it('will not restore the original focus when blurred from the search to the trigger', () => {
        const wrapper = shallowMount(TRichSelect);
        wrapper.vm.shown = true;

        const target = document.createElement('DIV');
        target.setAttribute('data-rich-select-trigger', 'true');

        const relatedTarget = document.createElement('DIV');
        relatedTarget.setAttribute('data-rich-select-search', 'true');

        const focusSpy = jest.spyOn(target, 'focus');

        wrapper.vm.blurOnChildHandler({ target, relatedTarget });
        expect(focusSpy).not.toHaveBeenCalled();
        expect(wrapper.vm.shown).toBe(true);
      });

      it('will restore the original focus when blurred from the trigger to a child focusable element', () => {
        const wrapper = shallowMount(TRichSelect);
        wrapper.vm.shown = true;

        const target = document.createElement('DIV');
        const relatedTarget = document.createElement('DIV');

        target.setAttribute('data-rich-select-trigger', 'true');
        const focusSpy = jest.spyOn(target, 'focus');

        wrapper.vm.blurOnChildHandler({ target, relatedTarget });
        expect(focusSpy).toHaveBeenCalled();
        expect(wrapper.vm.shown).toBe(true);
      });

      it('will not restore the original focus when blurred from the trigger to the search', () => {
        const wrapper = shallowMount(TRichSelect);
        wrapper.vm.shown = true;

        const target = document.createElement('DIV');
        target.setAttribute('data-rich-select-search', 'true');

        const relatedTarget = document.createElement('DIV');
        relatedTarget.setAttribute('data-rich-select-trigger', 'true');

        const focusSpy = jest.spyOn(target, 'focus');

        wrapper.vm.blurOnChildHandler({ target, relatedTarget });
        expect(focusSpy).not.toHaveBeenCalled();
        expect(wrapper.vm.shown).toBe(true);
      });
    });
  });

  describe('Dropdown stuff', () => {
    it('invalidates invalid dropdown placements', () => {
      const { validator } = TRichSelect.props.dropdownPlacement;
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
      const { validator } = TRichSelect.props.dropdownPlacement;
      expect(validator(placement)).toBe(true);
    });

    it.each([
      ['onMouseover', 'mouseover'],
      ['onMouseleave', 'mouseleave'],
      ['onTouchstart', 'touchstart'],
      ['onShown', 'shown'],
      ['onHidden', 'hidden'],
    ])('re-emits the event `%s`', (eventName, parameterName) => {
      const wrapper = shallowMount(TRichSelect);
      const component = wrapper.vm.$refs.dropdown;

      expect(componentHasAttributeWithInlineHandlerAndParameter(component, eventName, parameterName)).toBe(true);
    });

    describe('esc key', () => {
      it('hides the dropdown and focus the trigger when pressed esc', async () => {
        const focusDropdownTriggerMock = jest.fn();

        const wrapper = shallowMount(TRichSelect, {
          global: {
            stubs: {
              TDropdown: {
                template: '<div />',
                methods: {
                  focus: focusDropdownTriggerMock,
                },
              },
            },
          },
        });

        wrapper.vm.shown = true;

        const { dropdown } = wrapper.vm.$refs;

        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(false);
        expect(focusDropdownTriggerMock).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });

      it('only re-emits the keyboard event when dropdown is closed ', async () => {
        const focusDropdownTriggerMock = jest.fn();

        const wrapper = shallowMount(TRichSelect, {
          global: {
            stubs: {
              TDropdown: {
                template: '<div />',
                methods: {
                  focus: focusDropdownTriggerMock,
                },
              },
            },
          },
        });

        const { dropdown } = wrapper.vm.$refs;

        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(false);
        expect(focusDropdownTriggerMock).not.toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });
    });

    describe('space key', () => {
      it('shows the dropdown if `toggleOnClick` is set', async () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: true,
          },
        });

        const { dropdown } = wrapper.vm.$refs;

        const event = new KeyboardEvent('keydown', {
          key: 'Space',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(true);
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });

      it('doesnt shows the dropdown if `toggleOnClick` is not set', async () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: false,
          },

        });

        const { dropdown } = wrapper.vm.$refs;

        const event = new KeyboardEvent('keydown', {
          key: 'Space',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(false);
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });

      it('toggles the active option if dropdown is shown', async () => {
        const options = [1, 2, 3];
        const wrapper = shallowMount(TRichSelect, {
          props: {
            options,
          },

        });

        wrapper.vm.shown = true;

        const { dropdown } = wrapper.vm.$refs;

        const event = new KeyboardEvent('keydown', {
          key: 'Space',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        expect(wrapper.vm.$.setupState.localValue).toBe(undefined);

        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.$.setupState.localValue).toBe(1);
        expect(wrapper.vm.shown).toBe(true);
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);

        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.$.setupState.localValue).toBe(undefined);
        expect(wrapper.vm.shown).toBe(true);
      });

      it('toggles the active option if dropdown is shown when no active option', async () => {
        const wrapper = shallowMount(TRichSelect);

        wrapper.vm.shown = true;

        const { dropdown } = wrapper.vm.$refs;

        const event = new KeyboardEvent('keydown', {
          key: 'Space',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(true);
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });
    });

    describe('enter key', () => {
      it('doesnt shows the dropdown when hidden', async () => {
        const wrapper = shallowMount(TRichSelect);

        const { dropdown } = wrapper.vm.$refs;

        const event = new KeyboardEvent('keydown', {
          key: 'Enter',
        });

        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(false);
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });

      it('toggles the active option if dropdown is shown', async () => {
        const options = [1, 2, 3];
        const wrapper = shallowMount(TRichSelect, {
          props: {
            options,
          },
        });

        wrapper.vm.shown = true;

        const { dropdown } = wrapper.vm.$refs;

        const event = new KeyboardEvent('keydown', {
          key: 'Enter',
        });

        expect(wrapper.vm.$.setupState.localValue).toBe(undefined);

        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.$.setupState.localValue).toBe(1);
        expect(wrapper.vm.shown).toBe(true);
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);

        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.$.setupState.localValue).toBe(undefined);
        expect(wrapper.vm.shown).toBe(true);
      });

      it('toggles the active option if dropdown is shown when no active option', async () => {
        const wrapper = shallowMount(TRichSelect);

        wrapper.vm.shown = true;

        const { dropdown } = wrapper.vm.$refs;

        const event = new KeyboardEvent('keydown', {
          key: 'Enter',
        });

        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(true);
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });
    });

    describe('key up key', () => {
      it('shows the dropdown if hidden', async () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: true,
          },
        });

        const { dropdown } = wrapper.vm.$refs;

        const event = new KeyboardEvent('keydown', {
          key: 'ArrowUp',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(true);
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });

      it('activates the the prev option if dropdown is shown', async () => {
        const options = [1, 2, 3];
        const wrapper = shallowMount(TRichSelect, {
          props: {
            options,
            toggleOnClick: true,
          },
        });
        wrapper.vm.shown = true;
        wrapper.vm.activeOption = { value: 3, text: 3, raw: 3 } as NormalizedOption;

        const { dropdown } = wrapper.vm.$refs;

        const event = new KeyboardEvent('keydown', {
          key: 'ArrowUp',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(true);
        expect(wrapper.vm.activeOption).toEqual({ value: 2, text: 2, raw: 2 } as NormalizedOption);
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });
    });

    describe('key down key', () => {
      it('shows the dropdown if hidden', async () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: true,
          },
        });

        const { dropdown } = wrapper.vm.$refs;

        const event = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(true);
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });

      it('activates the the next option if dropdown is shown', async () => {
        const options = [1, 2, 3];
        const wrapper = shallowMount(TRichSelect, {
          props: {
            options,
            toggleOnClick: true,
          },
        });
        wrapper.vm.shown = true;

        const { dropdown } = wrapper.vm.$refs;

        const event = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdown.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(true);
        expect(wrapper.vm.activeOption).toEqual({ value: 2, text: 2, raw: 2 } as NormalizedOption);
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });
    });
  });
});
