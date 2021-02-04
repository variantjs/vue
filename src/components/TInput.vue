<template>
  <input v-bind="customProps" />
</template>

<script lang="ts">
import { ref, defineComponent, PropType, watch } from 'vue'

import { CSSClass, Variants, parseVariant, WithVariantProps, TInput as TInputTheme, pick } from '@variantjs/core'

console.log(TInputTheme)
type TInputProps = WithVariantProps<{}>

export default defineComponent({
  name: 'TInput',
  
  props: {
    classes: {
      type: [String, Array, Object] as PropType<CSSClass>,
      default: undefined
    },
    fixedClasses: {
      type: [String, Array, Object] as PropType<CSSClass>,
      default: undefined
    },
    variants: {
      type: Object as PropType<Variants<TInputProps>>,
      default: undefined
    },
    variant: {
      type: String as PropType<string>,
      default: undefined
    },
  },

  setup: (props) => {
    const definedProps = pick(props, value => value!== undefined)
    const customProps = ref<Record<string, any>>(parseVariant(definedProps, undefined, TInputTheme))
    
    watch(() => [props.variant, props.variants, props.fixedClasses, props.classes], () => {
      const definedProps = pick(props, value => value!== undefined)
      customProps.value = parseVariant(definedProps, undefined, TInputTheme)
    });

    return { customProps }
  },
})
</script>
