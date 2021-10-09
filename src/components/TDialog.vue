<template>
  <t-modal
    ref="modalRef"
    v-model="showModel"
    :modal-attributes="configuration.modalAttributes"
    :focus-on-open="false"
    :click-to-close="configuration.clickToClose"
    :esc-to-close="configuration.escToClose"
    :hide-close-button="! configuration.showCloseButton"
    :disable-body-scroll="configuration.disableBodyScroll"
    :body-scroll-lock-options="configuration.bodyScrollLockOptions"
    :teleport="configuration.teleport"
    :teleport-to="configuration.teleportTo"
    :classes="modalClasses"
    :fixed-classes="undefined"
    @shown="onShown"
    @hidden="onHidden"
    @before-show="onBeforeShow"
    @before-hide="onBeforeHide"
  >
    <slot
      :hide="hide"
      :ok="ok"
      :cancel="cancel"
    >
      <div
        v-if="configuration.icon"
        :class="configuration.classesList?.iconWrapper"
      >
        <slot
          name="icon"
          :hide="hide"
          :ok="ok"
          :cancel="cancel"
        >
          <template v-if="configuration.useSolidIcon">
            <solid-check-circle-icon
              v-if="configuration.icon === 'success'"
              :class="configuration.classesList?.icon"
            />
            <solid-question-mark-circle-icon
              v-else-if="configuration.icon === 'question'"
              :class="configuration.classesList?.icon"
            />
            <solid-information-circle-icon
              v-else-if="configuration.icon === 'info'"
              :class="configuration.classesList?.icon"
            />
            <solid-exclamation-icon
              v-else-if="configuration.icon === 'warning'"
              :class="configuration.classesList?.icon"
            />
            <solid-cross-circle-icon
              v-else-if="configuration.icon === 'error'"
              :class="configuration.classesList?.icon"
            />
          </template>
          <template v-else>
            <check-circle-icon
              v-if="configuration.icon === 'success'"
              :class="configuration.classesList?.icon"
            />
            <question-mark-circle-icon
              v-else-if="configuration.icon === 'question'"
              :class="configuration.classesList?.icon"
            />
            <information-circle-icon
              v-else-if="configuration.icon === 'info'"
              :class="configuration.classesList?.icon"
            />
            <exclamation-icon
              v-else-if="configuration.icon === 'warning'"
              :class="configuration.classesList?.icon"
            />
            <cross-circle-icon
              v-else-if="configuration.icon === 'error'"
              :class="configuration.classesList?.icon"
            />
          </template>
        </slot>
      </div>

      <div :class="configuration.classesList?.content">
        <div :class="configuration.classesList?.titleWrapper">
          <component
            :is="configuration.titleTag"
            :class="configuration.classesList?.title"
          >
            <slot
              name="title"
              :hide="hide"
              :ok="ok"
              :cancel="cancel"
            >
              {{ configuration.title }}
            </slot>
          </component>
        </div>
        <div :class="configuration.classesList?.textWrapper">
          <component
            :is="configuration.textTag"
            :class="configuration.classesList?.text"
          >
            <slot
              name="text"
              :hide="hide"
              :ok="ok"
              :cancel="cancel"
            >
              {{ configuration.text }}
            </slot>
          </component>
        </div>

        <template v-if="configuration.type === 'prompt'">
          <div
            ref="inputWrapperRef"
            :class="configuration.classesList?.inputWrapper"
          >
            <slot
              name="input"
              :hide="hide"
              :ok="ok"
              :cancel="cancel"
              :setInputValue="setInputValue"
              :inputValue="inputValue"
              :variant="configuration.inputVariant"
              :inputAttributes="configuration.inputAttributes"
            >
              <input
                v-model="inputModel"
                :variant="configuration.inputVariant"
                :type="configuration.inputType"
                :class="configuration.classesList?.input"
                v-bind="configuration.inputAttributes"
              >
            </slot>
          </div>
        </template>
      </div>
    </slot>

    <template #footer>
      <slot
        name="footer"
        :hide="hide"
        :ok="ok"
        :cancel="cancel"
      >
        <button
          v-if="showCancelButton"
          type="button"
          :class="configuration.classesList?.cancelButton"
          :aria-label="cancelButtonAriaLabel"
          @click="cancel"
        >
          {{ cancelButtonText }}
        </button>
        <button
          type="button"
          :class="configuration.classesList?.okButton"
          :aria-label="okButtonAriaLabel"
          @click="ok"
        >
          {{ okButtonText }}
        </button>
      </slot>
    </template>
  </t-modal>
</template>

<script lang="ts">
import {
  defineComponent, PropType, HTMLAttributes, inject, computed, ref, onMounted,
} from 'vue';
import { BodyScrollOptions } from 'body-scroll-lock';
import {
  Data, TDialogClassesKeys, TDialogClassesValidKeys, DialogType, DialogPreconfirmFn, DialogResponse, DialogHideReason, DialogInputValidatorFn, TDialogConfig, ModalHideReason, getFocusableElements,
} from '@variantjs/core';
import {
  TDialogOptions, EmitterInterface, PromiseRejectFn,
} from '../types';
import useConfigurationWithClassesList from '../use/useConfigurationWithClassesList';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import useVModel from '../use/useVModel';
import TModal from './TModal.vue';

import CheckCircleIcon from '../icons/CheckCircleIcon.vue';
import QuestionMarkCircleIcon from '../icons/QuestionMarkCircleIcon.vue';
import InformationCircleIcon from '../icons/InformationCircleIcon.vue';
import ExclamationIcon from '../icons/ExclamationIcon.vue';
import SolidCheckCircleIcon from '../icons/SolidCheckCircleIcon.vue';
import SolidQuestionMarkCircleIcon from '../icons/SolidQuestionMarkCircleIcon.vue';
import SolidInformationCircleIcon from '../icons/SolidInformationCircleIcon.vue';
import SolidExclamationIcon from '../icons/SolidExclamationIcon.vue';
import CrossCircleIcon from '../icons/CrossCircleIcon.vue';
import SolidCrossCircleIcon from '../icons/SolidCrossCircleIcon.vue';

// @vue/component
export default defineComponent({
  name: 'TDialog',
  components: {
    TModal,
    CrossCircleIcon,
    SolidCrossCircleIcon,
    CheckCircleIcon,
    QuestionMarkCircleIcon,
    InformationCircleIcon,
    ExclamationIcon,
    SolidQuestionMarkCircleIcon,
    SolidInformationCircleIcon,
    SolidExclamationIcon,
    SolidCheckCircleIcon,
  },
  props: {
    ...getVariantPropsWithClassesList<TDialogOptions, TDialogClassesValidKeys>(),
    type: {
      type: String,
      default: DialogType.Alert,
    },
    icon: {
      type: String,
      default: undefined,
    },
    useSolidIcon: {
      type: Boolean,
      default: false,
    },
    rejectOnCancel: {
      type: Boolean,
      default: true,
    },
    rejectOnDismiss: {
      type: Boolean,
      default: undefined,
    },
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
      default: 'Cancel',
    },
    okButtonText: {
      type: String,
      default: 'OK',
    },
    okButtonAriaLabel: {
      type: String,
      default: 'OK',
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
    inputAttributes: {
      type: Object as PropType<HTMLAttributes & Data>,
      default: () => ({}),
    },
    inputType: {
      type: String,
      default: 'text',
    },
    inputValidator: {
      type: Function as PropType<DialogInputValidatorFn>,
      default: undefined,
    },
    inputValue: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol],
      default: undefined,
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
    'update:inputValue': () => true,
  },
  setup(props, { emit }) {
    const { configuration, attributes } = useConfigurationWithClassesList<TDialogOptions>(TDialogConfig, TDialogClassesKeys);

    const inputWrapperRef = ref<HTMLDivElement>();

    const modalRef = ref<typeof TModal>();

    const showModel = useVModel(props, 'modelValue');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputModel = ref<any>(props.inputValue);

    const hideReason = ref<DialogHideReason | undefined>(DialogHideReason.Other);

    const promiseResolve = ref<((value: DialogResponse) => void) | undefined>(undefined);

    const promiseReject = ref<PromiseRejectFn | undefined>(undefined);

    const isPrompt = computed<boolean>(() => configuration.type === DialogType.Prompt);

    const focusDialog = () => {
      modalRef.value!.focusModal();
    };

    const focusPromptInput = () => {
      const focusableField = getFocusableElements(inputWrapperRef.value!).shift();
      if (focusableField) {
        focusableField.focus();
      }
    };

    const initDialog = () => {
      if (configuration.focusOnOpen) {
        if (isPrompt.value) {
          focusPromptInput();
        } else {
          focusDialog();
        }
      }
    };

    onMounted(() => {
      if (showModel.value) {
        initDialog();
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const setInputValue = (value: any) => {
      inputModel.value = value;
    };

    const reset = (): void => {
      promiseResolve.value = undefined;
      promiseReject.value = undefined;
      hideReason.value = undefined;
      setInputValue(props.inputValue);
    };

    const onBeforeShow = (e: { cancel: PromiseRejectFn, params: unknown }) => {
      emit('before-show', e);
    };

    const onBeforeHide = (e: { cancel: PromiseRejectFn, reason: ModalHideReason }) => {
      emit('before-hide', e);
    };

    const rejectOnDismiss = computed<boolean>(() => {
      if (configuration.rejectOnDismiss === undefined) {
        return configuration.type !== DialogType.Alert;
      }

      return configuration.rejectOnDismiss;
    });

    const onHidden = (reason: DialogHideReason) => {
      emit('hidden');

      const hideReasonValue = hideReason.value !== undefined ? hideReason.value : reason;

      const response: DialogResponse = {
        hideReason: hideReasonValue,
        isOk: hideReasonValue === DialogHideReason.Ok,
        isCancel: hideReasonValue === DialogHideReason.Cancel,
        isDismissed: ![DialogHideReason.Cancel, DialogHideReason.Ok].includes(hideReasonValue),
        response: {},
      };

      if (isPrompt.value) {
        response.input = inputModel.value;
      }

      if (
        (response.isCancel && configuration.rejectOnCancel)
        || (response.isDismissed && rejectOnDismiss.value)
      ) {
        if (promiseReject.value) {
          promiseReject.value(response);
        }
      } else if (promiseResolve.value) {
        promiseResolve.value(response);
      }

      reset();
    };

    const onShown = () => {
      emit('shown');

      initDialog();
    };

    const hide = (reason: DialogHideReason = DialogHideReason.Other) :void => {
      hideReason.value = reason;

      showModel.value = false;
    };

    const ok = () :void => {
      hide(DialogHideReason.Ok);
    };

    const cancel = () :void => {
      hide(DialogHideReason.Cancel);
    };

    const show = () : Promise<DialogResponse> | void => {
      if (promiseResolve.value !== undefined) {
        showModel.value = true;
        return;
      }

      const promise = new Promise((resolve, reject) => {
        promiseResolve.value = resolve;

        promiseReject.value = reject;

        showModel.value = true;
      });

      // eslint-disable-next-line consistent-return
      return promise as Promise<DialogResponse>;
    };

    if (configuration.name) {
      const emitter = inject<EmitterInterface>('emitter')!;

      emitter.on('dialog:show', (name: string, resolve: ((value: DialogResponse) => void), reject: PromiseRejectFn) => {
        if (configuration.name !== name) {
          return;
        }

        promiseResolve.value = resolve;

        promiseReject.value = reject;

        show();
      });

      emitter.on('dialog:hide', (name) => {
        if (configuration.name !== name) {
          return;
        }

        hide(DialogHideReason.Method);
      });
    }

    const modalClasses = computed(() => ({
      overlay: configuration.classesList!.overlay,
      wrapper: configuration.classesList!.wrapper,
      close: configuration.classesList!.close,
      closeIcon: configuration.classesList!.closeIcon,
      modal: configuration.classesList!.dialog,
      body: configuration.classesList!.body,
      footer: configuration.classesList!.buttons,
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

    const showCancelButton = computed(() => configuration.type !== DialogType.Alert);

    return {
      configuration,
      attributes,
      showModel,
      modalClasses,
      showCancelButton,
      DialogHideReason,
      inputModel,
      show,
      hide,
      ok,
      cancel,
      onBeforeShow,
      onBeforeHide,
      onShown,
      onHidden,
      setInputValue,
      inputWrapperRef,
      modalRef,
    };
  },
});
</script>
