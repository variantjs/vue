<template>
  <input
    v-model="localValue"
    v-bind="attributes"
  >
</template>

<script lang="ts">
import { CSSClass, TInputTheme, Variants } from '@variantjs/core';
import {
  ComputedOptions,
  defineComponent, EmitsOptions, MethodOptions, PropType,
} from 'vue';
import {
  TInputValue, TInputProps, TInputOptions, TInputComputedAttributes, TInputMethods, ComponentWithVariantsProps,
} from '../types';
import defineVariantComponent from '../utils/defineVariantComponent';

const props: TInputProps = {
  classes: {
    type: [String, Array, Object] as PropType<CSSClass>,
    default: undefined,
  },
  fixedClasses: {
    type: [String, Array, Object] as PropType<CSSClass>,
    default: undefined,
  },
  variants: {
    type: Object as PropType<Variants<TInputOptions>>,
    default: undefined,
  },
  variant: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
  definedProps: {
    type: Array as PropType<(keyof TInputProps)[]>,
    default: (p: TInputOptions) : (keyof TInputProps)[] => Object.keys(p) as (keyof TInputProps)[],
  },
  modelValue: {
    type: [String, Number] as PropType<TInputValue>,
    default: undefined,
  },
};

const emits: EmitsOptions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  'update:modelValue': (_: TInputValue) => true,
};

// type ComputedGetter<T> = (ctx?: TInputProps) => T;

// type ComputedSetter<T> = (v: T) => void;

// interface WritableComputedOptions<T> {
//   get: ComputedGetter<T>;
//   set: ComputedSetter<T>;
// }

// // Record<string, ComputedGetter<any> | WritableComputedOptions<any>>

// const computed: Record<string, {
//   localValue: WritableComputedOptions<TInputValue>
// }> = , ;

const TInput = defineComponent({
  props,
  emits,
  computed: {
    localValue: {
      get(): TInputValue {
        const { test4 } = this;
        const { fixedClasses } = this;
        const { configuration } = this;
        const { localValue } = this;
        return this.modelValue;
      },
      set(value: TInputValue) {
        this.$emit('update:modelValue', value);
      },
    },
  },
  methods: {
    test4(): CSSClass {
      return this.fixedClasses;
    },
  },
});

// const TInput = defineVariantComponent<
// TInputOptions,
// TInputProps,
// TInputComputedAttributes,
// TInputMethods
// >('TInput', {
//   props: {
//     modelValue: {
//       type: [String, Number] as PropType<TInputValue>,
//       default: undefined,
//     },
//   },
//   emits: {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     'update:modelValue': (_: TInputValue) => true,
//   },
//   methods: {
//     test4(): CSSClass {
//       return this.fixedClasses;
//     },
//   },
//   computed: {
//     localValue: {
//       get(): TInputValue {
//         const { test4 } = this;
//         const { fixedClasses } = this;
//         const { configuration } = this;
//         const { localValue } = this;
//         return this.modelValue;
//       },
//       set(value: TInputValue) {
//         this.$emit('update:modelValue', value);
//       },
//     },
//   },
// }, TInputTheme);

// const TInput = defineVariantComponent<
// TInputOptions,
// TInputProps,
// TInputComputedAttributes,
// TInputMethods
// >('TInput', {
//   props: {
//     modelValue: {
//       type: [String, Number] as PropType<TInputValue>,
//       default: undefined,
//     },
//   },
//   emits: {
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     'update:modelValue': (_: TInputValue) => true,
//   },
//   methods: {
//     test4(): CSSClass {
//       return this.fixedClasses;
//     },
//   },
//   computed: {
//     localValue: {
//       get(): TInputValue {
//         const { test4 } = this;
//         const { fixedClasses } = this;
//         const { configuration } = this;
//         const { localValue } = this;
//         return this.modelValue;
//       },
//       set(value: TInputValue) {
//         this.$emit('update:modelValue', value);
//       },
//     },
//   },
// }, TInputTheme);

export default TInput;
</script>
