/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowMount, mount } from '@vue/test-utils';
import * as bodyScrollLockModule from 'body-scroll-lock';
import TModal from '@/components/TModal.vue';
import plugin from '../../plugin';

const waitUntilModalIsVisible = (wrapper: any) : Promise<void> => new Promise((resolve) => {
  // 1. Component is added to the DOM
  wrapper.vm.$nextTick().then(() => {
    // 2. Overlay is about to show
    wrapper.vm.$nextTick().then(() => {
      // 3. Overlay is shown, modal is about to show
      wrapper.vm.$nextTick().then(() => {
        // 4 Modal is shown
        wrapper.vm.$nextTick().then(() => {
          resolve();
        });
      });
    });
  });
});

describe('TModal.vue', () => {
  it('doesnt show the component by default', () => {
    const wrapper = shallowMount(TModal);
    expect(wrapper.vm.$el.tagName).toBeUndefined();
  });

  describe('opening modal', () => {
    const props = {
      teleport: false,
    };

    describe('with the `show` method', () => {
      it('show the component when calling the show method', async () => {
        const wrapper = mount(TModal, {
          props,
        });

        expect(wrapper.vm.showComponent).toBe(false);

        wrapper.vm.show();

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showComponent).toBe(true);
      });

      it('pass parameters from the show method to the before-show event', async () => {
        const wrapper = mount(TModal, {
          props,
        });

        const params = {
          foo: 'bar',
        };

        expect(wrapper.vm.showComponent).toBe(false);

        wrapper.vm.show(params);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showComponent).toBe(true);

        expect((wrapper.emitted('before-show')![0] as any)[0].params).toEqual(params);
      });

      it('cancel the show if the cancel method is called', async () => {
        const wrapper = mount(TModal, {
          props: {
            ...props,
          },
        });

        const emitSpy = jest.spyOn(wrapper.vm.$, 'emit').mockImplementation((name, ...params) => {
          if (name === 'before-show') {
            (params as any).cancel();
          }
        });

        wrapper.vm.show();

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showComponent).toBe(false);

        emitSpy.mockRestore();
      });
    });

    describe('with the $modal global property', () => {
      it('show the component when calling the show method', async () => {
        const wrapper = mount(TModal, {
          props: {
            ...props,
            name: 'modal-name',
          },
          global: {
            plugins: [plugin],
          },
        });

        expect(wrapper.vm.showComponent).toBe(false);

        wrapper.vm.$modal.show('modal-name');

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showComponent).toBe(true);
      });

      it('doesnt show the component when calling the show method if different name', async () => {
        const wrapper = mount(TModal, {
          props: {
            ...props,
            name: 'other-name',
          },
          global: {
            plugins: [plugin],
          },
        });

        expect(wrapper.vm.showComponent).toBe(false);

        wrapper.vm.$modal.show('modal-name');

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showComponent).toBe(false);
      });

      it('pass parameters from the show method to the before-show event', async () => {
        const wrapper = mount(TModal, {
          props: {
            ...props,
            name: 'modal-name',
          },
          global: {
            plugins: [plugin],
          },
        });

        const params = {
          foo: 'bar',
        };

        expect(wrapper.vm.showComponent).toBe(false);

        wrapper.vm.$modal.show('modal-name', params);

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showComponent).toBe(true);

        expect((wrapper.emitted('before-show')![0] as any)[0].params).toEqual(params);
      });

      it('cancel the show if the cancel method is called', async () => {
        const wrapper = mount(TModal, {
          props: {
            ...props,
            name: 'modal-name',
          },
          global: {
            plugins: [plugin],
          },
        });

        const emitSpy = jest.spyOn(wrapper.vm.$, 'emit').mockImplementation((name, ...params) => {
          if (name === 'before-show') {
            (params as any).cancel();
          }
        });

        wrapper.vm.$modal.show('modal-name');

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showComponent).toBe(false);

        emitSpy.mockRestore();
      });
    });

    describe('with the vModel', () => {
      it('show the component when updated the v-model to true', async () => {
        const wrapper = mount(TModal, {
          props,
        });

        expect(wrapper.vm.showComponent).toBe(false);

        wrapper.setProps({
          modelValue: true,
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showComponent).toBe(true);
      });
    });
  });

  describe('hiding modal', () => {
    const props = {
      teleport: false,
      modelValue: true,
    };

    describe('with the `hide` method', () => {
      it('hides the component when calling the hide method', async () => {
        const wrapper = mount(TModal, {
          props,
        });

        expect(wrapper.vm.showModal).toBe(true);

        wrapper.vm.hide();

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showModal).toBe(false);
      });

      it('cancel the hide if the cancel method is called', async () => {
        const wrapper = mount(TModal, {
          props,
        });

        const emitSpy = jest.spyOn(wrapper.vm.$, 'emit').mockImplementation((name, ...params) => {
          if (name === 'before-hide') {
            (params as any).cancel();
          }
        });

        wrapper.vm.hide();

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showModal).toBe(true);

        emitSpy.mockRestore();
      });
    });

    describe('with the $modal global property', () => {
      it('show the component when calling the show method', async () => {
        const wrapper = mount(TModal, {
          props: {
            ...props,
            name: 'modal-name',
          },
          global: {
            plugins: [plugin],
          },
        });

        expect(wrapper.vm.showModal).toBe(true);

        wrapper.vm.$modal.hide('modal-name');

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showModal).toBe(false);
      });

      it('doesnt show the component when calling the show method if different name', async () => {
        const wrapper = mount(TModal, {
          props: {
            ...props,
            name: 'other-name',
          },
          global: {
            plugins: [plugin],
          },
        });

        expect(wrapper.vm.showModal).toBe(true);

        wrapper.vm.$modal.hide('modal-name');

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showModal).toBe(true);
      });

      it('cancel the show if the cancel method is called', async () => {
        const wrapper = mount(TModal, {
          props: {
            ...props,
            name: 'modal-name',
          },
          global: {
            plugins: [plugin],
          },
        });

        const emitSpy = jest.spyOn(wrapper.vm.$, 'emit').mockImplementation((name, ...params) => {
          if (name === 'before-hide') {
            (params as any).cancel();
          }
        });

        wrapper.vm.$modal.hide('modal-name');

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showModal).toBe(true);

        emitSpy.mockRestore();
      });
    });

    describe('with the vModel', () => {
      it('hides the component when updated the v-model to false', async () => {
        const wrapper = mount(TModal, {
          props,
        });

        expect(wrapper.vm.showModal).toBe(true);

        wrapper.setProps({
          modelValue: false,
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.showModal).toBe(false);
      });
    });
  });

  describe('modal is shown initially', () => {
    const props = {
      modelValue: true,
      teleport: false,
    };

    it('show the component if modelValue is set to `true`', () => {
      const wrapper = mount(TModal, {
        props,
        slots: {
          default: 'Hello World',
        },
      });

      expect(wrapper.html()).toContain('Hello World');
    });

    describe('disable body scroll', () => {
      it('disables the body scroll', () => {
        const disableBodyScrollSpy = jest.spyOn(bodyScrollLockModule, 'disableBodyScroll');

        mount(TModal, {
          props,
        });

        expect(disableBodyScrollSpy).toHaveBeenCalled();

        disableBodyScrollSpy.mockRestore();
      });

      it('doesnt disabled the body scroll if `disableBodyScroll` is set to `false`', () => {
        const disableBodyScrollSpy = jest.spyOn(bodyScrollLockModule, 'disableBodyScroll');

        mount(TModal, {
          props: {
            ...props,
            disableBodyScroll: false,
          },
        });

        expect(disableBodyScrollSpy).not.toHaveBeenCalled();

        disableBodyScrollSpy.mockRestore();
      });
    });

    describe('focus overlay', () => {
      it('focus the overlay', () => {
        const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');

        mount(TModal, {
          props,
        });

        expect(focusSpy).toHaveBeenCalled();

        focusSpy.mockRestore();
      });

      it('doesnt focus the overlay if `focusOnOpen` is set to `false`', () => {
        const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');

        mount(TModal, {
          props: {
            ...props,
            focusOnOpen: false,
          },
        });

        expect(focusSpy).not.toHaveBeenCalled();

        focusSpy.mockRestore();
      });
    });

    it('emits the hide-related events in order', async () => {
      const wrapper = mount(TModal, {
        props,
      });

      expect(wrapper.emitted('before-hide')).toBeFalsy();
      expect(wrapper.emitted('hidden')).toBeFalsy();

      wrapper.vm.hide();

      // After press hidden it just change the modelValue, no events yet
      expect(wrapper.emitted('before-hide')).toBeFalsy();
      expect(wrapper.emitted('hidden')).toBeFalsy();

      // Model is about to hide
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('before-hide')).toBeTruthy();
      expect(Object.keys((wrapper.emitted('before-hide')![0] as any)[0])).toEqual([
        'cancel',
      ]);
      expect(wrapper.emitted('hidden')).toBeFalsy();

      // Modal is hidden, overlay is about to hide (no new events emitted)
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('before-hide')).toBeTruthy();
      expect(wrapper.emitted('hidden')).toBeFalsy();

      // Overlay is hidden, component is about to be removed from the DOM (no new events emitted)
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('before-hide')).toBeTruthy();
      expect(wrapper.emitted('hidden')).toBeFalsy();

      // component is removed from the DOM
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('before-hide')).toBeTruthy();
      expect(wrapper.emitted('hidden')).toBeTruthy();
    });

    describe('press esc key', () => {
      it('hides the modal when press esc', async () => {
        const wrapper = mount(TModal, {
          props,
        });

        wrapper.vm.$refs.overlay.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Escape',
        }));

        await wrapper.vm.$nextTick();

        // Meaning the modal was hidden
        expect(wrapper.vm.$.setupState.showModal).toBe(false);
      });

      it('doesnt hide the modal when press esc if `escToClose` is set to `false`', async () => {
        const wrapper = mount(TModal, {
          props: {
            ...props,
            escToClose: false,
          },
        });

        wrapper.vm.$refs.overlay.dispatchEvent(new KeyboardEvent('keydown', {
          key: 'Escape',
        }));

        await wrapper.vm.$nextTick();

        // Meaning the modal was hidden
        expect(wrapper.vm.$.setupState.showModal).toBe(true);
      });
    });

    describe('user clicks the overlay (outside)', () => {
      it('hides the modal when clicks outside', async () => {
        const wrapper = mount(TModal, {
          props,
        });

        wrapper.vm.$refs.overlay.dispatchEvent(new MouseEvent('click'));

        await wrapper.vm.$nextTick();

        // Meaning the modal was hidden
        expect(wrapper.vm.$.setupState.showModal).toBe(false);
      });

      it('doesnt hides the modal when clicks the modal', async () => {
        const wrapper = mount(TModal, {
          props,
        });

        wrapper.vm.$refs.modal.dispatchEvent(new MouseEvent('click'));

        await wrapper.vm.$nextTick();

        // Meaning the modal was hidden
        expect(wrapper.vm.$.setupState.showModal).toBe(true);
      });

      it('doesnt hide the modal when click outside if `clickToClose` is set to `false`', async () => {
        const wrapper = mount(TModal, {
          props: {
            ...props,
            clickToClose: false,
          },
        });

        wrapper.vm.$refs.overlay.dispatchEvent(new MouseEvent('click'));

        await wrapper.vm.$nextTick();

        // Meaning the modal was hidden
        expect(wrapper.vm.$.setupState.showModal).toBe(true);
      });
    });
  });

  describe('modal is hidden initially', () => {
    const props = {
      teleport: false,
    };

    it('focus the overlay when shown', async () => {
      const focusSpy = jest.spyOn(HTMLElement.prototype, 'focus');

      const wrapper = mount(TModal, {
        props,
      });

      expect(focusSpy).not.toHaveBeenCalled();

      wrapper.vm.show();

      await waitUntilModalIsVisible(wrapper);

      expect(focusSpy).toHaveBeenCalled();

      focusSpy.mockRestore();
    });

    it('emits the open-related events in order', async () => {
      const wrapper = mount(TModal, {
        props,
      });

      expect(wrapper.emitted('before-show')).toBeFalsy();
      expect(wrapper.emitted('shown')).toBeFalsy();

      wrapper.vm.show();

      // After press shown it just adds the component into the DOM, no events emitted yet
      expect(wrapper.emitted('before-show')).toBeFalsy();
      expect(wrapper.emitted('shown')).toBeFalsy();

      // Component is added to the DOM, but not shown yet
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('before-show')).toBeTruthy();
      expect(Object.keys((wrapper.emitted('before-show')![0] as any)[0])).toEqual([
        'cancel',
        'params',
      ]);
      expect(wrapper.emitted('shown')).toBeFalsy();

      // Overlay is about to show (no new events emitted)
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('before-show')).toBeTruthy();
      expect(wrapper.emitted('shown')).toBeFalsy();

      // Overlay is shown, modal is about to show (no new events emitted)
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('before-show')).toBeTruthy();
      expect(wrapper.emitted('shown')).toBeFalsy();

      // Modal is shown
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('before-show')).toBeTruthy();
      expect(wrapper.emitted('shown')).toBeTruthy();
    });
  });
});
