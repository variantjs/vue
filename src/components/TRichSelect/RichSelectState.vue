<template>
  <div
    v-if="fetchingOptions"
    class="px-2 text-sm text-gray-400"
  >
    Searching...
  </div>
  <div
    v-else
    class="px-2 text-sm text-gray-400"
  >
    Please enter 1 or more characters
  </div>
</template>

<script lang="ts">
import {
  defineComponent, inject, Ref,
} from 'vue';

export default defineComponent({
  name: 'RichSelectState',
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const fetchingOptions = inject<Ref<boolean>>('fetchingOptions')!;

    return {
      fetchingOptions,
    };
  },
});
</script>
