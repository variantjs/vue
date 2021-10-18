<template>
  <t-card header="Options">
    <form method="get">
      <p>Toggle/Checkbox model sync </p>
      <t-toggle v-model="selected" />
      <t-checkbox v-model="selected" />
      <input
        v-model="selected"
        type="checkbox"
      >
      <input type="submit">
    </form>
  </t-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TToggle from '../components/TToggle.vue';
import TCheckbox from '../components/TCheckbox.vue';
import TCard from '../components/TCard.vue';

export default defineComponent({
  name: 'Check',
  components: {
    TCheckbox,
    TToggle,
    TCard,
  },
  data() {
    return {
      selected: true,

    };
  },
});
</script>
