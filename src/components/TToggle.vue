<template>
  <span
    role="checkbox"
    tabindex="0"
    :aria-checked="isChecked ? 'true' : 'false'"
    :class="classes.wrapper"
  >
    <input
      v-model="localValue"
      type="hidden"
    >
    <span
      aria-hidden="true"
      :class="configuration.classesList?.uncheckedPlaceholder"
    />
    <span
      aria-hidden="true"
      :class="configuration.classesList?.checkedPlaceholder"
    />
    <span
      aria-hidden="true"
      :class="classes.button"
    />
  </span>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import {
  TToggleConfig,
  TToggleClassesKeys,
  TToggleClassesValidKeys,
} from '@variantjs/core';
import useConfigurationWithClassesList from '../use/useConfigurationWithClassesList';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { TToggleOptions, TToggleValue } from '../types/components/t-toggle';
import useVModel from '../use/useVModel';

// @vue/component
export default defineComponent({
  name: 'TToggle',
  props: {
    ...getVariantPropsWithClassesList<TToggleOptions, TToggleClassesValidKeys>(),
    modelValue: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<TToggleValue>,
      default: undefined,
    },
  },
  setup(props) {
    const { configuration, attributes } = useConfigurationWithClassesList<TToggleOptions>(TToggleConfig, TToggleClassesKeys);

    const localValue = useVModel(props, 'modelValue');

    const isChecked = computed(() => {
      console.log(localValue.value);
      return true;
    });

    const isDisabled = computed(() => false);

    const classes = computed(() => {
      if (isDisabled.value) {
        return {
          wrapper: isChecked.value ? configuration.classesList?.wrapperCheckedDisabled : configuration.classesList?.wrapperDisabled,
          button: configuration.classesList?.buttonChecked,
        };
      }

      if (isChecked.value) {
        return {
          wrapper: configuration.classesList?.wrapperChecked,
          button: configuration.classesList?.buttonChecked,
        };
      }

      return {
        wrapper: configuration.classesList?.wrapper,
        button: configuration.classesList?.button,
      };
    });

    return {
      configuration,
      attributes,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      localValue: localValue as any,
      isChecked,
      classes,
    };
  },
});

</script>
