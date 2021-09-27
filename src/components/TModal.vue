<template>
  <teleport
    v-if="show || showOverlay"
    :to="configuration.teleportTo"
    :disabled="! configuration.teleport"
  >
    <transitionable
      :classes-list="{
        enterActiveClass: 'transition ease-out duration-100',
        enterFromClass: 'transform opacity-0',
        enterToClass: 'transform opacity-100',
        leaveActiveClass: 'transition duration-100 ease-in',
        leaveFromClass: 'transform opacity-100',
        leaveToClass: 'transform  opacity-0',
      }"
    >
      <div
        v-show="showOverlay"
        tabindex="0"
        class="fixed top-0 bottom-0 left-0 right-0 z-40 w-full h-full overflow-auto scrolling-touch bg-black bg-opacity-50"
        v-bind="attributes"
      >
        <transitionable
          :classes-list="{
            enterActiveClass: 'transition duration-100 ease-out',
            enterFromClass: 'transform scale-95 opacity-0',
            enterToClass: 'transform scale-100 opacity-100',
            leaveActiveClass: 'transition duration-75 ease-in',
            leaveFromClass: 'transform scale-100 opacity-100',
            leaveToClass: 'transform scale-95 opacity-0',
          }"
        >
          <div
            v-show="showModal"
            class="relative z-50 max-w-lg px-3 py-12 mx-auto"
          >
            <div class="relative overflow-visible bg-white rounded shadow">
              <button
                type="button"
                class="absolute top-0 right-0 flex items-center justify-center w-8 h-8 -m-3 text-gray-600 transition ease-in-out bg-gray-100 rounded-full duration-400 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 hover:bg-gray-200"
                @click="close"
              >
                <close-icon class="w-4 h-4" />
              </button>

              <div
                v-if="$slots.header || configuration.header"
                ref="header"
                class="p-3 border-b border-gray-100 rounded-t"
              >
                <slot
                  name="header"
                  :configuration="configuration"
                >
                  {{ configuration.header }}
                </slot>
              </div>

              <div
                v-if="$slots.default || configuration.body"
                ref="body"
                class="p-3"
              >
                <slot :configuration="configuration">
                  {{ configuration.body }}
                </slot>
              </div>

              <div
                v-if="$slots.footer || configuration.footer"
                ref="footer"
                class="p-3 bg-gray-100 rounded-b "
              >
                <slot
                  name="footer"
                  :configuration="configuration"
                >
                  {{ configuration.footer }}
                </slot>
              </div>
            </div>
          </div>
        </transitionable>
      </div>
    </transitionable>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent, PropType, ref, watch, nextTick,
} from 'vue';
import { TModalOptions } from '../types';
import useConfigurationWithClassesList from '../use/useConfigurationWithClassesList';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import CloseIcon from '../icons/CloseIcon.vue';
import useVModel from '../use/useVModel';
import Transitionable from './misc/Transitionable.vue';

// @TODO: move this to the core library
export const TModalConfig = {
  classes: {
    overlay: 'z-40 bg-black bg-opacity-50',
    wrapper: 'z-50 max-w-lg px-3 py-12',
    modal: 'bg-white shadow rounded',
    body: 'p-3',
    header: 'border-b border-gray-100 p-3 rounded-t',
    footer: 'bg-gray-100 p-3 rounded-b',
    close: 'bg-gray-100 text-gray-600 rounded-full absolute right-0 top-0 -m-3 h-8 w-8 transition duration-100 ease-in-out hover:bg-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50',
    closeIcon: 'fill-current h-4 w-4',
    overlayEnterClass: 'opacity-0',
    overlayEnterActiveClass: 'transition ease-out duration-100',
    overlayEnterToClass: 'opacity-100',
    overlayLeaveClass: 'opacity-100',
    overlayLeaveActiveClass: 'transition ease-in duration-75',
    overlayLeaveToClass: 'opacity-0',
    enterClass: '',
    enterActiveClass: '',
    enterToClass: '',
    leaveClass: '',
    leaveActiveClass: '',
    leaveToClass: '',
  },
};

export const TModalClassesKeys = Object.keys(TModalConfig.classes);

export type TModalClassesValidKeys = keyof typeof TModalConfig.classes;

// @vue/component
export default defineComponent({
  name: 'TModal',
  components: {
    CloseIcon,
    Transitionable,
  },
  props: {
    ...getVariantPropsWithClassesList<TModalOptions, TModalClassesValidKeys>(),
    modelValue: {
      type: Boolean,
      default: false,
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
    teleport: {
      type: Boolean,
      default: true,
    },
    teleportTo: {
      type: [String, Object] as PropType<string | HTMLElement>,
      default: 'body',
    },
  },
  setup(props, { emit }) {
    const show = useVModel(props, 'modelValue');

    const showOverlay = ref(show.value);

    const showModal = ref(show.value);

    const close = () :void => {
      show.value = false;
    };

    watch(show, (isShow: boolean) => {
      if (isShow) {
        emit('before-show');

        nextTick(() => {
          showOverlay.value = true;

          nextTick(() => {
            showModal.value = true;

            nextTick(() => {
              emit('shown');
            });
          });
        });
      } else {
        emit('before-hide');

        nextTick(() => {
          showModal.value = false;

          nextTick(() => {
            showOverlay.value = false;

            nextTick(() => {
              emit('hidden');
            });
          });
        });
      }
    });

    const { configuration, attributes } = useConfigurationWithClassesList<TModalOptions>(TModalConfig, TModalClassesKeys);

    return {
      configuration, attributes, show, close, showOverlay, showModal,
    };
  },
});

</script>
