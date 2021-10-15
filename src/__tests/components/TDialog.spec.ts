/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount } from '@vue/test-utils';
import { DialogHideReason } from '@variantjs/core';
import TDialog from '@/components/TDialog.vue';
import { Emitter } from '../../utils/emitter';
import plugin from '../../plugin';
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

  it('accepts attributes for the dialog', () => {
    const dialogAttributes = {
      'data-foo': 'bar',
      class: 'bg-red-500',
    };

    const wrapper = mount(TDialog, {
      props: {
        dialogAttributes,
      },
    });

    expect(wrapper.vm.$refs.modalRef.modalAttributes).toEqual(dialogAttributes);
  });

  describe('Title', () => {
    it('adds the title', () => {
      const wrapper = mount(TDialog, {
        props: {
          title: 'Are you sure?',
        },
      });

      expect(wrapper.find('h3').text()).toEqual('Are you sure?');
    });

    it('adds the title trough the slot', () => {
      const wrapper = mount(TDialog, {
        slots: {
          title: 'Are you sure?',
        },
      });

      expect(wrapper.find('h3').text()).toEqual('Are you sure?');
    });

    it('accepts a title tag', () => {
      const wrapper = mount(TDialog, {
        props: {
          title: 'Are you sure?',
          titleTag: 'h1',
        },
      });

      expect(wrapper.find('h1').text()).toEqual('Are you sure?');
    });

    it('doesnt add the title if not set', () => {
      const wrapper = mount(TDialog);

      expect(wrapper.find('h3').exists()).toBe(false);
    });
  });

  describe('Text', () => {
    it('adds the text', () => {
      const wrapper = mount(TDialog, {
        props: {
          text: 'This action cannot be undone',
        },
      });

      expect(wrapper.find('p').text()).toEqual('This action cannot be undone');
    });

    it('adds the text trough the slot', () => {
      const wrapper = mount(TDialog, {
        slots: {
          text: 'This action cannot be undone',
        },
      });

      expect(wrapper.find('p').text()).toEqual('This action cannot be undone');
    });

    it('accepts a text tag', () => {
      const wrapper = mount(TDialog, {
        props: {
          text: 'This action cannot be undone',
          textTag: 'blockquote',
        },
      });

      expect(wrapper.find('blockquote').text()).toEqual('This action cannot be undone');
    });

    it('doesnt add the text if not set', () => {
      const wrapper = mount(TDialog);

      expect(wrapper.find('p').exists()).toBe(false);
    });
  });

  describe('Cancel Button', () => {
    const props = {
      type: 'confirm',
    };

    it('has a default label', () => {
      const wrapper = mount(TDialog, { props });

      const cancelButton = wrapper.vm.$refs.cancelButton as HTMLButtonElement;

      expect(cancelButton.textContent).toEqual('Cancel');
    });

    it('has a default aria-label attribute', () => {
      const wrapper = mount(TDialog, { props });

      const cancelButton = wrapper.vm.$refs.cancelButton as HTMLButtonElement;

      expect(cancelButton.getAttribute('aria-label')).toEqual('Cancel');
    });

    it('accepts a different label and aria-label', () => {
      const wrapper = mount(TDialog, {
        props: {
          ...props,
          cancelButtonText: 'Nah',
          cancelButtonAriaLabel: 'Nah Button',
        },
      });

      const cancelButton = wrapper.vm.$refs.cancelButton as HTMLButtonElement;

      expect(cancelButton.textContent).toEqual('Nah');
      expect(cancelButton.getAttribute('aria-label')).toEqual('Nah Button');
    });

    it('calls the cancel method when clicked', () => {
      const wrapper = mount(TDialog, { props });

      const cancelFnMock = jest.fn();

      wrapper.vm.cancel = cancelFnMock;

      const cancelButton = wrapper.vm.$refs.cancelButton as HTMLButtonElement;

      cancelButton.dispatchEvent(new Event('click'));

      expect(cancelFnMock).toHaveBeenCalled();
    });
  });

  describe('OK Button', () => {
    const props = {
      type: 'confirm',
    };

    it('has a default label', () => {
      const wrapper = mount(TDialog, { props });

      const okButton = wrapper.vm.$refs.okButton as HTMLButtonElement;

      expect(okButton.textContent).toEqual('OK');
    });

    it('has a default aria-label attribute', () => {
      const wrapper = mount(TDialog, { props });

      const okButton = wrapper.vm.$refs.okButton as HTMLButtonElement;

      expect(okButton.getAttribute('aria-label')).toEqual('OK');
    });

    it('accepts a different label and aria-label', () => {
      const wrapper = mount(TDialog, {
        props: {
          ...props,
          okButtonText: 'Yei!',
          okButtonAriaLabel: 'Ok Button',
        },
      });

      const okButton = wrapper.vm.$refs.okButton as HTMLButtonElement;

      expect(okButton.textContent).toEqual('Yei!');
      expect(okButton.getAttribute('aria-label')).toEqual('Ok Button');
    });

    it('calls the ok method when clicked', () => {
      const wrapper = mount(TDialog, { props });

      const okFnMock = jest.fn();

      wrapper.vm.ok = okFnMock;

      const okButton = wrapper.vm.$refs.okButton as HTMLButtonElement;

      okButton.dispatchEvent(new Event('click'));

      expect(okFnMock).toHaveBeenCalled();
    });
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

  describe('preconfirm', () => {
    it('closes the dialog with the response of the confirm method', async () => {
      const response = { success: true };
      const preConfirm = () => new Promise((resolve) => {
        resolve(response);
      });

      const wrapper = mount(TDialog, {
        props: {
          preConfirm,
        },
      });

      wrapper.vm.ok();

      await waitUntilModalIsHidden(wrapper);

      expect(wrapper.emitted()).toHaveProperty('hidden');

      expect(wrapper.emitted('hidden')).toEqual([[{
        hideReason: 'ok',
        isCancel: false,
        isDismissed: false,
        isOk: true,
        response,
      }]]);

      expect(wrapper.vm.busy).toBe(false);
    });

    it('uses the result of function that is not a promise as result', async () => {
      const response = { success: true };
      const preConfirm = () => response;

      const wrapper = mount(TDialog, {
        props: {
          preConfirm,
        },
      });

      wrapper.vm.ok();

      await waitUntilModalIsHidden(wrapper);

      expect(wrapper.emitted()).toHaveProperty('hidden');

      expect(wrapper.emitted('hidden')).toEqual([[{
        hideReason: 'ok',
        isCancel: false,
        isDismissed: false,
        isOk: true,
        response,
      }]]);

      expect(wrapper.vm.busy).toBe(false);
    });

    it('doesnt closes the dialog when response fails', async () => {
      const error = new Error('something went wrong!');

      const preConfirm = () => new Promise((_resolve, reject) => {
        reject(error);
      });

      const wrapper = mount(TDialog, {
        props: {
          preConfirm,
        },
      });

      wrapper.vm.ok();

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()).toHaveProperty('error');

      expect(wrapper.emitted('error')).toEqual([[error]]);

      expect(wrapper.vm.busy).toBe(false);

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.modelValue).toBe(true);
    });
  });

  describe('named dialog', () => {
    const settings = {
      props: {
        name: 'named-dialog',
        modelValue: false,
      },
      global: {
        plugins: [plugin],
      },
    };

    it('opens the dialog by his name', async () => {
      const wrapper = mount(TDialog, settings);

      wrapper.vm.$dialog.show('named-dialog');

      await waitUntilModalIsShown(wrapper);

      expect(wrapper.emitted()).toHaveProperty('shown');
    });

    it('return a promise', async () => {
      const wrapper = mount(TDialog, settings);

      const promise = wrapper.vm.$dialog.show('named-dialog');

      expect(promise).toBeInstanceOf(Promise);
    });

    it('hides the dialog by his name', async () => {
      const wrapper = mount(TDialog, {
        props: {
          ...settings.props,
          modelValue: true,
        },
        global: settings.global,
      });

      wrapper.vm.$dialog.hide('named-dialog');

      await waitUntilModalIsHidden(wrapper);

      expect(wrapper.emitted()).toHaveProperty('hidden');
    });
  });

  describe('vModel', () => {
    it('shows the component when updated the v-model to true', async () => {
      const wrapper = mount(TDialog, {
        props: {
          modelValue: false,
        },
      });

      wrapper.setProps({
        modelValue: true,
      });

      await waitUntilModalIsShown(wrapper);

      expect(wrapper.emitted()).toHaveProperty('shown');
    });

    it('hides the component when updated the v-model to false', async () => {
      const wrapper = mount(TDialog, {
        props: {
          modelValue: true,
        },
      });

      wrapper.setProps({
        modelValue: false,
      });

      await waitUntilModalIsHidden(wrapper);

      expect(wrapper.emitted()).toHaveProperty('hidden');
    });
  });
});
