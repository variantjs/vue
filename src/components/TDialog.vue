<template>
  <t-modal
    v-model="showModel"
    :modal-attributes="modalAttributes"
    :focus-on-open="focusOnOpen"
    :click-to-close="clickToClose"
    :esc-to-close="escToClose"
    :hide-close-button="! showCloseButton"
    :disable-body-scroll="disableBodyScroll"
    :body-scroll-lock-options="bodyScrollLockOptions"
    :teleport="teleport"
    :teleport-to="teleportTo"
    :classes="modalClasses"
    :fixed-classes="{
      wrapper: ''
    }"
    @shown="$emit('shown')"
    @hidden="$emit('hidden')"
    @before-show="$emit('before-show', $event)"
    @before-hide="$emit('before-hide', $event)"
  >
    <template #default="{ hide }">
      <slot :hide="hide">
        <div class="flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-gray-100 rounded-full">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 text-gray-500"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          /></svg>
        </div>

        <div class="flex flex-col justify-center w-full">
          <div class="">
            <h3 class="text-lg font-medium leading-6 text-center text-gray-900">
              Delete user?
            </h3>
          </div>
          <div class="w-full text-left">
            <p class="text-sm text-gray-500">
              This action cannot be undone.
            </p>
          </div>
        </div>
      </slot>
    </template>

    <template #footer="{ hide }">
      <slot
        name="footer"
        :hide="hide"
      >
        <button
          type="button"
          class="block w-full max-w-xs px-4 py-2 transition duration-100 ease-in-out bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 focus:border-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="button"
          class="block w-full max-w-xs px-4 py-2 text-white transition duration-100 ease-in-out bg-blue-500 border border-transparent rounded shadow-sm hover:bg-blue-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          OK
        </button>
      </slot>
    </template>
  </t-modal>
</template>

<script lang="ts">
import {
  defineComponent, PropType, HTMLAttributes, inject, computed,
} from 'vue';
import { BodyScrollOptions } from 'body-scroll-lock';
import {
  Data, TDialogClassesKeys, TDialogClassesValidKeys, DialogType, DialogPreconfirmFn,
} from '@variantjs/core';
import { TDialogOptions, EmitterInterface } from '../types';
import useConfigurationWithClassesList from '../use/useConfigurationWithClassesList';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import useVModel from '../use/useVModel';
import TModal from './TModal.vue';
import { TModalOptions } from '../types/components/t-modal';

const TDialogConfig = {
  fixedClasses: {
    overlay: 'fixed top-0 bottom-0 left-0 right-0 w-full h-full overflow-auto scrolling-touch',
    wrapper: '',
    modal: 'overflow-visible relative ',
  },
  classes: {
    overlay: 'z-40 bg-black bg-opacity-50',
    wrapper: '',
    close: 'absolute top-0 right-0 flex items-center justify-center w-8 h-8 -m-3 text-gray-700 transition ease-in-out bg-gray-100 rounded-full shadow duration-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 hover:bg-gray-200',
    closeIcon: 'w-4 h-4',
    modal: 'bg-white rounded shadow',
    body: 'p-3',
    footer: 'flex justify-center p-3 space-x-4 bg-gray-100 rounded-b',
    overlayEnterActiveClass: 'transition ease-out duration-300',
    overlayEnterFromClass: 'transform opacity-0',
    overlayEnterToClass: 'transform opacity-100',
    overlayLeaveActiveClass: 'transition duration-300 ease-in',
    overlayLeaveFromClass: 'transform opacity-100',
    overlayLeaveToClass: 'transform opacity-0',
    enterActiveClass: 'transition duration-100 ease-out',
    enterFromClass: 'transform scale-95 opacity-0',
    enterToClass: 'transform scale-100 opacity-100',
    leaveActiveClass: 'transition duration-100 ease-in',
    leaveFromClass: 'transform scale-100 opacity-100',
    leaveToClass: 'transform scale-95 opacity-0',
  },
};

// @vue/component
export default defineComponent({
  name: 'TDialog',
  components: {
    TModal,
  },
  props: {
    ...getVariantPropsWithClassesList<TDialogOptions, TDialogClassesValidKeys>(),
    type: {
      type: String as PropType<DialogType>,
      default: DialogType.Alert,
    },

    // @TODO
    title: {
      type: String,
      default: undefined,
    },
    titleTag: {
      type: String,
      default: 'h3',
    },
    textTag: {
      type: String,
      default: 'p',
    },
    text: {
      type: String,
      default: undefined,
    },

    cancelButtonText: {
      type: String,
      default: 'Cancel',
    },
    cancelButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    okButtonText: {
      type: String,
      default: 'OK',
    },
    okButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    preConfirm: {
      type: Function as PropType<DialogPreconfirmFn>,
      default: undefined,
    },

    name: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    modalAttributes: {
      type: Object as PropType<HTMLAttributes & Data>,
      default: () => ({}),
    },

    body: {
      type: String,
      default: undefined,
    },
    footer: {
      type: String,
      default: undefined,
    },
    focusOnOpen: {
      type: Boolean,
      default: true,
    },
    clickToClose: {
      type: Boolean,
      default: true,
    },
    escToClose: {
      type: Boolean,
      default: true,
    },
    showCloseButton: {
      type: Boolean,
      default: true,
    },
    disableBodyScroll: {
      type: Boolean,
      default: true,
    },
    bodyScrollLockOptions: {
      type: Object as PropType<BodyScrollOptions>,
      default: () => ({}),
    },
    teleport: {
      type: Boolean,
      default: true,
    },
    teleportTo: {
      type: [String, Object] as PropType<string | HTMLElement>,
      default: 'body',
    },
  },
  emits: {
    shown: () => true,
    hidden: () => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    'before-show': ({ cancel, params }: { cancel: (reason?: any) => void, params: any }) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
    'before-hide': ({ cancel }: { cancel: (reason?: any) => void }) => true,
    'update:modelValue': () => true,
  },
  setup(props) {
    const { configuration, attributes } = useConfigurationWithClassesList<TDialogOptions>(TDialogConfig, TDialogClassesKeys);

    const showModel = useVModel(props, 'modelValue');

    const hide = () :void => {
      showModel.value = false;
    };

    const show = () :void => {
      showModel.value = true;
    };

    if (configuration.name) {
      const emitter = inject<EmitterInterface>('emitter')!;

      emitter.on('dialog:show', (name) => {
        if (configuration.name !== name) {
          return;
        }

        show();
      });

      emitter.on('dialog:hide', (name) => {
        if (configuration.name !== name) {
          return;
        }

        hide();
      });
    }

    const modalClasses = computed(() => ({
      overlay: configuration.classesList!.overlay,
      wrapper: configuration.classesList!.wrapper,
      close: configuration.classesList!.close,
      closeIcon: configuration.classesList!.closeIcon,
      modal: configuration.classesList!.modal,
      body: configuration.classesList!.body,
      footer: configuration.classesList!.footer,
      overlayEnterActiveClass: configuration.classesList!.overlayEnterActiveClass,
      overlayEnterFromClass: configuration.classesList!.overlayEnterFromClass,
      overlayEnterToClass: configuration.classesList!.overlayEnterToClass,
      overlayLeaveActiveClass: configuration.classesList!.overlayLeaveActiveClass,
      overlayLeaveFromClass: configuration.classesList!.overlayLeaveFromClass,
      overlayLeaveToClass: configuration.classesList!.overlayLeaveToClass,
      enterActiveClass: configuration.classesList!.enterActiveClass,
      enterFromClass: configuration.classesList!.enterFromClass,
      enterToClass: configuration.classesList!.enterToClass,
      leaveActiveClass: configuration.classesList!.leaveActiveClass,
      leaveFromClass: configuration.classesList!.leaveFromClass,
      leaveToClass: configuration.classesList!.leaveToClass,
    }));

    return {
      configuration,
      attributes,
      showModel,
      modalClasses,
    };
  },
});
</script>
