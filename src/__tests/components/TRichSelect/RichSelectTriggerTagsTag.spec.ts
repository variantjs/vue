import { NormalizedOption } from '@variantjs/core';
import { shallowMount } from '@vue/test-utils';
import { computed } from 'vue';
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
