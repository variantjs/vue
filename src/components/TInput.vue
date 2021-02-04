<template>
  <input v-bind="customProps" />
</template>

<script lang="ts">
import { ref, defineComponent, PropType, watch } from 'vue'

import { CSSClass, Variants, parseVariant, WithVariantProps }  from '@variantjs/core'

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

  setup: (props, { attrs }) => {
    const customProps = ref<Record<string, any>>(parseVariant({ ...props, ...attrs}))

    watch(() => [props.variant, props.variants, props.fixedClasses, props.classes], () => {
      customProps.value = parseVariant({ ...props, ...attrs})
    });

    return { customProps }
  },
})
</script>
