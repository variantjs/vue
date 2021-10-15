<template>
  <t-card>
    <template #header>
      <h1>VariantJS</h1>
    </template>

    <p>Development playground used for testing purposes.</p>

    <template #footer>
      <p>Made by love by <a href="">@alfonsobries</a></p>
    </template>
  </t-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TCard from '../components/TCard.vue';

export default defineComponent({
  name: 'About',
  components: {
    TCard,
  },
});
</script>
