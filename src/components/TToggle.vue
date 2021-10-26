<template>
  <button
    type="button"
    role="checkbox"
    :aria-checked="isChecked ? 'true' : 'false'"
    :class="classes.wrapper"
    :disabled="configuration.disabled"
    @click="toggle"
  >
    <input
      v-if="!isMultiple || isChecked"
      :value="inputValue"
      type="hidden"
      :name="configuration.name"
      :disabled="configuration.disabled"
    >
    <span
      aria-hidden="true"
      :class="configuration.classesList?.uncheckedPlaceholder"
    >
      <slot
        name="unchecked"
        :value="inputValue"
        :is-checked="isChecked"
      >{{ configuration.uncheckedPlaceholder }}</slot>
    </span>

    <span
      aria-hidden="true"
      :class="configuration.classesList?.checkedPlaceholder"
    >
      <slot
        name="checked"
        :value="inputValue"
        :is-checked="isChecked"
      >{{ configuration.checkedPlaceholder }}</slot>
    </span>
    <span
      aria-hidden="true"
      :class="classes.button"
    >
      <slot
        :value="inputValue"
        :is-checked="isChecked"
      />
    </span>
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
import { getGlobalComponentOptions } from '../utils/getGlobalComponentOptions';

// @vue/component
export default defineComponent({
  ...getGlobalComponentOptions(),
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
    disabled: {
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
  emits: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:checked': (isChecked: boolean) => true,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    'update:modelValue': (value: TToggleValue) => true,
  },
  setup(props, { emit }) {
    const { configuration, attributes } = useConfigurationWithClassesList<TToggleOptions>(TToggleConfig, TToggleClassesKeys);

    const vm = getCurrentInstance();

    const getInitialValue = (): TToggleValue => {
      const modelValueIsDefined = hasProperty(vm!.vnode.props, 'modelValue');

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

    const classes = computed(() => {
      if (configuration.disabled) {
        return {
          wrapper: isChecked.value ? configuration.classesList!.wrapperCheckedDisabled : configuration.classesList!.wrapperDisabled,
          button: isChecked.value ? configuration.classesList!.buttonChecked : configuration.classesList!.button,
        };
      }

      return {
        wrapper: isChecked.value ? configuration.classesList!.wrapperChecked : configuration.classesList!.wrapper,
        button: isChecked.value ? configuration.classesList!.buttonChecked : configuration.classesList!.button,
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
