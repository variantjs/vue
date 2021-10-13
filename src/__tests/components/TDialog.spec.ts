/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount } from '@vue/test-utils';
import { DialogHideReason } from '@variantjs/core';
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

      it('doesnt reject a promise when is dimissed', async () => {
        const emitter = new Emitter();

        const wrapper = mount(TDialog, {
          props: {
            ...props,
            name: 'my-dialog',
            modelValue: false,
          },
          global: {
            provide: {
              // Emulates the plugin system
              emitter,
            },
          },

        });

        // @see vue/src/plugin.ts show helper
        const resolve = jest.fn();
        const reject = jest.fn();

        emitter.emit('dialog:show', 'my-dialog', resolve, reject);
        await waitUntilModalIsShown(wrapper);

        emitter.emit('dialog:hide', 'my-dialog');
        await waitUntilModalIsHidden(wrapper);

        expect(resolve).toHaveBeenCalled();
        expect(reject).not.toHaveBeenCalled();
      });

      it('reject a promise when is dimissed if rejectOnDismiss is set', async () => {
        const emitter = new Emitter();

        const wrapper = mount(TDialog, {
          props: {
            ...props,
            name: 'my-dialog',
            modelValue: false,
            rejectOnDismiss: true,
          },
          global: {
            provide: {
              // Emulates the plugin system
              emitter,
            },
          },

        });

        // @see vue/src/plugin.ts show helper
        const resolve = jest.fn();
        const reject = jest.fn();

        emitter.emit('dialog:show', 'my-dialog', resolve, reject);
        await waitUntilModalIsShown(wrapper);

        emitter.emit('dialog:hide', 'my-dialog');
        await waitUntilModalIsHidden(wrapper);

        expect(resolve).not.toHaveBeenCalled();
        expect(reject).toHaveBeenCalled();
      });

      it('resolve a promise when is dimissed if rejectOnDismiss is set to true', async () => {
        const emitter = new Emitter();

        const wrapper = mount(TDialog, {
          props: {
            ...props,
            name: 'my-dialog',
            modelValue: false,
            rejectOnDismiss: false,
          },
          global: {
            provide: {
              // Emulates the plugin system
              emitter,
            },
          },

        });

        // @see vue/src/plugin.ts show helper
        const resolve = jest.fn();
        const reject = jest.fn();

        emitter.emit('dialog:show', 'my-dialog', resolve, reject);
        await waitUntilModalIsShown(wrapper);

        emitter.emit('dialog:hide', 'my-dialog');
        await waitUntilModalIsHidden(wrapper);

        expect(resolve).toHaveBeenCalled();
        expect(reject).not.toHaveBeenCalled();
      });
    });
  });
});
