<template>
  <teleport
    v-if="showComponent"
    :to="configuration.teleportTo"
    :disabled="! configuration.teleport"
  >
    <transitionable :classes-list="overlayTransitionClassesList">
      <div
        v-show="showOverlay"
        v-bind="attributes"
        ref="overlay"
        tabindex="0"
        :class="configuration.classesList?.overlay"
        @keydown.escape="onKeydownEscapeHandler"
        @click="onClickHandler"
      >
        <transitionable :classes-list="configuration.classesList">
          <div
            v-show="showModal"
            :class="configuration.classesList?.wrapper"
            v-bind="modalAttributes"
            @click.stop
          >
            <template v-if="noBody">
              <slot />
            </template>
            <div
              v-else
              :class="configuration.classesList?.modal"
            >
              <button
                v-if="!hideCloseButton"
                type="button"
                :class="configuration.classesList?.close"
                @click="hide"
              >
                <close-icon :class="configuration.classesList?.closeIcon" />
              </button>

              <div
                v-if="$slots.header || configuration.header"
                ref="header"
                :class="configuration.classesList?.header"
              >
                <slot name="header">
                  {{ configuration.header }}
                </slot>
              </div>

              <div
                v-if="$slots.default || configuration.body"
                ref="body"
                :class="configuration.classesList?.body"
              >
                <slot>
                  {{ configuration.body }}
                </slot>
              </div>

              <div
                v-if="$slots.footer || configuration.footer"
                ref="footer"
                :class="configuration.classesList?.footer"
              >
                <slot name="footer">
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
  defineComponent, PropType, ref, watch, nextTick, onBeforeUnmount, onMounted, HTMLAttributes, inject, computed,
} from 'vue';
import { BodyScrollOptions, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import {
  Data, TModalConfig, TModalClassesKeys, TModalClassesValidKeys,
} from '@variantjs/core';
import { TModalOptions, EmitterInterface } from '../types';
import useConfigurationWithClassesList from '../use/useConfigurationWithClassesList';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import CloseIcon from '../icons/CloseIcon.vue';
import useVModel from '../use/useVModel';
import Transitionable from './misc/Transitionable.vue';

// @vue/component
export default defineComponent({
  name: 'TModal',
  components: {
    CloseIcon,
    Transitionable,
  },
  props: {
    ...getVariantPropsWithClassesList<TModalOptions, TModalClassesValidKeys>(),
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
    disableBodyScroll: {
      type: Boolean,
      default: true,
    },
    noBody: {
      type: Boolean,
      default: false,
    },
    hideCloseButton: {
      type: Boolean,
      default: false,
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
  setup(props, { emit }) {
    const { configuration, attributes } = useConfigurationWithClassesList<TModalOptions>(TModalConfig, TModalClassesKeys);

    const overlay = ref<HTMLDivElement>();

    let modalParameters: unknown;

    const showModel = useVModel(props, 'modelValue');

    const showComponent = ref(showModel.value);

    const showOverlay = ref(showModel.value);

    const showModal = ref(showModel.value);

    const canceled = ref(false);

    const hide = () :void => {
      showModel.value = false;
    };

    const show = (params: unknown) :void => {
      modalParameters = params;

      showModel.value = true;
    };

    const initModal = () :void => {
      if (configuration.focusOnOpen) {
        overlay.value!.focus();
      }

      if (configuration.disableBodyScroll) {
        disableBodyScroll(overlay.value!, configuration.bodyScrollLockOptions);
      }
    };

    const reset = () :void => {
      if (configuration.disableBodyScroll) {
        enableBodyScroll(overlay.value!);
      }

      modalParameters = undefined;
    };

    const onBeforeShow = () : Promise<void> => new Promise((resolve, reject) => {
      emit('before-show', {
        cancel: reject,
        params: modalParameters,
      });

      resolve();
    });

    const onBeforeHide = () : Promise<void> => new Promise((resolve, reject) => {
      emit('before-hide', {
        cancel: reject,
      });

      resolve();
    });

    const onShown = () :void => {
      emit('shown');

      initModal();
    };

    const onHidden = () :void => {
      emit('hidden');

      reset();
    };

    watch(showModel, async (isShow: boolean): Promise<void> => {
      if (canceled.value) {
        canceled.value = false;
        return;
      }

      if (isShow) {
        try {
          await onBeforeShow();
        } catch (e) {
          canceled.value = true;
          showModel.value = false;
          return;
        }

        showComponent.value = true;

        nextTick(() => {
          showOverlay.value = true;

          nextTick(() => {
            showModal.value = true;

            nextTick(() => {
              onShown();
            });
          });
        });
      } else {
        try {
          await onBeforeHide();
        } catch (e) {
          canceled.value = true;
          showModel.value = true;
          return;
        }

        showModal.value = false;

        nextTick(() => {
          showOverlay.value = false;

          nextTick(() => {
            showComponent.value = true;

            nextTick(() => {
              onHidden();
            });
          });
        });
      }
    });

    const onKeydownEscapeHandler = () :void => {
      if (!configuration.escToClose) {
        return;
      }

      hide();
    };

    const onClickHandler = () :void => {
      if (!configuration.clickToClose) {
        return;
      }

      hide();
    };

    onMounted(() => {
      if (showModel.value) {
        initModal();
      }
    });

    onBeforeUnmount(() => {
      reset();
    });

    if (configuration.name) {
      const emitter = inject<EmitterInterface>('emitter')!;

      emitter.on('modal:show', (name, params) => {
        if (configuration.name !== name) {
          return;
        }

        show(params);
      });

      emitter.on('modal:hide', (name) => {
        if (configuration.name !== name) {
          return;
        }

        hide();
      });
    }

    const overlayTransitionClassesList = computed(() => ({
      enterActiveClass: configuration.classesList?.overlayEnterActiveClass,
      enterFromClass: configuration.classesList?.overlayEnterFromClass,
      enterToClass: configuration.classesList?.overlayEnterToClass,
      leaveActiveClass: configuration.classesList?.overlayLeaveActiveClass,
      leaveFromClass: configuration.classesList?.overlayLeaveFromClass,
      leaveToClass: configuration.classesList?.overlayLeaveToClass,
    }));

    return {
      configuration,
      attributes,
      showOverlay,
      showModal,
      showComponent,
      overlay,
      overlayTransitionClassesList,
      show,
      hide,
      onKeydownEscapeHandler,
      onClickHandler,
    };
  },
});
</script>
