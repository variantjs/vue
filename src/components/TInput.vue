<template>
  <input
    v-bind="customProps"
    @change="test2"
    @input="testMethod"
  >
</template>

<script lang="ts">
import { WithVariantProps, TInput as componentDefaultConfiguration, ObjectWithClassName } from '@variantjs/core';
import defineVariantComponent from '../utils/defineVariantComponent';

export type TInputProps = WithVariantProps<Record<string, never>>;

export default defineVariantComponent<TInputProps>({
  // --
}, componentDefaultConfiguration as ObjectWithClassName);
</script>
