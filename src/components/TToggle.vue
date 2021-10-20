<template>
  <button
    role="checkbox"
    tabindex="0"
    :aria-checked="isChecked ? 'true' : 'false'"
    :class="classes.wrapper"
    type="button"
    @click="toggle"
  >
    <input
      v-if="!isMultiple || isChecked"
      :value="inputValue"
      type="hidden"
      :name="configuration.name"
    >
    <span
      aria-hidden="true"
      :class="configuration.classesList?.uncheckedPlaceholder"
      v-text="configuration.uncheckedPlaceholder"
    />

    <span
      aria-hidden="true"
      :class="configuration.classesList?.checkedPlaceholder"
      v-text="configuration.checkedPlaceholder"
    />
    <span
      aria-hidden="true"
      :class="classes.button"
    />
  </button>
</template>

<script lang="ts">
import {
  defineComponent, PropType, computed, ref, watch, getCurrentInstance,
} from 'vue';
import {
  TToggleConfig,
  TToggleClassesKeys,
  TToggleClassesValidKeys,
  isEqual,
  hasProperty,
  substractFromArray,
  addToArray,
} from '@variantjs/core';
import useConfigurationWithClassesList from '../use/useConfigurationWithClassesList';
import { getVariantPropsWithClassesList } from '../utils/getVariantProps';
import { TToggleOptions, TToggleValue } from '../types/components/t-toggle';

// @vue/component
export default defineComponent({
  name: 'TToggle',
  props: {
    ...getVariantPropsWithClassesList<TToggleOptions, TToggleClassesValidKeys>(),
    name: {
      type: String,
      default: undefined,
    },
    modelValue: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<TToggleValue>,
      default: undefined,
    },
    value: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<TToggleValue>,
      default: true,
    },
    uncheckedValue: {
      type: [String, Number, Boolean, Array, Object, Date, Function, Symbol] as PropType<TToggleValue>,
      default: false,
    },
    checked: {
      type: Boolean,
      default: undefined,
    },
    checkedPlaceholder: {
      type: String,
      default: undefined,
    },
    uncheckedPlaceholder: {
      type: String,
      default: undefined,
    },
  },
  setup(props, { emit }) {
    const { configuration, attributes } = useConfigurationWithClassesList<TToggleOptions>(TToggleConfig, TToggleClassesKeys);

    const vm = getCurrentInstance();

    const getInitialValue = (): TToggleValue => {
      const modelValueIsDefined = hasProperty(vm!.vnode.props || {}, 'modelValue');
      if (modelValueIsDefined) {
        return props.modelValue;
      }

      if (configuration.checked === true) {
        return configuration.value;
      }

      return configuration.uncheckedValue;
    };

    const localValue = ref<TToggleValue>(getInitialValue());

    const isMultiple = computed<boolean>(() => Array.isArray(localValue.value));

    const isChecked = computed<boolean>(() => {
      if (isMultiple.value) {
        return (localValue.value as TToggleValue[]).some((value) => isEqual(value, configuration.value));
      }

      return isEqual(localValue.value, configuration.value);
    });

    const inputValue = computed(() => {
      if (isChecked.value) {
        return configuration.value;
      }

      return configuration.uncheckedValue;
    });

    const check = () => {
      if (isMultiple.value) {
        localValue.value = addToArray(localValue.value, configuration.value);
      } else {
        localValue.value = configuration.value;
      }
    };

    const uncheck = () => {
      if (isMultiple.value) {
        localValue.value = substractFromArray(localValue.value, configuration.value);
      } else {
        localValue.value = configuration.uncheckedValue;
      }
    };

    const toggle = () => {
      if (isChecked.value) {
        uncheck();
      } else {
        check();
      }
    };

    watch(localValue, (newValue: TToggleValue) => {
      emit('update:modelValue', newValue);
    });
    watch(isChecked, (newIsChecked: boolean) => {
      emit('update:checked', newIsChecked);
    });

    watch(() => props.modelValue, (newModelValue: TToggleValue) => {
      localValue.value = newModelValue;
    });

    watch(() => configuration.checked, (newChecked: boolean | undefined) => {
      if (newChecked) {
        check();
      } else {
        uncheck();
      }
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
      isMultiple,
      classes,
      inputValue,
      toggle,
    };
  },
});

</script>
