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
    @shown="$emit('shown')"
    @hidden="$emit('hidden')"
    @before-show="$emit('before-show', $event)"
    @before-hide="$emit('before-hide', $event)"
  >
    <template #header="{ hide }">
      <slot
        name="header"
        :hide="hide"
      >
        <!-- {{ configuration.header }} -->

        <div class="w-full text-left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <h3 class="text-lg font-semibold text-center">
            Delete user?
          </h3>
        </div>
      </slot>
    </template>

    <template #default="{ hide }">
      <slot :hide="hide">
        <!-- {{ configuration.body }} -->
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus, fuga. Possimus quaerat fuga alias voluptatem minima sapiente molestiae eaque non quis? Reprehenderit aspernatur nam nobis quo impedit numquam dolorem dolorum!
      </slot>
    </template>

    <template #footer="{ hide }">
      <slot
        name="footer"
        :hide="hide"
      >
        <div class="flex justify-center p-3 space-x-4 bg-gray-100 rounded-b">
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
        </div>

        <!-- {{ configuration.footer }} -->
      </slot>
    </template>
  </t-modal>
</template>

<script lang="ts">
import {
  defineComponent, PropType, HTMLAttributes, inject,
} from 'vue';
import { BodyScrollOptions } from 'body-scroll-lock';
import { Data } from '@variantjs/core';
import { TDialogOptions, EmitterInterface } from '../types';
import useConfigurationWithClassesList from '../use/useConfigurationWithClassesList';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import useVModel from '../use/useVModel';
import TModal from './TModal.vue';

// @TODO: Move this to the core library
const TDialogConfig = {
  fixedClasses: {
    overlay: 'fixed top-0 bottom-0 left-0 right-0 w-full h-full overflow-auto scrolling-touch',
    wrapper: 'relative mx-auto',
    modal: 'overflow-visible relative ',
  },
  classes: {
    overlay: 'z-40 bg-black bg-opacity-50',
    wrapper: 'relative z-50 max-w-lg px-3 py-12 mx-auto',
    close: 'absolute top-0 right-0 flex items-center justify-center w-8 h-8 -m-3 text-gray-700 transition ease-in-out bg-gray-100 rounded-full shadow duration-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 hover:bg-gray-200',
    closeIcon: 'w-4 h-4',
    modal: 'bg-white rounded shadow',
    header: 'p-3 border-b border-gray-100 rounded-t',
    body: 'p-3',
    footer: 'p-3 rounded-b bg-gray-100',
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

export const TDialogClassesKeys = Object.keys(TDialogConfig.classes);

export type TDialogClassesValidKeys = keyof typeof TDialogConfig.classes;

// @vue/component
export default defineComponent({
  name: 'TDialog',
  components: {
    TModal,
  },
  props: {
    ...getVariantPropsWithClassesList<TDialogOptions, TDialogClassesValidKeys>(),
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
    header: {
      type: String,
      default: undefined,
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

    return {
      configuration,
      attributes,
      showModel,
    };
  },
});
</script>
