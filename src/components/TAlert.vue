<template>
  <transitionable
    :classes-list="configuration.classesList"
    :enabled="animate"
  >
    <component
      :is="tagName"
      v-if="shown"
      v-bind="attributes"
      ref="wrapper"
      :class="configuration.classesList?.wrapper"
    >
      <component
        :is="bodyTagName"
        ref="body"
        :class="configuration.classesList?.body"
      >
        <slot
          :show="doShow"
          :hide="doHide"
          :toggle="doToggle"
          :configuration="configuration"
        >
          {{ configuration.text }}
        </slot>
      </component>

      <button
        v-if="dismissible"
        ref="close"
        type="button"
        :class="configuration.classesList?.close"
        @click="doHide"
      >
        <slot
          name="closeButton"
          :show="doShow"
          :hide="doHide"
          :toggle="doToggle"
          :configuration="configuration"
        >
          <custom-icon
            v-if="closeIcon"
            ref="closeIcon"
            :icon="closeIcon"
            :class="configuration.classesList?.closeIcon"
          />
          <close-icon
            v-else
            ref="closeIcon"
          />
        </slot>
      </button>
    </component>
  </transitionable>
</template>

<script lang="ts">
import { TAlertConfig, TAlertClassesKeys, TAlertClassesValidKeys } from '@variantjs/core';
import { defineComponent, PropType } from 'vue';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { useAttributes, useConfigurationWithClassesList } from '../use';
import { IconProp, TAlertOptions } from '../types';
import CustomIcon from '../icons/CustomIcon.vue';
import CloseIcon from '../icons/CloseIcon.vue';
import Transitionable from './misc/Transitionable.vue';

// @vue/component
export default defineComponent({
  name: 'TAlert',
  components: {
    CustomIcon,
    CloseIcon,
    Transitionable,
  },
  props: {
    ...getVariantPropsWithClassesList<TAlertOptions, TAlertClassesValidKeys>(),
    text: {
      type: String,
      default: undefined,
    },
    tagName: {
      type: String,
      default: 'div',
    },
    bodyTagName: {
      type: String,
      default: 'div',
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: true,
    },
    timeout: {
      type: Number,
      default: undefined,
    },
    animate: {
      type: Boolean,
      default: true,
    },
    closeIcon: {
      type: [Object, String] as PropType<IconProp>,
      default: undefined,
    },
  },
  emits: {
    'update:show': (show: boolean) => typeof show === 'boolean',
  },
  setup() {
    const configuration = useConfigurationWithClassesList<TAlertOptions>(TAlertConfig, TAlertClassesKeys);
    const attributes = useAttributes<TAlertOptions>(configuration);

    return { configuration, attributes };
  },
  data({ configuration }) {
    return {
      shown: (configuration as unknown as TAlertOptions).show,
      timer: null as ReturnType<typeof setTimeout> | null,
    };
  },
  watch: {
    shown(shown: boolean): void {
      this.$emit('update:show', shown);
    },
    'configuration.show': function configurationShowWatch(show: boolean): void {
      if (show) {
        this.doShow();
      } else {
        this.doHide();
      }
    },
  },
  mounted() {
    if (this.timeout) {
      this.timer = setTimeout(() => this.doHide(), this.timeout);
    }
  },
  unmounted() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },
  methods: {
    doToggle(): void {
      if (!this.shown) {
        this.doShow();
      } else {
        this.doHide();
      }
    },
    doShow(): void {
      this.shown = true;
    },
    doHide(): void {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }

      this.shown = false;
    },
  },
});

</script>
