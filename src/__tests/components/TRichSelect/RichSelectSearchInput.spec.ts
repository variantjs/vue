import { shallowMount } from '@vue/test-utils';
import { ref } from 'vue';
import RichSelectSearchInput from '../../../components/TRichSelect/RichSelectSearchInput.vue';

describe('RichSelectSearchInput', () => {
  const keydownDownHandler = jest.fn();
  const keydownUpHandler = jest.fn();
  const keydownEnterHandler = jest.fn();
  const keydownEscHandler = jest.fn();

  const global = {
    provide: {
      shown: ref(true),
      searchQuery: ref(''),
      keydownDownHandler,
      keydownUpHandler,
      keydownEnterHandler,
      keydownEscHandler,
    },
  };

  const wrapper = shallowMount(RichSelectSearchInput, { global });

  const search = wrapper.vm.$refs.search as HTMLInputElement;

  it('renders the component without errors', () => {
    expect(wrapper.vm.$el.tagName).toBe('DIV');
  });

  it('calls the keydownDownHandler when down key pressed', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });

    search.dispatchEvent(event);

    expect(keydownDownHandler).toHaveBeenCalled();
  });

  it('calls the keydownUpHandler when down key pressed', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });

    search.dispatchEvent(event);

    expect(keydownUpHandler).toHaveBeenCalled();
  });

  it('calls the keydownEnterHandler when down key pressed', () => {
    const event = new KeyboardEvent('keydown', { key: 'enter' });

    search.dispatchEvent(event);

    expect(keydownEnterHandler).toHaveBeenCalled();
  });

  it('calls the keydownEscHandler when down key pressed', () => {
    const event = new KeyboardEvent('keydown', { key: 'esc' });

    search.dispatchEvent(event);

    expect(keydownEscHandler).toHaveBeenCalled();
  });
});
