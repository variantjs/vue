/* eslint-disable @typescript-eslint/no-explicit-any */
import { NormalizedOption, normalizeOptions } from '@variantjs/core';
import { shallowMount } from '@vue/test-utils';
import TRichSelect from '../../components/TRichSelect.vue';
import { componentHasAttributeWithInlineHandlerAndParameter, componentHasAttributeWithValue, getChildComponentNameByRef } from '../testUtils';

describe('TRichSelect.vue', () => {
  const focusDropdownTriggerMock = jest.fn();
  const adjustPopperMock = jest.fn();
  const dropdownDoHideMock = jest.fn();
  const dropdownDoShowMock = jest.fn();

  const TDropdownComponentMock = {
    template: '<div />',
    methods: {
      focus: focusDropdownTriggerMock,
      adjustPopper: adjustPopperMock,
      doHide: dropdownDoHideMock,
      doShow: dropdownDoShowMock,
    },
  };

  afterEach(() => {
    focusDropdownTriggerMock.mockReset();
    adjustPopperMock.mockReset();
    dropdownDoHideMock.mockReset();
    dropdownDoShowMock.mockReset();
  });

  it('renders the component', () => {
    const wrapper = shallowMount(TRichSelect);
    expect(wrapper.get('div')).toBeTruthy();
  });

  it('hides the dropdown and focus the trigger when the vmodel value changes and the `closeOnSelect` option is set', async () => {
    const options = [1, 2];
    const wrapper = shallowMount(TRichSelect, {
      props: {
        options,
        modelValue: 1,
        closeOnSelect: true,
      },
      global: {
        stubs: {
          TDropdown: TDropdownComponentMock,
        },
      },
    });

    wrapper.vm.shown = true;

    await wrapper.vm.$nextTick();

    await wrapper.setProps({
      modelValue: 2,
    });

    expect(dropdownDoHideMock).toHaveBeenCalled();
    expect(focusDropdownTriggerMock).toHaveBeenCalled();
  });

  it('hides the dropdown and focus the trigger when the vmodel value changes and the `closeOnSelect` is undefined and is not multiple', async () => {
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
          TDropdown: TDropdownComponentMock,
        },
      },
    });

    wrapper.vm.shown = true;

    await wrapper.vm.$nextTick();

    await wrapper.setProps({
      modelValue: 2,
    });

    expect(dropdownDoHideMock).toHaveBeenCalled();
    expect(focusDropdownTriggerMock).toHaveBeenCalled();
  });

  it('doesnt hide the dropdown and focus the trigger when the vmodel value changes and the `closeOnSelect` is undefined but is multiple', async () => {
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
          TDropdown: TDropdownComponentMock,
        },
      },
    });

    wrapper.vm.shown = true;

    await wrapper.vm.$nextTick();

    await wrapper.setProps({
      modelValue: 2,
    });

    expect(dropdownDoHideMock).not.toHaveBeenCalled();
    expect(focusDropdownTriggerMock).not.toHaveBeenCalled();
  });

  it('doesnt hide the dropdown and focus the trigger when the vmodel value changes, is not multiple but closeOnSelect is `false`', async () => {
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
          TDropdown: TDropdownComponentMock,
        },
      },
    });

    wrapper.vm.shown = true;

    await wrapper.vm.$nextTick();

    await wrapper.setProps({
      modelValue: 2,
    });

    expect(dropdownDoHideMock).not.toHaveBeenCalled();
    expect(focusDropdownTriggerMock).not.toHaveBeenCalled();
  });

  it('has default dropdownPopperOptions', () => {
    const wrapper = shallowMount(TRichSelect);

    expect(Object.keys(wrapper.vm.dropdownPopperOptions)).toEqual(['placement', 'modifiers', 'strategy', 'onFirstUpdate']);
  });

  describe('provides the data needed on the child elements', () => {
    it('provides the configuration', () => {
      const wrapper = shallowMount(TRichSelect);

      expect((wrapper.vm.$ as any).provides.configuration).toEqual((wrapper.vm.$ as any).setupState.configuration);
    });

    it('provides the options', () => {
      const options = [1, 2, 3];
      const wrapper = shallowMount(TRichSelect, {
        props: {
          options,
        },
      });

      expect((wrapper.vm.$ as any).provides.options.value).toEqual(normalizeOptions(options));
    });

    it('provides the shown state', () => {
      const options = [1, 2, 3];
      const wrapper = shallowMount(TRichSelect, {
        props: {
          options,
        },
      });

      expect((wrapper.vm.$ as any).provides.state).toEqual((wrapper.vm.$ as any).setupState.state);
    });

    it('provides the `selectedOption` state', () => {
      const options = [1];
      const wrapper = shallowMount(TRichSelect, {
        props: {

          options,
          modelValue: 1,
        },
      });

      expect((wrapper.vm.$ as any).provides.selectedOption.value).toEqual({
        value: 1,
        text: 1,
        raw: 1,
      });
    });

    it('provides the `hasSelectedOption` computed property', () => {
      const options = [1];
      const wrapper = shallowMount(TRichSelect, {
        props: {
          options,
          modelValue: 1,
        },
      });

      expect((wrapper.vm.$ as any).provides.hasSelectedOption).toBeDefined();
    });

    it('provides the `toggleOption` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect((wrapper.vm.$ as any).provides.toggleOption[0]).toEqual((wrapper.vm.$ as any).setupState.toggleOption);
    });

    it('provides the `optionIsActive` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect((wrapper.vm.$ as any).provides.optionIsActive[0]).toEqual((wrapper.vm.$ as any).setupState.optionIsActive);
    });

    it('provides the `setActiveOption` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect((wrapper.vm.$ as any).provides.setActiveOption[0]).toEqual((wrapper.vm.$ as any).setupState.setActiveOption);
    });

    it('provides the `dropdownBottomReachedHandler` method', () => {
      const wrapper = shallowMount(TRichSelect);

      expect((wrapper.vm.$ as any).provides.dropdownBottomReachedHandler[0]).toEqual((wrapper.vm.$ as any).setupState.dropdownBottomReachedHandler);
    });

    it('provides the `optionIsSelected` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect((wrapper.vm.$ as any).provides.optionIsSelected).toEqual((wrapper.vm.$ as any).setupState.optionIsSelected);
    });

    it('provides the `keydownDownHandler` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect((wrapper.vm.$ as any).provides.keydownDownHandler).toEqual((wrapper.vm.$ as any).setupState.keydownDownHandler);
    });
    it('provides the `keydownUpHandler` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect((wrapper.vm.$ as any).provides.keydownUpHandler).toEqual((wrapper.vm.$ as any).setupState.keydownUpHandler);
    });

    it('provides the `keydownEnterHandler` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect((wrapper.vm.$ as any).provides.keydownEnterHandler).toEqual((wrapper.vm.$ as any).setupState.keydownEnterHandler);
    });

    it('provides the `keydownEscHandler` method`', () => {
      const wrapper = shallowMount(TRichSelect);

      expect((wrapper.vm.$ as any).provides.keydownEscHandler).toEqual((wrapper.vm.$ as any).setupState.keydownEscHandler);
    });

    it('provides the `showSearchInput` computed property', () => {
      const wrapper = shallowMount(TRichSelect);
      expect((wrapper.vm.$ as any).provides.showSearchInput.value).toEqual((wrapper.vm.$ as any).setupState.showSearchInput);
    });

    it('provides the `needsMoreCharsMessage` computed property', () => {
      const wrapper = shallowMount(TRichSelect);
      expect((wrapper.vm.$ as any).provides.needsMoreCharsMessage.value).toEqual('Please enter undefined or more characters');
    });

    it('provides the `searchQuery` ref', () => {
      const wrapper = shallowMount(TRichSelect);
      expect((wrapper.vm.$ as any).provides.searchQuery.value).toEqual((wrapper.vm.$ as any).setupState.searchQuery);
    });

    it('provides the `fetchingOptions` ref', () => {
      const wrapper = shallowMount(TRichSelect);
      expect((wrapper.vm.$ as any).provides.fetchingOptions.value).toBe(false);
    });

    it('provides the `fetchingMoreOptions` ref', () => {
      const wrapper = shallowMount(TRichSelect);
      expect((wrapper.vm.$ as any).provides.fetchingMoreOptions.value).toBe(false);
    });

    it('provides the `usesTags` ref', () => {
      const wrapper = shallowMount(TRichSelect);
      expect((wrapper.vm.$ as any).provides.usesTags.value).toBe(false);
    });
  });

  describe('usesTags', () => {
    it('determines it uses tags if tags is set and is multiple', () => {
      const wrapper = shallowMount(TRichSelect, {
        props: {
          tags: true,
          multiple: true,
        },
      });

      expect(wrapper.vm.usesTags).toBe(true);
    });

    it('determines it doesnt uses tags if tags is set but is no multiple', () => {
      const wrapper = shallowMount(TRichSelect, {
        props: {
          tags: true,
          multiple: false,
        },
      });

      expect(wrapper.vm.usesTags).toBe(false);
    });

    it('determines it doesnt uses tags if tags is not set even if is multiple', () => {
      const wrapper = shallowMount(TRichSelect, {
        props: {
          tags: false,
          multiple: true,
        },
      });

      expect(wrapper.vm.usesTags).toBe(false);
    });

    it('uses a button for the dropdown trigger if not uses tags', () => {
      const wrapper = shallowMount(TRichSelect, {
        props: {
          tags: false,
        },
      });

      expect((wrapper.vm.$refs.dropdownComponent as any).tagName).toBe('button');
    });

    it('uses a div for the dropdown trigger if uses tags', () => {
      const wrapper = shallowMount(TRichSelect, {
        props: {
          tags: true,
          multiple: true,
        },
      });

      expect((wrapper.vm.$refs.dropdownComponent as any).tagName).toBe('div');
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

      expect((wrapper.vm.$ as any).provides.selectedOption.value).toEqual({
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

      expect((wrapper.vm.$ as any).provides.selectedOption.value).toBeUndefined();
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

      expect((wrapper.vm.$ as any).provides.selectedOption.value).toEqual({
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

      expect((wrapper.vm.$ as any).provides.selectedOption.value).toBeUndefined();
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
      ['onShown', 'shownHandler'],
      ['onHidden', 'hiddenHandler'],
      ['onBeforeShow', 'beforeShowHandler'],
      ['onBeforeHide', 'beforeHideHandler'],
      ['onBlur', 'blurHandler'],
      ['onFocus', 'focusHandler'],
      ['onMousedown', 'mousedownHandler'],
      ['onBlurOnChild', 'blurOnChildHandler'],
    ])('has the `%s` event handler pointing to `%s`', (eventName, eventHandlerName) => {
      const wrapper = shallowMount(TRichSelect);
      const component = wrapper.vm.$refs.dropdownComponent as any;

      expect(componentHasAttributeWithValue(component, eventName, (wrapper.vm as any)[eventHandlerName])).toBe(true);
    });

    it('hides the dropdown with blurHandler', () => {
      const wrapper = shallowMount(TRichSelect, {
        global: {
          stubs: {
            TDropdown: TDropdownComponentMock,
          },
        },
      });
      wrapper.vm.shown = true;
      const event = new FocusEvent('blur');
      wrapper.vm.blurHandler(event);
      expect(dropdownDoHideMock).toHaveBeenCalled();
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
        const wrapper = shallowMount(TRichSelect, {
          props: {
            closeOnSelect: true,
          },
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });

        wrapper.vm.shown = true;

        wrapper.vm.onOptionSelected();

        expect(dropdownDoHideMock).toHaveBeenCalled();
        expect(focusDropdownTriggerMock).toHaveBeenCalled();
      });

      it('hides the dropdown if `closeOnSelect` is `undefined` and is not multiple', async () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            closeOnSelect: undefined,
            multiple: false,
          },
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });
        wrapper.vm.shown = true;

        wrapper.vm.onOptionSelected();
        expect(dropdownDoHideMock).toHaveBeenCalled();
        expect(focusDropdownTriggerMock).toHaveBeenCalled();
      });

      it('doesnt hides the dropdown if `closeOnSelect` is `undefined` and is multiple', async () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            closeOnSelect: undefined,
            multiple: true,
          },
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });

        wrapper.vm.shown = true;

        wrapper.vm.onOptionSelected();

        expect(dropdownDoHideMock).not.toHaveBeenCalled();
        expect(focusDropdownTriggerMock).not.toHaveBeenCalled();
      });

      it('doesnt hides the dropdown if is already hidden', async () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            closeOnSelect: true,
          },
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });

        wrapper.vm.onOptionSelected();
        expect(dropdownDoHideMock).not.toHaveBeenCalled();
        expect(focusDropdownTriggerMock).not.toHaveBeenCalled();
      });
    });

    describe('focusHandler', () => {
      it('shows the dropdown with focusHandler when `toggleOnFocus` is set', () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnFocus: true,
          },
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });
        const event = new FocusEvent('focus');
        wrapper.vm.focusHandler(event);
        expect(dropdownDoShowMock).toHaveBeenCalled();
        expect(wrapper.emitted().focus).toEqual([[event]]);
      });

      it('doesnt shows the dropdown with focusHandler when `toggleOnFocus` is set to `false`', () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnFocus: false,
          },
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });
        const event = new FocusEvent('focus');
        wrapper.vm.focusHandler(event);
        expect(wrapper.vm.shown).toBe(false);
        expect(dropdownDoShowMock).not.toHaveBeenCalled();
        expect(wrapper.emitted().focus).toEqual([[event]]);
      });
    });

    describe('mousedownHandler', () => {
      it('shows the dropdown when `toggleOnClick` is set', () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: true,
          },
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });
        const event = new MouseEvent('click');
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        wrapper.vm.mousedownHandler(event);
        expect(dropdownDoShowMock).toHaveBeenCalled();
        expect(wrapper.emitted().mousedown).toEqual([[event]]);
        expect(preventDefaultSpy).toHaveBeenCalled();
      });

      it('doesnt shows the dropdown when `toggleOnClick` is not set', () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: false,
          },
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });
        const event = new MouseEvent('click');
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        wrapper.vm.mousedownHandler(event);
        expect(dropdownDoShowMock).not.toHaveBeenCalled();
        expect(wrapper.emitted().mousedown).toEqual([[event]]);
        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });

      it('doesnt call the `preventDefault` method if search box is hidden', () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: true,
            hideSearchBox: true,
          },
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
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
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });
        wrapper.vm.shown = true;
        const event = new MouseEvent('click');
        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');
        wrapper.vm.mousedownHandler(event);
        expect(dropdownDoHideMock).toHaveBeenCalled();
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
        expect(dropdownDoHideMock).not.toHaveBeenCalled();
        expect(wrapper.emitted().mousedown).toEqual([[event]]);
        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });
    });

    describe('blurOnChildHandler', () => {
      it('will restore the original focus when blurred from the focusable item to a child not focusable element', () => {
        const wrapper = shallowMount(TRichSelect);
        wrapper.vm.shown = true;

        const target = document.createElement('DIV');
        const relatedTarget = document.createElement('DIV');

        target.setAttribute('data-rich-select-focusable', 'true');
        const focusSpy = jest.spyOn(target, 'focus');

        wrapper.vm.blurOnChildHandler({ target, relatedTarget } as unknown as FocusEvent);
        expect(focusSpy).toHaveBeenCalled();
        expect(wrapper.vm.shown).toBe(true);
      });

      it('will not restore the original focus when blurred between two focusable childs', () => {
        const wrapper = shallowMount(TRichSelect);
        wrapper.vm.shown = true;

        const target = document.createElement('DIV');
        target.setAttribute('data-rich-select-focusable', 'true');

        const relatedTarget = document.createElement('DIV');
        relatedTarget.setAttribute('data-rich-select-focusable', 'true');

        const focusSpy = jest.spyOn(target, 'focus');

        wrapper.vm.blurOnChildHandler({ target, relatedTarget } as unknown as FocusEvent);
        expect(focusSpy).not.toHaveBeenCalled();
        expect(wrapper.vm.shown).toBe(true);
      });

      it('will not restore the original focus when blurred to an undefined item', () => {
        const wrapper = shallowMount(TRichSelect);
        wrapper.vm.shown = true;

        const target = document.createElement('DIV');
        target.setAttribute('data-rich-select-focusable', 'true');

        const focusSpy = jest.spyOn(target, 'focus');

        wrapper.vm.blurOnChildHandler({ target, relatedTarget: undefined } as unknown as FocusEvent);
        expect(focusSpy).not.toHaveBeenCalled();
        expect(wrapper.vm.shown).toBe(true);
      });
    });

    describe('shownHandler', () => {
      it('sets shown as true when called', () => {
        const wrapper = shallowMount(TRichSelect);
        expect(wrapper.vm.shown).toBe(false);
        wrapper.vm.shownHandler();
        expect(wrapper.vm.shown).toBe(true);
        expect(wrapper.emitted()).toHaveProperty('shown');
      });
    });

    describe('hiddenHandler', () => {
      it('sets shown as false when called', () => {
        const wrapper = shallowMount(TRichSelect);
        wrapper.vm.shown = true;
        wrapper.vm.hiddenHandler();
        expect(wrapper.vm.shown).toBe(false);
        expect(wrapper.emitted()).toHaveProperty('hidden');
      });
    });

    describe('beforeShowHandler', () => {
      it('sets active option when is about to show the dropdown', () => {
        const wrapper = shallowMount(TRichSelect);
        const initActiveOptionSpy = jest.spyOn((wrapper.vm.$ as any).setupState, 'initActiveOption');
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

        const selectOptionFromActiveOptionSpy = jest.spyOn((wrapper.vm.$ as any).setupState, 'selectOptionFromActiveOption');
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

        const selectOptionFromActiveOptionSpy = jest.spyOn((wrapper.vm.$ as any).setupState, 'selectOptionFromActiveOption');
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

        const selectOptionFromActiveOptionSpy = jest.spyOn((wrapper.vm.$ as any).setupState, 'selectOptionFromActiveOption');
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

        const selectOptionFromActiveOptionSpy = jest.spyOn((wrapper.vm.$ as any).setupState, 'selectOptionFromActiveOption');
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
    ])('re-emits the event `%s`', (eventName, parameterName) => {
      const wrapper = shallowMount(TRichSelect);
      const component = wrapper.vm.$refs.dropdownComponent as any;

      expect(componentHasAttributeWithInlineHandlerAndParameter(component, eventName, parameterName)).toBe(true);
    });

    it.each([
      'mouseover',
      'mouseleave',
    ])('re-emits dropdown events', (eventName) => {
      const wrapper = shallowMount(TRichSelect);
      const component = wrapper.vm.$refs.dropdownComponent as any;

      const event = new MouseEvent(eventName);
      component.$el.dispatchEvent(event);

      expect(wrapper.emitted()).toHaveProperty(eventName);
      expect(wrapper.emitted()[eventName][0]).toEqual([event]);
    });

    it('re-emits dropdown touchstart event', () => {
      const wrapper = shallowMount(TRichSelect);
      const component = wrapper.vm.$refs.dropdownComponent as any;

      const event = new TouchEvent('touchstart');
      component.$el.dispatchEvent(event);

      expect(wrapper.emitted()).toHaveProperty('touchstart');
      expect(wrapper.emitted().touchstart[0]).toEqual([event]);
    });

    describe('esc key', () => {
      it('hides the dropdown and focus the trigger when pressed esc', async () => {
        const wrapper = shallowMount(TRichSelect, {
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });

        wrapper.vm.shown = true;

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        dropdownComponent.$el.dispatchEvent(event);

        expect(dropdownDoHideMock).toHaveBeenCalled();
        expect(focusDropdownTriggerMock).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });

      it('only re-emits the keyboard event when dropdown is closed ', async () => {
        const wrapper = shallowMount(TRichSelect, {
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        dropdownComponent.$el.dispatchEvent(event);

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
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'Space',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdownComponent.$el.dispatchEvent(event);

        expect(dropdownDoShowMock).toHaveBeenCalled();
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });

      it('doesnt shows the dropdown if `toggleOnClick` is not set', async () => {
        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: false,
          },
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'Space',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdownComponent.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(false);
        expect(dropdownDoShowMock).not.toHaveBeenCalled();
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

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'Space',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        expect((wrapper.vm.$ as any).setupState.localValue).toBe(undefined);

        dropdownComponent.$el.dispatchEvent(event);

        expect((wrapper.vm.$ as any).setupState.localValue).toBe(1);
        expect(wrapper.vm.shown).toBe(true);
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);

        dropdownComponent.$el.dispatchEvent(event);

        expect((wrapper.vm.$ as any).setupState.localValue).toBe(undefined);
        expect(wrapper.vm.shown).toBe(true);
      });

      it('toggles the active option if dropdown is shown when no active option', async () => {
        const wrapper = shallowMount(TRichSelect);

        wrapper.vm.shown = true;

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'Space',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdownComponent.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(true);
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });
    });

    describe('enter key', () => {
      it('doesnt shows the dropdown when hidden', async () => {
        const wrapper = shallowMount(TRichSelect, {
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'Enter',
        });

        dropdownComponent.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(false);
        expect(dropdownDoShowMock).not.toHaveBeenCalled();
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

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'Enter',
        });

        expect((wrapper.vm.$ as any).setupState.localValue).toBe(undefined);

        dropdownComponent.$el.dispatchEvent(event);

        expect((wrapper.vm.$ as any).setupState.localValue).toBe(1);
        expect(wrapper.vm.shown).toBe(true);
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);

        dropdownComponent.$el.dispatchEvent(event);

        expect((wrapper.vm.$ as any).setupState.localValue).toBe(undefined);
        expect(wrapper.vm.shown).toBe(true);
      });

      it('toggles the active option if dropdown is shown when no active option', async () => {
        const wrapper = shallowMount(TRichSelect);

        wrapper.vm.shown = true;

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'Enter',
        });

        dropdownComponent.$el.dispatchEvent(event);

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
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'ArrowUp',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdownComponent.$el.dispatchEvent(event);

        expect(dropdownDoShowMock).toHaveBeenCalled();
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

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'ArrowUp',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdownComponent.$el.dispatchEvent(event);

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
          global: {
            stubs: {
              TDropdown: TDropdownComponentMock,
            },
          },
        });

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdownComponent.$el.dispatchEvent(event);

        expect(dropdownDoShowMock).toHaveBeenCalled();
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

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
        });

        const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

        dropdownComponent.$el.dispatchEvent(event);

        expect(wrapper.vm.shown).toBe(true);
        expect(wrapper.vm.activeOption).toEqual({ value: 2, text: 2, raw: 2 } as NormalizedOption);
        expect(preventDefaultSpy).toHaveBeenCalled();
        expect(wrapper.emitted()).toHaveProperty('keydown');
        expect(wrapper.emitted().keydown[0]).toEqual([event]);
      });

      it('calls the fetchMoreOptions method if press down, is last item and have more options to fetch', async () => {
        const responsePromise = new Promise((resolve) => {
          resolve({
            results: [1, 2],
            hasMorePages: true,
          });
        });
        const fetchOptionsMock = jest.fn().mockReturnValue(responsePromise);

        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: true,
            fetchOptions: fetchOptionsMock,
            delay: 0,
          },
        });

        wrapper.vm.shown = true;

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
        });

        // So it calls the fetchOptions method
        wrapper.vm.beforeShowHandler();

        // Should be called with `undefined` search query and `undefined` next page.
        expect(fetchOptionsMock).toHaveBeenLastCalledWith(undefined, undefined);
        expect(fetchOptionsMock).toHaveBeenCalledTimes(1);

        // Wait until options were fetched.
        await wrapper.vm.$nextTick();
        // Wait until options were stored in the state
        await wrapper.vm.$nextTick();

        // Active option is first one
        expect(wrapper.vm.activeOption!.value).toEqual(1);
        // Not called again yet
        await wrapper.vm.$nextTick();
        expect(fetchOptionsMock).toHaveBeenCalledTimes(1);

        // Press down one time
        dropdownComponent.$el.dispatchEvent(event);
        // now the active option is last loaded one
        expect(wrapper.vm.activeOption!.value).toEqual(2);
        await wrapper.vm.$nextTick();
        // Called again
        expect(fetchOptionsMock).toHaveBeenCalledTimes(2);
        // No search query but page 2
        expect(fetchOptionsMock).toHaveBeenLastCalledWith(undefined, 2);
      });

      it('doesnt calls the fetchMoreOptions method if press down if is last item if no have more options to fetch', async () => {
        const responsePromise = new Promise((resolve) => {
          resolve({
            results: [1, 2],
          });
        });
        const fetchOptionsMock = jest.fn().mockReturnValue(responsePromise);

        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: true,
            fetchOptions: fetchOptionsMock,
            delay: 0,
          },
        });

        wrapper.vm.shown = true;

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
        });

        // So it calls the fetchOptions method
        wrapper.vm.beforeShowHandler();

        // Should be called with `undefined` search query and `undefined` next page.
        expect(fetchOptionsMock).toHaveBeenLastCalledWith(undefined, undefined);
        expect(fetchOptionsMock).toHaveBeenCalledTimes(1);

        // Wait until options were fetched.
        await wrapper.vm.$nextTick();
        // Wait until options were stored in the state
        await wrapper.vm.$nextTick();

        // Active option is first one
        expect(wrapper.vm.activeOption!.value).toEqual(1);
        // Not called again yet
        await wrapper.vm.$nextTick();
        expect(fetchOptionsMock).toHaveBeenCalledTimes(1);

        // Press down one time
        dropdownComponent.$el.dispatchEvent(event);
        // now the active option is last loaded one
        expect(wrapper.vm.activeOption!.value).toEqual(2);
        await wrapper.vm.$nextTick();
        // But it not calls the fetchOptions method
        expect(fetchOptionsMock).toHaveBeenCalledTimes(1);
      });

      it('doesnt calls the fetchMoreOptions method if press down if is currently loading more options', async () => {
        const responsePromise1 = new Promise((resolve) => {
          resolve({
            results: [1, 2],
            hasMorePages: true,
          });
        });
        const responsePromise2 = new Promise(() => {
          // Never resolves
        });
        const fetchOptionsMock = jest.fn().mockReturnValue(responsePromise1);

        const wrapper = shallowMount(TRichSelect, {
          props: {
            toggleOnClick: true,
            fetchOptions: fetchOptionsMock,
            delay: 0,
          },
        });

        wrapper.vm.shown = true;

        const dropdownComponent = wrapper.vm.$refs.dropdownComponent as any;

        const event = new KeyboardEvent('keydown', {
          key: 'ArrowDown',
        });

        // So it calls the fetchOptions method
        wrapper.vm.beforeShowHandler();

        // Should be called with `undefined` search query and `undefined` next page.
        expect(fetchOptionsMock).toHaveBeenLastCalledWith(undefined, undefined);
        expect(fetchOptionsMock).toHaveBeenCalledTimes(1);

        // Wait until options were fetched.
        await wrapper.vm.$nextTick();
        // Wait until options were stored in the state
        await wrapper.vm.$nextTick();

        // Active option is first one
        expect(wrapper.vm.activeOption!.value).toEqual(1);
        // Not called again yet
        await wrapper.vm.$nextTick();
        expect(fetchOptionsMock).toHaveBeenCalledTimes(1);

        fetchOptionsMock.mockReturnValue(responsePromise2);

        // Press down one time
        dropdownComponent.$el.dispatchEvent(event);
        // now the active option is last loaded one
        expect(wrapper.vm.activeOption!.value).toEqual(2);
        await wrapper.vm.$nextTick();
        // Called again
        expect(fetchOptionsMock).toHaveBeenCalledTimes(2);
        // No search query but page 2
        expect(fetchOptionsMock).toHaveBeenLastCalledWith(undefined, 2);

        // Wait until options call is resolved (that will never happen in this test
        // to emulate a busy state)
        await wrapper.vm.$nextTick();

        // Press down one time
        dropdownComponent.$el.dispatchEvent(event);

        await wrapper.vm.$nextTick();
        // Was not called again (still called twice) since its busy
        expect(fetchOptionsMock).toHaveBeenCalledTimes(2);
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

    it('emits a `fetch-options-success` event with the response', async () => {
      const response = {
        results: [1, 2],
      };

      const fetchOptions = () => new Promise((resolve) => {
        resolve(response);
      });

      const wrapper = shallowMount(TRichSelect, {
        props: {
          fetchOptions,
          delay: 0,
        } as any,
      });

      (wrapper.vm.$ as any).setupState.doFetchOptions();

      await wrapper.vm.$nextTick();

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('fetch-options-success')).toEqual([[response]]);
    });

    it('emits a `fetch-options-error` event when an exception occurs', async () => {
      const error = new Error('test');

      const fetchOptions = () => new Promise((_resolve, reject) => {
        reject(error);
      });

      const wrapper = shallowMount(TRichSelect, {
        props: {
          fetchOptions,
          delay: 0,
        } as any,
      });

      (wrapper.vm.$ as any).setupState.doFetchOptions();

      await wrapper.vm.$nextTick();

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted('fetch-options-error')).toEqual([[error]]);
    });

    it('fetch the options when prefetchOptions option is set', () => {
      shallowMount(TRichSelect, {
        props: {
          fetchOptions: () => {},
          prefetchOptions: true,
        } as any,
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

  describe('fetch options when dropdown bottom reached', () => {
    it('fetchs more options when dropdownBottomReachedHandler called if has more pages', async () => {
      const responsePromise = new Promise((resolve) => {
        resolve({
          results: [1, 2],
          hasMorePages: true,
        });
      });

      const fetchOptionsMock = jest.fn().mockReturnValue(responsePromise);

      const wrapper = shallowMount(TRichSelect, {
        props: {
          toggleOnClick: true,
          fetchOptions: fetchOptionsMock,
          delay: 0,
        },
      });

      wrapper.vm.shown = true;

      // So it calls the fetchOptions method the first time
      wrapper.vm.beforeShowHandler();

      // Should be called with `undefined` search query and `undefined` next page.
      expect(fetchOptionsMock).toHaveBeenLastCalledWith(undefined, undefined);
      expect(fetchOptionsMock).toHaveBeenCalledTimes(1);

      // Wait until options were fetched.
      await wrapper.vm.$nextTick();
      // Wait until options were stored in the state
      await wrapper.vm.$nextTick();

      (wrapper.vm.$ as any).provides.dropdownBottomReachedHandler();

      // Called again
      expect(fetchOptionsMock).toHaveBeenCalledTimes(2);
      // No search query but page 2
      expect(fetchOptionsMock).toHaveBeenLastCalledWith(undefined, 2);
    });

    it('doesnt fetch more options when dropdownBottomReachedHandler called if no more pages', async () => {
      const responsePromise = new Promise((resolve) => {
        resolve({
          results: [1, 2],
          hasMorePages: false,
        });
      });

      const fetchOptionsMock = jest.fn().mockReturnValue(responsePromise);

      const wrapper = shallowMount(TRichSelect, {
        props: {
          toggleOnClick: true,
          fetchOptions: fetchOptionsMock,
          delay: 0,
        },
      });

      wrapper.vm.shown = true;

      // So it calls the fetchOptions method the first time
      wrapper.vm.beforeShowHandler();

      // Should be called with `undefined` search query and `undefined` next page.
      expect(fetchOptionsMock).toHaveBeenLastCalledWith(undefined, undefined);
      expect(fetchOptionsMock).toHaveBeenCalledTimes(1);

      // Wait until options were fetched.
      await wrapper.vm.$nextTick();
      // Wait until options were stored in the state
      await wrapper.vm.$nextTick();

      (wrapper.vm.$ as any).provides.dropdownBottomReachedHandler();

      // Still called 1 time
      expect(fetchOptionsMock).toHaveBeenCalledTimes(1);
    });

    it('doesnt fetchs more options when dropdownBottomReachedHandler called if previous call is busy', async () => {
      const responsePromise = new Promise((resolve) => {
        resolve({
          results: [1, 2],
          hasMorePages: true,
        });
      });

      const responsePromise2 = new Promise(() => {
        // never resolve
      });

      const fetchOptionsMock = jest.fn().mockReturnValue(responsePromise);

      const wrapper = shallowMount(TRichSelect, {
        props: {
          toggleOnClick: true,
          fetchOptions: fetchOptionsMock,
          delay: 0,
        },
      });

      wrapper.vm.shown = true;

      // So it calls the fetchOptions method the first time
      wrapper.vm.beforeShowHandler();

      // Should be called with `undefined` search query and `undefined` next page.
      expect(fetchOptionsMock).toHaveBeenLastCalledWith(undefined, undefined);
      expect(fetchOptionsMock).toHaveBeenCalledTimes(1);

      // Wait until options were fetched.
      await wrapper.vm.$nextTick();
      // Wait until options were stored in the state
      await wrapper.vm.$nextTick();

      (wrapper.vm.$ as any).provides.dropdownBottomReachedHandler();

      // Called again
      expect(fetchOptionsMock).toHaveBeenCalledTimes(2);
      // No search query but now uses page 2
      expect(fetchOptionsMock).toHaveBeenLastCalledWith(undefined, 2);

      fetchOptionsMock.mockReturnValue(responsePromise2);

      (wrapper.vm.$ as any).provides.dropdownBottomReachedHandler();

      // Bottom reached again but previous call is still busy
      (wrapper.vm.$ as any).provides.dropdownBottomReachedHandler();

      await wrapper.vm.$nextTick();
      // Was not called again (still called twice) since its busy
      expect(fetchOptionsMock).toHaveBeenCalledTimes(2);
    });

    it('calls the fetchOptionsCancel method when component unmonted', () => {
      const wrapper = shallowMount(TRichSelect);

      const cancelSpy = jest.spyOn((wrapper.vm.$ as any).setupState, 'fetchOptionsCancel');

      wrapper.unmount();

      expect(cancelSpy).toHaveBeenCalled();
    });
  });

  describe('show search input condition', () => {
    it('hides the search input if `hideSearchbox` is set', () => {
      const wrapper = shallowMount(TRichSelect, {
        props: {
          hideSearchBox: true,
        },
      });

      expect(wrapper.vm.showSearchInput).toBe(false);
    });

    it('hides the search input `minimumResultsForSearch` is set and we have more options than the limit', () => {
      const wrapper = shallowMount(TRichSelect, {
        props: {
          options: ['1', '2', '3'],
          minimumResultsForSearch: 4,
        },
      });

      expect(wrapper.vm.showSearchInput).toBe(false);
    });

    it('shows the search input `minimumResultsForSearch` is set and we have the same options as the limit', () => {
      const wrapper = shallowMount(TRichSelect, {
        props: {
          options: ['1', '2', '3'],
          minimumResultsForSearch: 3,
        },
      });

      expect(wrapper.vm.showSearchInput).toBe(true);
    });

    it('shows the search input `minimumResultsForSearch` is set and we have the more options than the limit', () => {
      const wrapper = shallowMount(TRichSelect, {
        props: {
          options: ['1', '2', '3', '4'],
          minimumResultsForSearch: 3,
        },
      });

      expect(wrapper.vm.showSearchInput).toBe(true);
    });

    it('shows the search input if `minimumResultsForSearch` is not set and `hideSearchBox` is set to `false`', () => {
      const wrapper = shallowMount(TRichSelect, {
        props: {
          hideSearchBox: false,
        },
      });

      expect(wrapper.vm.showSearchInput).toBe(true);
    });
  });
});
