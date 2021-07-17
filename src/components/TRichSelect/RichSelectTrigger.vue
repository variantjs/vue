<template>
  <button
    :class="classesList.selectButton"
    type="button"
  >
    <text-placeholder
      ref="placeholder"
      class-property="selectButtonPlaceholder"
    />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { TRichSelectConfig } from '@variantjs/core';
import TextPlaceholder from '../misc/TextPlaceholder.vue';
import useProvidesClassesList from '../../use/useProvidesClassesList';

export default defineComponent({
  name: 'RichSelectTrigger',
  components: {
    TextPlaceholder,
  },
  setup() {
    const classesList = useProvidesClassesList<typeof TRichSelectConfig.classes>();

    return { classesList };
  },
});
</script>
