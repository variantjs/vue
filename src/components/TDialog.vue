<template>
  <t-modal
    v-model="showModel"
    :modal-attributes="configuration.modalAttributes"
    :focus-on-open="configuration.focusOnOpen"
    :click-to-close="configuration.clickToClose"
    :esc-to-close="configuration.escToClose"
    :hide-close-button="! configuration.showCloseButton"
    :disable-body-scroll="configuration.disableBodyScroll"
    :body-scroll-lock-options="configuration.bodyScrollLockOptions"
    :teleport="configuration.teleport"
    :teleport-to="configuration.teleportTo"
    :classes="modalClasses"
    :fixed-classes="undefined"
    @shown="$emit('shown')"
    @hidden="$emit('hidden')"
    @before-show="$emit('before-show', $event)"
    @before-hide="$emit('before-hide', $event)"
  >
    <template #default="{ hide }">
      <slot :hide="hide">
        <div
          v-if="configuration.icon"
          :class="configuration.classesList?.iconWrapper"
        >
          <slot
            name="icon"
            :hide="hide"
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
              >
                {{ configuration.text }}
              </slot>
            </component>
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
          :class="configuration.classesList?.cancelButton"
          :aria-label="cancelButtonAriaLabel"
        >
          {{ cancelButtonText }}
        </button>
        <button
          type="button"
          :class="configuration.classesList?.okButton"
          :aria-label="okButtonAriaLabel"
        >
          {{ okButtonText }}
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
  Data, TDialogClassesKeys, TDialogClassesValidKeys, DialogType, DialogPreconfirmFn, TDialogConfig, DialogIcon,
} from '@variantjs/core';
import { TDialogOptions, EmitterInterface } from '../types';
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
      type: String as PropType<DialogType>,
      default: DialogType.Alert,
    },
    icon: {
      type: String as PropType<DialogIcon>,
      default: undefined,
    },
    useSolidIcon: {
      type: Boolean,
      default: false,
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

    return {
      configuration,
      attributes,
      showModel,
      modalClasses,
    };
  },
});
</script>
