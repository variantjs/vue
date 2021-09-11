import { shallowMount } from '@vue/test-utils';
import RichSelectTriggerTagsTag from '../../../components/TRichSelect/RichSelectTriggerTagsTag.vue';

describe('RichSelectTriggerTagsTag', () => {
  const toggleOptionMock = jest.fn();
  const props = {
    option: {
      value: 'a',
      text: 'Letter A',
    },
  };

  const global = {
    provide: {
      toggleOption: toggleOptionMock,
    },
  };

  afterEach(() => {
    toggleOptionMock.mockReset();

    jest.clearAllMocks();
  });

  it('contains the option text', () => {
    const wrapper = shallowMount(RichSelectTriggerTagsTag, {
      props,
      global,
    });

    expect(wrapper.text()).toEqual('Letter A');
  });

  describe('event handlers', () => {
    it('has the focus method attached to the mousedown handler', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const focusSpy = jest.spyOn(wrapper.vm, 'focus');
      wrapper.vm.$el.dispatchEvent(new Event('mousedown'));
      expect(focusSpy).toHaveBeenCalled();
    });

    it('calls the unselect method when backspace key is pressed', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const unselectSpy = jest.spyOn(wrapper.vm, 'unselect');
      wrapper.vm.$el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
      expect(unselectSpy).toHaveBeenCalled();
    });

    it('calls the focusNextElement method when right key is pressed', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const focusNextElementSpy = jest.spyOn(wrapper.vm, 'focusNextElement');
      wrapper.vm.$el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
      expect(focusNextElementSpy).toHaveBeenCalled();
    });

    it('calls the focusPrevElement method when left key is pressed', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const focusPrevElementSpy = jest.spyOn(wrapper.vm, 'focusPrevElement');
      wrapper.vm.$el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      expect(focusPrevElementSpy).toHaveBeenCalled();
    });

    it('prevents event propagation when enter key is pressed', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const event = new KeyboardEvent('keydown', { key: 'enter' });
      const stopPropagationSpy = jest.spyOn(event, 'stopPropagation');
      wrapper.vm.$el.dispatchEvent(event);
      expect(stopPropagationSpy).toHaveBeenCalled();
    });
  });

  describe('delete button event handlers', () => {
    it('calls the unselect method when mousedown', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const deleteButton = wrapper.vm.$el.querySelector('[tabindex="0"]');
      const unselectSpy = jest.spyOn(wrapper.vm, 'unselect');
      deleteButton.dispatchEvent(new Event('mousedown'));
      expect(unselectSpy).toHaveBeenCalled();
    });

    it('calls the unselect method when backspace pressed', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const deleteButton = wrapper.vm.$el.querySelector('[tabindex="0"]');
      const unselectSpy = jest.spyOn(wrapper.vm, 'unselect');
      deleteButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
      expect(unselectSpy).toHaveBeenCalled();
    });

    it('calls the unselect method when enter pressed', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const deleteButton = wrapper.vm.$el.querySelector('[tabindex="0"]');
      const unselectSpy = jest.spyOn(wrapper.vm, 'unselect');
      deleteButton.dispatchEvent(new KeyboardEvent('keydown', { key: 'enter' }));
      expect(unselectSpy).toHaveBeenCalled();
    });
  });

  describe('focusNextElement', () => {
    it('focus the next element', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const parentElement = document.createElement('div');
      const nextElement = document.createElement('button');

      [
        document.createElement('button'),
        document.createElement('button'),
        wrapper.vm.$el,
        nextElement,
      ].forEach((el) => parentElement.appendChild(el));

      jest.spyOn(window.HTMLButtonElement.prototype, 'parentElement', 'get').mockReturnValue(parentElement);

      const focusSpy = jest.spyOn(nextElement, 'focus');

      wrapper.vm.focusNextElement();

      expect(focusSpy).toHaveBeenCalled();
    });

    it('doesnt focus the next element if is last index', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const parentElement = document.createElement('div');

      [
        document.createElement('button'),
        document.createElement('button'),
        wrapper.vm.$el,
      ].forEach((el) => parentElement.appendChild(el));

      jest.spyOn(window.HTMLButtonElement.prototype, 'parentElement', 'get').mockReturnValue(parentElement);

      const focusSpy = jest.spyOn(window.HTMLButtonElement.prototype, 'focus');

      wrapper.vm.focusNextElement();

      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe('focus previous element', () => {
    it('focus previous element', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const parentElement = document.createElement('div');
      const prevElement = document.createElement('button');

      [
        document.createElement('button'),
        document.createElement('button'),
        prevElement,
        wrapper.vm.$el,
      ].forEach((el) => parentElement.appendChild(el));

      jest.spyOn(window.HTMLButtonElement.prototype, 'parentElement', 'get').mockReturnValue(parentElement);

      const focusSpy = jest.spyOn(prevElement, 'focus');

      wrapper.vm.focusPrevElement();

      expect(focusSpy).toHaveBeenCalled();
    });

    it('doesnt focus previous element if is the first one', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const parentElement = document.createElement('div');
      [
        wrapper.vm.$el,
        document.createElement('button'),
        document.createElement('button'),
      ].forEach((el) => parentElement.appendChild(el));

      jest.spyOn(window.HTMLButtonElement.prototype, 'parentElement', 'get').mockReturnValue(parentElement);

      const focusSpy = jest.spyOn(window.HTMLButtonElement.prototype, 'focus');

      wrapper.vm.focusPrevElement();

      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe('unselect method', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('calls the toggleOption method', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      wrapper.vm.unselect();

      expect(toggleOptionMock).toHaveBeenCalled();
    });

    it('gets the element index', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const parentElement = document.createElement('div');

      [
        document.createElement('button'),
        document.createElement('button'),
        wrapper.vm.$el,
        document.createElement('button'),
      ].forEach((el) => parentElement.appendChild(el));

      jest.spyOn(window.HTMLButtonElement.prototype, 'parentElement', 'get').mockReturnValue(parentElement);

      expect(wrapper.vm.getElementIndex()).toBe(2);
    });

    it('focus the equivalent element if the index still exists after unselected', async () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const parentElement = document.createElement('div');

      const elToFocus = document.createElement('button');

      [
        document.createElement('button'),
        document.createElement('button'),
        elToFocus,
      ].forEach((el) => parentElement.appendChild(el));

      jest.spyOn(window.HTMLButtonElement.prototype, 'parentElement', 'get').mockReturnValue(parentElement);
      jest.spyOn(wrapper.vm, 'getElementIndex').mockReturnValue(2);

      const focusSpy = jest.spyOn(elToFocus, 'focus');

      wrapper.vm.unselect();

      await wrapper.vm.$nextTick();

      expect(focusSpy).toHaveBeenCalled();
    });
    it('focus the prev element element if the index doesnt exist anymore after unselected', async () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const parentElement = document.createElement('div');

      const elToFocus = document.createElement('button');

      [
        document.createElement('button'),
        elToFocus,
      ].forEach((el) => parentElement.appendChild(el));

      jest.spyOn(window.HTMLButtonElement.prototype, 'parentElement', 'get').mockReturnValue(parentElement);
      jest.spyOn(wrapper.vm, 'getElementIndex').mockReturnValue(2);

      const focusSpy = jest.spyOn(elToFocus, 'focus');

      wrapper.vm.unselect();

      await wrapper.vm.$nextTick();

      expect(focusSpy).toHaveBeenCalled();
    });

    it('doesnt focus anything if no option left to focus', async () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      const parentElement = document.createElement('div');

      jest.spyOn(window.HTMLButtonElement.prototype, 'parentElement', 'get').mockReturnValue(parentElement);

      jest.spyOn(wrapper.vm, 'getElementIndex').mockReturnValue(0);

      const focusSpy = jest.spyOn(window.HTMLButtonElement.prototype, 'focus');

      wrapper.vm.unselect();

      await wrapper.vm.$nextTick();

      expect(focusSpy).not.toHaveBeenCalled();
    });
  });

  describe('data-value attribute', () => {
    it('adds the data-value attribute', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props,
      });

      expect(wrapper.vm.$el.dataset.value).toBe('a');
    });

    it('returns the value stringified if is an object', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props: {
          option: {
            value: { foo: 'bar' },
            text: 'Foo Bar',
          },
        },
      });

      expect(wrapper.vm.dataValueAttribute).toEqual('{"foo":"bar"}');
    });

    it('returns the value as string if is not an object', () => {
      const wrapper = shallowMount(RichSelectTriggerTagsTag, {
        global,
        props: {
          option: {
            value: 3,
            text: 'Foo Bar',
          },
        },
      });

      expect(wrapper.vm.dataValueAttribute).toBe('3');
    });
  });
});
