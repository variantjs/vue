/* eslint-disable @typescript-eslint/no-explicit-any */
import { shallowMount, mount } from '@vue/test-utils';
import TModal from '@/components/TModal.vue';

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
            esctoClose: false,
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
