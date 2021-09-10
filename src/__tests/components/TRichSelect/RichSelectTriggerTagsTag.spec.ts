import { NormalizedOption } from '@variantjs/core';
import { shallowMount } from '@vue/test-utils';
import { computed } from 'vue';
import RichSelectTriggerTagsTag from '../../../components/TRichSelect/RichSelectTriggerTagsTag.vue';
import { componentHasAttributeWithValue } from '../../testUtils';

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
