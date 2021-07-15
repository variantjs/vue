import { mount } from '@vue/test-utils';
import TAlert from '@/components/TAlert.vue';
import { TAlertConfig } from '@variantjs/core';
import { scopedParamsAsString, parseScopedParams } from '../testUtils';

describe('TAlert.vue', () => {
  it('renders the component without errors', () => {
    const wrapper = mount(TAlert, {
      slots: {
        default: 'Hello World!',
      },
    });

    expect(wrapper.vm.$el.textContent).toEqual('Hello World!');
    expect(wrapper.vm.$refs.wrapper).toBeTruthy();
    expect(wrapper.vm.$refs.body).toBeTruthy();
    expect(wrapper.vm.$refs.close).toBeTruthy();
    expect(wrapper.vm.$refs.closeIcon).toBeTruthy();
  });

  it('renders the `text` prop on the alert body', () => {
    const wrapper = mount(TAlert, {
      props: {
        text: 'Hello World!',
      },
    });

    expect(wrapper.vm.$el.textContent).toEqual('Hello World!');
  });

  it('prioritized the slot over the `text` prop', () => {
    const wrapper = mount(TAlert, {
      props: {
        text: 'Goodbye World!',
      },
      slots: {
        default: 'Hello World!',
      },
    });

    expect(wrapper.vm.$el.textContent).toEqual('Hello World!');
  });

  it('accepts a custom `tagName` for the alert wrapper', () => {
    const wrapper = mount(TAlert, {
      props: {
        tagName: 'fieldset',
      },
    });

    expect(wrapper.vm.$refs.wrapper.tagName).toBe('FIELDSET');
  });

  it('accepts a custom `bodyTagName` for the alert wrapper', () => {
    const wrapper = mount(TAlert, {
      props: {
        bodyTagName: 'fieldset',
      },
    });

    expect(wrapper.vm.$refs.body.tagName).toBe('FIELDSET');
  });

  it('hides the closeButton if `dismissible` is set to `false`', () => {
    const wrapper = mount(TAlert, {
      props: {
        dismissible: false,
      },
    });

    expect(wrapper.vm.$refs.close).toBeUndefined();
  });

  it('hides the component when the close button is pressed ', async () => {
    const wrapper = mount(TAlert);

    const trigger = wrapper.get('button');

    await trigger.trigger('click');

    expect(wrapper.vm.shown).toBe(false);
  });

  it('starts with the alert hidden if `show` if set to `false`', () => {
    const wrapper = mount(TAlert, {
      props: {
        show: false,
      },
    });

    expect(wrapper.vm.shown).toBe(false);
  });

  it('emits `update:show` when show property is updated', async () => {
    const wrapper = mount(TAlert);

    wrapper.vm.doHide();

    await wrapper.vm.$nextTick();

    // assert event has been emitted
    expect(wrapper.emitted()['update:show']).toBeTruthy();

    // assert event payload
    expect(wrapper.emitted()['update:show']).toEqual([[false]]);

    wrapper.vm.doShow();

    await wrapper.vm.$nextTick();

    // assert event has been emitted
    expect(wrapper.emitted()['update:show']).toBeTruthy();

    // assert event payload
    expect(wrapper.emitted()['update:show']).toEqual([[false], [true]]);
  });

  it('hides the element after the `timeout`', async () => {
    jest.useFakeTimers();

    const wrapper = mount(TAlert, {
      props: {
        timeout: 500,
      },
    });

    jest.advanceTimersByTime(499);

    expect(wrapper.vm.shown).toBe(true);

    jest.advanceTimersByTime(1);

    expect(wrapper.vm.shown).toBe(false);

    jest.useRealTimers();
  });

  it('clears the `timeout` when the element is unmounted', async () => {
    jest.useFakeTimers();

    const wrapper = mount(TAlert, {
      props: {
        timeout: 500,
      },
    });

    const hideAction = jest.spyOn(wrapper.vm, 'doHide');

    jest.advanceTimersByTime(499);

    wrapper.unmount();

    jest.advanceTimersByTime(1);

    expect(hideAction).not.toHaveBeenCalled();

    jest.useRealTimers();
  });

  it('animates the alert as default', async () => {
    const wrapper = mount(TAlert);

    expect(wrapper.vm.$el.tagName).toBe('TRANSITION-STUB');
  });

  it('doesnt animates the alert if `animate` is set to `false`', async () => {
    const wrapper = mount(TAlert, {
      props: {
        animate: false,
      },
    });

    expect(wrapper.vm.$el.tagName).not.toBe('TRANSITION-STUB');
  });

  it('accepts a custom `closeIcon``', async () => {
    const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M12.707" clip-rule="evenodd"></path>
  </svg>`;
    const wrapper = mount(TAlert, {
      props: {
        closeIcon,
      },
    });

    expect(wrapper.vm.$refs.close.innerHTML).toContain('<path fill-rule="evenodd" d="M12.707" clip-rule="evenodd"');
  });

  it('has a closeButton slot', async () => {
    // Supress "Property undefined was accessed during render but is not defined on instance." warning
    // @TODO consider an alternative to this
    jest.spyOn(console, 'warn').mockImplementation(() => {});

    const closeIcon = '<span>x</span>';

    const wrapper = mount(TAlert, {
      slots: {
        closeButton: closeIcon,
      },
    });

    expect(wrapper.vm.$refs.close.innerHTML).toContain(closeIcon);
  });

  it('exposes the `toggle`, `show` and `hide` methods and the configuration to the closeButton slot ', () => {
    const wrapper = mount(TAlert, {
      slots: {
        closeButton: (params) => scopedParamsAsString(params),
      },
    });

    const scopeParamKeys = parseScopedParams(wrapper.text());

    expect(scopeParamKeys).toEqual({
      show: 'function',
      hide: 'function',
      toggle: 'function',
      configuration: 'object',
    });
  });

  it('exposes the `toggle`, `show` and `hide` methods and the configuration to the default slot ', () => {
    const wrapper = mount(TAlert, {
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
    });
  });
});
