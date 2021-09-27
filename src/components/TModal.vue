<template>
  <teleport
    :to="configuration.teleportTo"
    :disabled="! configuration.teleport"
  >
    <div
      tabindex="0"
      class="fixed top-0 bottom-0 left-0 right-0 z-40 w-full h-full overflow-auto scrolling-touch bg-black bg-opacity-50"
      v-bind="attributes"
    >
      <div class="relative z-50 max-w-lg px-3 py-12 mx-auto">
        <div class="relative overflow-visible bg-white rounded shadow">
          <button
            type="button"
            class="absolute top-0 right-0 flex items-center justify-center w-8 h-8 -m-3 text-gray-600 transition duration-100 ease-in-out bg-gray-100 rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 hover:bg-gray-200"
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
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TModalOptions } from '../types';
import useConfigurationWithClassesList from '../use/useConfigurationWithClassesList';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import CloseIcon from '../icons/CloseIcon.vue';
import { useVModel } from '..';

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
  setup(props) {
    // const show = useVModel(props, 'modelValue');

    //
    // const show = ref(true);

    const { configuration, attributes } = useConfigurationWithClassesList<TModalOptions>(TModalConfig, TModalClassesKeys);

    return { configuration, attributes };
  },
});

</script>
