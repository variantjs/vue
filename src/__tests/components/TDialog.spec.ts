/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount } from '@vue/test-utils';
import { h } from 'vue';
import { DialogHideReason, DialogType } from '@variantjs/core';
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

  describe('Props passed to the modal', () => {
    it('passes the dialogAttributes to the modalAttributes ', () => {
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

    it('passes the clickToClose setting ', () => {
      const wrapper = mount(TDialog, {
        props: {
          clickToClose: false,
        },
      });

      expect(wrapper.vm.$refs.modalRef.clickToClose).toBe(false);
    });

    it('passes the escToClose setting ', () => {
      const wrapper = mount(TDialog, {
        props: {
          escToClose: false,
        },
      });

      expect(wrapper.vm.$refs.modalRef.escToClose).toBe(false);
    });

    it('passes the disableBodyScroll setting ', () => {
      const wrapper = mount(TDialog, {
        props: {
          disableBodyScroll: false,
        },
      });

      expect(wrapper.vm.$refs.modalRef.disableBodyScroll).toBe(false);
    });

    it('passes the bodyScrollLockOptions setting ', () => {
      const bodyScrollLockOptions = {
        reserveScrollBarGap: true,
      };
      const wrapper = mount(TDialog, {
        props: {
          bodyScrollLockOptions,
        },
      });

      expect(wrapper.vm.$refs.modalRef.bodyScrollLockOptions).toEqual(bodyScrollLockOptions);
    });

    it('passes the negative value of showCloseButton setting to the hideCloseButton ', () => {
      const wrapper = mount(TDialog, {
        props: {
          showCloseButton: false,
        },
      });

      expect(wrapper.vm.$refs.modalRef.hideCloseButton).toBe(true);
    });

    it('passes the teleport setting ', () => {
      const wrapper = mount(TDialog, {
        props: {
          teleport: false,
        },
      });

      expect(wrapper.vm.$refs.modalRef.teleport).toBe(false);
    });

    it('passes the teleportTo setting ', () => {
      const div = document.createElement('div');
      div.id = 'app';

      document.body.append(div);

      const wrapper = mount(TDialog, {
        props: {
          teleportTo: '#app',
        },
      });

      expect(wrapper.vm.$refs.modalRef.teleportTo).toBe('#app');
    });
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

    it('closes the modal when cancel button is clicked', async () => {
      const wrapper = mount(TDialog, { props });

      wrapper.vm.cancel();

      await waitUntilModalIsHidden(wrapper);

      expect(wrapper.emitted()).toHaveProperty('hidden');
      expect(wrapper.emitted('hidden')).toEqual([[{
        hideReason: 'cancel',
        isCancel: true,
        isDismissed: false,
        isOk: false,
      }]]);
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

    it('doesnt opens the dialog if name is different', async () => {
      const wrapper = mount(TDialog, settings);

      wrapper.vm.$dialog.show('another-dialog');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()).not.toHaveProperty('shown');
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

    it('doesnt hides the dialog if using another name', async () => {
      const wrapper = mount(TDialog, {
        props: {
          ...settings.props,
          modelValue: true,
        },
        global: settings.global,
      });

      wrapper.vm.$dialog.hide('another-dialog');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()).not.toHaveProperty('hidden');
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

  describe('focus on open', () => {
    let originalDivFocus: any;
    let originalInputFocus: any;
    let originalTextareaFocus: any;
    beforeEach(() => {
      originalInputFocus = window.HTMLInputElement.prototype.focus;
      originalTextareaFocus = window.HTMLTextAreaElement.prototype.focus;
      originalDivFocus = window.HTMLInputElement.prototype.focus;
    });

    afterEach(() => {
      window.HTMLTextAreaElement.prototype.focus = originalTextareaFocus;
      window.HTMLInputElement.prototype.focus = originalInputFocus;
      window.HTMLInputElement.prototype.focus = originalDivFocus;
    });

    it('focus the div when focus on open is set an is not a prompt type', async () => {
      const focusInputMock = jest.fn();
      const focusDivMock = jest.fn();
      window.HTMLInputElement.prototype.focus = focusInputMock;
      window.HTMLDivElement.prototype.focus = focusDivMock;

      const wrapper = mount(TDialog, {
        props: {
          modelValue: false,
          type: DialogType.Alert,
        },
      });

      wrapper.vm.show();

      await waitUntilModalIsShown(wrapper);

      expect(focusInputMock).not.toHaveBeenCalled();
      expect(focusDivMock).toHaveBeenCalled();
    });

    it('focus the input when focus on open is set and is a prompt type', async () => {
      const focusInputMock = jest.fn();
      const focusDivMock = jest.fn();
      window.HTMLInputElement.prototype.focus = focusInputMock;
      window.HTMLDivElement.prototype.focus = focusDivMock;

      const wrapper = mount(TDialog, {
        props: {
          modelValue: false,
          type: DialogType.Prompt,
        },
      });

      wrapper.vm.show();

      await waitUntilModalIsShown(wrapper);

      expect(focusInputMock).toHaveBeenCalled();
      expect(focusDivMock).not.toHaveBeenCalled();
    });

    it('focus first focusable item when using the slot and is a prompt type', async () => {
      const focusDivMock = jest.fn();
      const focusTextareaMock = jest.fn();
      window.HTMLDivElement.prototype.focus = focusDivMock;
      window.HTMLTextAreaElement.prototype.focus = focusTextareaMock;

      const wrapper = mount(TDialog, {
        props: {
          modelValue: false,
          type: DialogType.Prompt,
        },
        slots: {
          input: () => h('textarea'),
        },
      });

      wrapper.vm.show();

      await waitUntilModalIsShown(wrapper);

      expect(focusTextareaMock).toHaveBeenCalled();
      expect(focusDivMock).not.toHaveBeenCalled();
    });

    it('focus the dialog if no focusable item when using the slot and is a prompt type', async () => {
      const focusDivMock = jest.fn();
      window.HTMLDivElement.prototype.focus = focusDivMock;

      const wrapper = mount(TDialog, {
        props: {
          modelValue: false,
          type: DialogType.Prompt,
        },
        slots: {
          input: () => h('div'),
        },
      });

      wrapper.vm.show();

      await waitUntilModalIsShown(wrapper);

      expect(focusDivMock).toHaveBeenCalled();
    });

    it('doesnt focus anything if `focusOnOpen` is set to `false', async () => {
      const focusInputMock = jest.fn();
      const focusDivMock = jest.fn();
      window.HTMLInputElement.prototype.focus = focusInputMock;
      window.HTMLDivElement.prototype.focus = focusDivMock;

      const wrapper = mount(TDialog, {
        props: {
          modelValue: false,
          type: DialogType.Prompt,
          focusOnOpen: false,
        },
      });

      wrapper.vm.show();

      await waitUntilModalIsShown(wrapper);

      expect(focusInputMock).not.toHaveBeenCalled();
      expect(focusDivMock).not.toHaveBeenCalled();
    });
  });

  describe('Input related props', () => {
    it('assigns the inputValue to the inputModel', () => {
      const wrapper = mount(TDialog, {
        props: {
          inputValue: 'hello',
          type: DialogType.Prompt,
        },
      });

      expect(wrapper.vm.inputModel).toBe('hello');
      expect(wrapper.find('input').element.value).toBe('hello');
    });

    it('resets to the value on the inputValue when modal is closed', async () => {
      const wrapper = mount(TDialog, {
        props: {
          inputValue: 'hello',
          type: DialogType.Prompt,
        },
      });

      expect(wrapper.vm.inputModel).toBe('hello');
      wrapper.find('input').element.value = 'world';
      wrapper.find('input').trigger('input');
      expect(wrapper.vm.inputModel).toBe('world');

      wrapper.vm.hide();

      await waitUntilModalIsHidden(wrapper);

      expect(wrapper.vm.inputModel).toBe('hello');
    });

    it('passes the inputType to the input', async () => {
      const wrapper = mount(TDialog, {
        props: {
          inputType: 'password',
          type: DialogType.Prompt,
        },
      });

      expect(wrapper.find('input').attributes('type')).toBe('password');
    });

    it('passes the inputAttributes to the input', async () => {
      const wrapper = mount(TDialog, {
        props: {
          inputAttributes: {
            'data-foo': 'bar',
            width: '100',
          },
          type: DialogType.Prompt,
        },
      });

      expect(wrapper.find('input').attributes('data-foo')).toBe('bar');
      expect(wrapper.find('input').attributes('width')).toBe('100');
    });
  });

  describe('Input validation', () => {
    it('doesnt hides the dialog when validation returns a message', async () => {
      const inputValidator = () => 'error!';
      const wrapper = mount(TDialog, {
        props: {
          type: DialogType.Prompt,
          inputValidator,
        },
      });

      expect(wrapper.html()).not.toContain('error!');

      wrapper.vm.ok();

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()).toHaveProperty('validation-error');

      expect(wrapper.emitted('validation-error')).toEqual([['error!']]);

      expect(wrapper.vm.busy).toBe(false);

      expect(wrapper.html()).toContain('error!');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.modelValue).toBe(true);
    });

    it('resets the validation error when ok', async () => {
      const inputValidator = () => null;
      const wrapper = mount(TDialog, {
        props: {
          type: DialogType.Prompt,
          inputValidator,
        },
      });

      wrapper.vm.setValidationError('error!');

      await wrapper.vm.$nextTick();

      expect(wrapper.html()).toContain('error!');

      wrapper.vm.ok();

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.html()).not.toContain('error!');
    });

    it('validates on input', async () => {
      const inputValidator = (val: string) => (val === 'fail' ? 'fail' : null);
      const wrapper = mount(TDialog, {
        props: {
          type: DialogType.Prompt,
          inputValidator,
        },
      });

      wrapper.find('input').element.value = 'fail';
      wrapper.find('input').trigger('input');

      await wrapper.vm.$nextTick();

      expect(wrapper.html()).toContain('fail');
    });

    it('resets the validation when input', async () => {
      const inputValidator = () => null;
      const wrapper = mount(TDialog, {
        props: {
          type: DialogType.Prompt,
          inputValidator,
        },
      });

      wrapper.vm.setValidationError('error!');

      await wrapper.vm.$nextTick();

      expect(wrapper.html()).toContain('error!');

      wrapper.find('input').element.value = 'something';
      wrapper.find('input').trigger('input');

      await wrapper.vm.$nextTick();

      expect(wrapper.html()).not.toContain('error!');
    });
  });

  describe('Misc validations', () => {
    it('doesnt closes the dialog if is busy', async () => {
      const wrapper = mount(TDialog);

      wrapper.vm.busy = true;

      wrapper.vm.hide();

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()).not.toHaveProperty('hidden');
    });

    it('closes the dialog when is busy when hide reason is "ok"', async () => {
      const wrapper = mount(TDialog);

      wrapper.vm.busy = true;

      wrapper.vm.hide(DialogHideReason.Ok);

      await waitUntilModalIsHidden(wrapper);

      expect(wrapper.emitted()).toHaveProperty('hidden');
    });

    it('uses the modal hide reason', async () => {
      const wrapper = mount(TDialog);

      wrapper.vm.$refs.modalRef.$refs.overlay.dispatchEvent(new KeyboardEvent('keydown', {
        key: 'Escape',
      }));

      // wrapper.vm.$refs.modalRef.onKeydownEscapeHandler();

      await waitUntilModalIsHidden(wrapper);

      expect(wrapper.emitted('hidden')).toEqual([[{
        hideReason: 'esc',
        isCancel: false,
        isDismissed: true,
        isOk: false,
      }]]);
    });
  });
});
