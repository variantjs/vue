/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount, MountingOptions } from '@vue/test-utils';
import { Data, DialogHideReason } from '@variantjs/core';
import TDialog from '@/components/TDialog.vue';
import { Emitter } from '../..';

// eslint-disable-next-line no-async-promise-executor
const waitUntilModalIsShown = (wrapper: any): Promise<void> => new Promise(async (resolve) => {
  do {
    // eslint-disable-next-line no-await-in-loop
    await wrapper.vm.$nextTick();
  } while (wrapper.vm.$refs.modalRef.showModal === false);
  await wrapper.vm.$nextTick();

  resolve();
});

// eslint-disable-next-line no-async-promise-executor
const waitUntilModalIsHidden = (wrapper: any): Promise<void> => new Promise(async (resolve) => {
  do {
    // eslint-disable-next-line no-await-in-loop
    await wrapper.vm.$nextTick();
  } while (wrapper.vm.$refs.modalRef.showComponent === true);
  await wrapper.vm.$nextTick();

  resolve();
});

describe('TDialog.vue', () => {
  beforeEach(() => {
    TDialog.props.teleport.default = false;
    TDialog.props.modelValue.default = true;
  });

  afterEach(() => {
    TDialog.props.teleport.default = true;
    TDialog.props.modelValue.default = false;
  });

  it('mount the component without errors', async () => {
    const wrapper = mount(TDialog);

    expect(wrapper.get('div').attributes('tabindex')).toEqual('0');
  });

  describe('Dialog types', () => {
    describe('Alert type', () => {
      const props = {
        type: 'alert',
      };
      it('has an ok button', () => {
        const wrapper = mount(TDialog, { props });

        const { okButton } = wrapper.vm.$refs;

        expect(okButton).toBeTruthy();
      });

      it('doesnt have a cancel button', () => {
        const wrapper = mount(TDialog, { props });

        const { cancelButton } = wrapper.vm.$refs;

        expect(cancelButton).toBeUndefined();
      });
    });

    describe('Confirm type', () => {
      const props = {
        type: 'confirm',
      };

      it('has an ok button', () => {
        const wrapper = mount(TDialog, { props });

        const { okButton } = wrapper.vm.$refs;

        expect(okButton).toBeTruthy();
      });

      it('has a cancel button', () => {
        const wrapper = mount(TDialog, { props });

        const { cancelButton } = wrapper.vm.$refs;

        expect(cancelButton).toBeTruthy();
      });
    });

    describe('Prompt type', () => {
      const props = {
        type: 'prompt',
      };

      it('has an ok button', () => {
        const wrapper = mount(TDialog, { props });

        const { okButton } = wrapper.vm.$refs;

        expect(okButton).toBeTruthy();
      });

      it('has a cancel button', () => {
        const wrapper = mount(TDialog, { props });

        const { cancelButton } = wrapper.vm.$refs;

        expect(cancelButton).toBeTruthy();
      });
    });
  });

  describe('Dialog Icon', () => {
    it('doesnt add an icon by default', () => {
      const wrapper = mount(TDialog);

      expect(wrapper.vm.$refs.iconWrapperRef).toBeFalsy();
    });

    it.each(['success', 'question', 'info', 'warning', 'error'])('adds the icon', (icon) => {
      const wrapper = mount(TDialog, {
        props: {
          icon,
        },
      });

      expect(wrapper.vm.$refs.iconWrapperRef).toBeTruthy();

      expect((wrapper.vm.$refs.iconWrapperRef as HTMLDivElement).children[0].tagName).toBe('svg');
    });

    it.each(['success', 'question', 'info', 'warning', 'error'])('adds the icon when useSolidIcon is iset', (icon) => {
      const wrapper = mount(TDialog, {
        props: {
          icon,
          useSolidIcon: true,
        },
      });

      expect(wrapper.vm.$refs.iconWrapperRef).toBeTruthy();

      expect((wrapper.vm.$refs.iconWrapperRef as HTMLDivElement).children[0].tagName).toBe('svg');
    });
  });

  describe('promise behaviour on reject', () => {
    const emitter = new Emitter();

    const params = {
      props: {
        type: 'confirm',
        name: 'my-dialog',
        modelValue: false,
      },
      global: {
        provide: {
          // Emulates the plugin system
          emitter,
        },
      },
    };

    it('resolves the promise when is ok by default', async () => {
      const wrapper = mount(TDialog, params);

      // @see vue/src/plugin.ts show helper
      const resolve = jest.fn();
      const reject = jest.fn();

      emitter.emit('dialog:show', 'my-dialog', resolve, reject);
      await waitUntilModalIsShown(wrapper);

      wrapper.vm.hide(DialogHideReason.Ok);
      await waitUntilModalIsHidden(wrapper);

      expect(resolve).toHaveBeenCalled();
      expect(reject).not.toHaveBeenCalled();
    });

    it('rejects the promise when is dismissed by default', async () => {
      const wrapper = mount(TDialog, params);

      // @see vue/src/plugin.ts show helper
      const resolve = jest.fn();
      const reject = jest.fn();

      emitter.emit('dialog:show', 'my-dialog', resolve, reject);
      await waitUntilModalIsShown(wrapper);

      wrapper.vm.hide(DialogHideReason.Outside);
      await waitUntilModalIsHidden(wrapper);

      expect(resolve).not.toHaveBeenCalled();
      expect(reject).toHaveBeenCalled();
    });

    it('doesnt rejects the promise when is dismissed for alert dialogs', async () => {
      const wrapper = mount(TDialog, {
        props: {
          ...params.props,
          type: 'alert',
        },
        global: params.global,
      });

      // @see vue/src/plugin.ts show helper
      const resolve = jest.fn();
      const reject = jest.fn();

      emitter.emit('dialog:show', 'my-dialog', resolve, reject);
      await waitUntilModalIsShown(wrapper);

      wrapper.vm.hide(DialogHideReason.Outside);
      await waitUntilModalIsHidden(wrapper);

      expect(resolve).toHaveBeenCalled();
      expect(reject).not.toHaveBeenCalled();
    });

    it('rejects the promise when rejectOnDismiss is set', async () => {
      const wrapper = mount(TDialog, {
        props: {
          ...params.props,
          rejectOnDismiss: true,
        },
        global: params.global,
      });

      // @see vue/src/plugin.ts show helper
      const resolve = jest.fn();
      const reject = jest.fn();

      emitter.emit('dialog:show', 'my-dialog', resolve, reject);
      await waitUntilModalIsShown(wrapper);

      wrapper.vm.hide(DialogHideReason.Outside);
      await waitUntilModalIsHidden(wrapper);

      expect(resolve).not.toHaveBeenCalled();
      expect(reject).toHaveBeenCalled();
    });

    it('rejects the promise when rejectOnDismiss is set for alerts', async () => {
      const wrapper = mount(TDialog, {
        props: {
          ...params.props,
          type: 'alert',
          rejectOnDismiss: true,
        },
        global: params.global,
      });

      // @see vue/src/plugin.ts show helper
      const resolve = jest.fn();
      const reject = jest.fn();

      emitter.emit('dialog:show', 'my-dialog', resolve, reject);
      await waitUntilModalIsShown(wrapper);

      wrapper.vm.hide(DialogHideReason.Outside);
      await waitUntilModalIsHidden(wrapper);

      expect(resolve).not.toHaveBeenCalled();
      expect(reject).toHaveBeenCalled();
    });
  });

  describe('Promise behaviour on cancel', () => {
    const emitter = new Emitter();

    const params = {
      props: {
        type: 'confirm',
        name: 'my-dialog',
        modelValue: false,
      },
      global: {
        provide: {
          // Emulates the plugin system
          emitter,
        },
      },
    };

    it('rejects the promise when is cancel by default', async () => {
      const wrapper = mount(TDialog, params);

      // @see vue/src/plugin.ts show helper
      const resolve = jest.fn();
      const reject = jest.fn();

      emitter.emit('dialog:show', 'my-dialog', resolve, reject);
      await waitUntilModalIsShown(wrapper);

      wrapper.vm.hide(DialogHideReason.Cancel);
      await waitUntilModalIsHidden(wrapper);

      expect(resolve).not.toHaveBeenCalled();
      expect(reject).toHaveBeenCalled();
    });

    it('rejects the promise when rejectOnCancel is set', async () => {
      const wrapper = mount(TDialog, {
        props: {
          ...params.props,
          rejectOnCancel: true,
        },
        global: params.global,
      });

      // @see vue/src/plugin.ts show helper
      const resolve = jest.fn();
      const reject = jest.fn();

      emitter.emit('dialog:show', 'my-dialog', resolve, reject);
      await waitUntilModalIsShown(wrapper);

      wrapper.vm.hide(DialogHideReason.Cancel);
      await waitUntilModalIsHidden(wrapper);

      expect(resolve).not.toHaveBeenCalled();
      expect(reject).toHaveBeenCalled();
    });

    it('resolves the promise when rejectOnCancel is set to `false`', async () => {
      const wrapper = mount(TDialog, {
        props: {
          ...params.props,
          rejectOnCancel: false,
        },
        global: params.global,
      });

      // @see vue/src/plugin.ts show helper
      const resolve = jest.fn();
      const reject = jest.fn();

      emitter.emit('dialog:show', 'my-dialog', resolve, reject);
      await waitUntilModalIsShown(wrapper);

      wrapper.vm.hide(DialogHideReason.Cancel);
      await waitUntilModalIsHidden(wrapper);

      expect(resolve).toHaveBeenCalled();
      expect(reject).not.toHaveBeenCalled();
    });
  });
});
