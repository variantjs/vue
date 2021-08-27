import { NormalizedOption, normalizeOptions } from '@variantjs/core';
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

  it('has default dropdownPopperOptions', () => {
    const wrapper = shallowMount(TRichSelect);

    expect(Object.keys(wrapper.vm.dropdownPopperOptions)).toEqual(['placement', 'modifiers', 'strategy', 'onFirstUpdate']);
  });

  describe('provides the data needed on the child elements', () => {
    it('provides the configuration', () => {
      const wrapper = shallowMount(TRichSelect);

      expect(wrapper.vm.$.provides.configuration.value).toEqual(wrapper.vm.$.setupState.configuration);
    });

    it('provides the options', () => {
      const options = [1, 2, 3];
      const wrapper = shallowMount(TRichSelect, {
        props: {
          options,
        },
      });

      expect(wrapper.vm.$.provides.options.value).toEqual(normalizeOptions(options));
    });

    it('provides the shown state', () => {
      const options = [1, 2, 3];
      const wrapper = shallowMount(TRichSelect, {
        props: {
          options,
        },
      });

      expect(wrapper.vm.$.provides.state).toEqual(wrapper.vm.$.setupState.state);
    });

    it('provides the `selectedOption` state', () => {
      const options = [1];
      const wrapper = shallowMount(TRichSelect, {
        props: {

          options,
          modelValue: 1,
        },
      });

      expect(wrapper.vm.$.provides.selectedOption.value).toEqual({
        value: 1,
        text: 1,
        raw: 1,
      });
    });

    it('provides the `toggleOption` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect(wrapper.vm.$.provides.toggleOption[0]).toEqual(wrapper.vm.$.setupState.toggleOption);
    });

    it('provides the `optionIsActive` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect(wrapper.vm.$.provides.optionIsActive[0]).toEqual(wrapper.vm.$.setupState.optionIsActive);
    });

    it('provides the `setActiveOption` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect(wrapper.vm.$.provides.setActiveOption[0]).toEqual(wrapper.vm.$.setupState.setActiveOption);
    });

    it('provides the `dropdownBottomReachedHandler` method', () => {
      const wrapper = shallowMount(TRichSelect);

      expect(wrapper.vm.$.provides.dropdownBottomReachedHandler[0]).toEqual(wrapper.vm.$.setupState.dropdownBottomReachedHandler);
    });

    it('provides the `optionIsSelected` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect(wrapper.vm.$.provides.optionIsSelected).toEqual(wrapper.vm.$.setupState.optionIsSelected);
    });

    it('provides the `keydownDownHandler` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect(wrapper.vm.$.provides.keydownDownHandler).toEqual(wrapper.vm.$.setupState.keydownDownHandler);
    });
    it('provides the `keydownUpHandler` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect(wrapper.vm.$.provides.keydownUpHandler).toEqual(wrapper.vm.$.setupState.keydownUpHandler);
    });

    it('provides the `keydownEnterHandler` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect(wrapper.vm.$.provides.keydownEnterHandler).toEqual(wrapper.vm.$.setupState.keydownEnterHandler);
    });

    it('provides the `keydownEscHandler` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect(wrapper.vm.$.provides.keydownEscHandler).toEqual(wrapper.vm.$.setupState.keydownEscHandler);
    });

    it('provides the `showSearchInput` computed property', () => {
      const wrapper = shallowMount(TRichSelect);
      expect(wrapper.vm.$.provides.showSearchInput.value).toEqual(wrapper.vm.$.setupState.showSearchInput);
    });

    it('provides the `needsMoreCharsMessage` computed property', () => {
      const wrapper = shallowMount(TRichSelect);
      expect(wrapper.vm.$.provides.needsMoreCharsMessage.value).toEqual('Please enter undefined or more characters');
    });

    it('provides the `searchQuery` ref', () => {
      const wrapper = shallowMount(TRichSelect);
      expect(wrapper.vm.$.provides.searchQuery.value).toEqual(wrapper.vm.$.setupState.searchQuery);
    });

    it('provides the `fetchingOptions` ref', () => {
      const wrapper = shallowMount(TRichSelect);
      expect(wrapper.vm.$.provides.fetchingOptions.value).toBe(false);
    });

    it('provides the `fetchingMoreOptions` ref', () => {
      const wrapper = shallowMount(TRichSelect);
      expect(wrapper.vm.$.provides.fetchingMoreOptions.value).toBe(false);
    });
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

    describe('onOptionSelected', () => {
      it('calls the `onOptionSelected` method when the localValue changes', async () => {
        const options = [1, 2, 3];
        const wrapper = shallowMount(TRichSelect, {
          props: {
            modelValue: 1,
            options,
          },
        });

        const onOptionSelectedSpy = jest.spyOn(wrapper.vm, 'onOptionSelected');

        expect(onOptionSelectedSpy).not.toHaveBeenCalled();

        await wrapper.setProps({
          modelValue: 2,
        });

        expect(onOptionSelectedSpy).toHaveBeenCalled();
      });

      it('hides the dropdown and focus the dropdown if `closeOnSelect` is set to `true`', async () => {
        const focusDropdownTriggerMock = jest.fn();
        const wrapper = shallowMount(TRichSelect, {
          props: {
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

        wrapper.vm.onOptionSelected();

        expect(wrapper.vm.shown).toBe(false);
        expect(focusDropdownTriggerMock).toHaveBeenCalled();
      });

      it('hides the dropdown if `closeOnSelect` is `undefined` and is not multiple', async () => {
        const focusDropdownTriggerMock = jest.fn();
        const wrapper = shallowMount(TRichSelect, {
          props: {
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

        wrapper.vm.onOptionSelected();
        expect(wrapper.vm.shown).toBe(false);
        expect(focusDropdownTriggerMock).toHaveBeenCalled();
      });

      it('doesnt hides the dropdown if `closeOnSelect` is `undefined` and is multiple', async () => {
        const focusDropdownTriggerMock = jest.fn();
        const wrapper = shallowMount(TRichSelect, {
          props: {
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

        wrapper.vm.onOptionSelected();

        expect(wrapper.vm.shown).toBe(true);
        expect(focusDropdownTriggerMock).not.toHaveBeenCalled();
      });

      it('doesnt hides the dropdown if is already hidden', async () => {
        const focusDropdownTriggerMock = jest.fn();
        const wrapper = shallowMount(TRichSelect, {
          props: {
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

        wrapper.vm.onOptionSelected();
        expect(wrapper.vm.shown).toBe(false);
        expect(focusDropdownTriggerMock).not.toHaveBeenCalled();
      });
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

    describe('mousedownHandler', () => {
      it('shows the dropdown when `toggleOnClick` is set', () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: true,
          },
        });
        const event = new MouseEvent('click');
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        wrapper.vm.mousedownHandler(event);
        expect(wrapper.vm.shown).toBe(true);
        expect(wrapper.emitted().mousedown).toEqual([[event]]);
        expect(preventDefaultSpy).toHaveBeenCalled();
      });

      it('doesnt shows the dropdown when `toggleOnClick` is not set', () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: false,
          },
        });
        const event = new MouseEvent('click');
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        wrapper.vm.mousedownHandler(event);
        expect(wrapper.vm.shown).toBe(false);
        expect(wrapper.emitted().mousedown).toEqual([[event]]);
        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });

      it('doesnt call the `preventDefault` method if search box is hidden', () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: true,
            hideSearchBox: true,
          },
        });
        const event = new MouseEvent('click');
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        wrapper.vm.mousedownHandler(event);
        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });

      it('hides the dropdown when `toggleOnClick` is set and dropdown is shown', () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: true,
          },
        });
        wrapper.vm.shown = true;
        const event = new MouseEvent('click');
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        wrapper.vm.mousedownHandler(event);
        expect(wrapper.vm.shown).toBe(false);
        expect(wrapper.emitted().mousedown).toEqual([[event]]);
        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });

      it('doesnt hides the dropdown when `toggleOnClick` is not set', () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: false,
          },
        });
        wrapper.vm.shown = true;
        const event = new MouseEvent('click');
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        wrapper.vm.mousedownHandler(event);
        expect(wrapper.vm.shown).toBe(true);
        expect(wrapper.emitted().mousedown).toEqual([[event]]);
        expect(preventDefaultSpy).not.toHaveBeenCalled();
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

      it('will not restore the original focus when not related target', () => {
        const wrapper = shallowMount(TRichSelect);
        wrapper.vm.shown = true;

        const target = document.createElement('DIV');
        target.setAttribute('data-rich-select-search', 'true');

        const focusSpy = jest.spyOn(target, 'focus');

        wrapper.vm.blurOnChildHandler({ target, relatedTarget: undefined });
        expect(focusSpy).not.toHaveBeenCalled();
        expect(wrapper.vm.shown).toBe(true);
      });
    });

    describe('beforeShowHandler', () => {
      it('sets active option when is about to show the dropdown', () => {
        const wrapper = shallowMount(TRichSelect);
        const initActiveOptionSpy = jest.spyOn(wrapper.vm.$.setupState, 'initActiveOption');
        wrapper.vm.beforeShowHandler();
        expect(initActiveOptionSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('before-show');
      });
    });

    describe('beforeHideHandler', () => {
      it('selects the active option if `selectOnclose` is set and active option is different to selected option', () => {
        const options = [1, 2];
        const wrapper = shallowMount(TRichSelect, {
          props: {
            modelValue: 1,
            options,
            selectOnClose: true,
          },
        });

        wrapper.vm.activeOption = { value: 2, text: 2, raw: 2 } as NormalizedOption;

        const selectOptionFromActiveOptionSpy = jest.spyOn(wrapper.vm.$.setupState, 'selectOptionFromActiveOption');
        wrapper.vm.beforeHideHandler();
        expect(selectOptionFromActiveOptionSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('before-hide');
      });

      it('selects the active option if `selectOnclose` when active option is null', () => {
        const options = [1, 2];
        const wrapper = shallowMount(TRichSelect, {
          props: {
            modelValue: 1,
            options,
            selectOnClose: true,
          },
        });

        wrapper.vm.activeOption = null;

        const selectOptionFromActiveOptionSpy = jest.spyOn(wrapper.vm.$.setupState, 'selectOptionFromActiveOption');
        wrapper.vm.beforeHideHandler();
        expect(selectOptionFromActiveOptionSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('before-hide');
      });

      it('doesnt selects the active option if `selectOnclose` is set to `false`', () => {
        const options = [1, 2];
        const wrapper = shallowMount(TRichSelect, {
          props: {
            modelValue: 1,
            options,
            selectOnClose: false,
          },
        });

        wrapper.vm.activeOption = { value: 2, text: 2, raw: 2 } as NormalizedOption;

        const selectOptionFromActiveOptionSpy = jest.spyOn(wrapper.vm.$.setupState, 'selectOptionFromActiveOption');
        wrapper.vm.beforeHideHandler();
        expect(selectOptionFromActiveOptionSpy).not.toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('before-hide');
      });

      it('doesnt selects the active option when `selectOnclose` is set if active the same as the selected option', () => {
        const options = [1, 2];
        const wrapper = shallowMount(TRichSelect, {
          props: {
            modelValue: 2,
            options,
            selectOnClose: true,
          },
        });

        wrapper.vm.activeOption = { value: 2, text: 2, raw: 2 } as NormalizedOption;

        const selectOptionFromActiveOptionSpy = jest.spyOn(wrapper.vm.$.setupState, 'selectOptionFromActiveOption');
        wrapper.vm.beforeHideHandler();
        expect(selectOptionFromActiveOptionSpy).not.toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('before-hide');
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

  describe('fetch options', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let fetchOptionsSpy: any;
    const originalCreatedMethod = TRichSelect.created!;

    beforeEach(() => {
      // eslint-disable-next-line func-names
      TRichSelect.created = function () {
        // this.$.setupState.doFetchOptions =
        fetchOptionsSpy = jest.spyOn(this.$.setupState, 'doFetchOptions');

        originalCreatedMethod.call(this);
      };
    });

    afterEach(() => {
      jest.restoreAllMocks();

      TRichSelect.created = originalCreatedMethod;
    });

    it('fetch the options when prefetchOptions option is set', () => {
      shallowMount(TRichSelect, {
        props: {
          fetchOptions: () => {},
          prefetchOptions: true,
        },
      });

      expect(fetchOptionsSpy).toHaveBeenCalled();
    });

    it('doesnt the options when prefetchOptions option is set if no fetch function', () => {
      shallowMount(TRichSelect, {
        props: {
          prefetchOptions: true,
        },
      });

      expect(fetchOptionsSpy).not.toHaveBeenCalled();
    });

    it('doesnt fetch the options when prefetchOptions option is not set', () => {
      shallowMount(TRichSelect, {
        props: {
          fetchsOptions: () => {},
          prefetchOptions: false,
        },
      });

      expect(fetchOptionsSpy).not.toHaveBeenCalled();
    });
  });
});
