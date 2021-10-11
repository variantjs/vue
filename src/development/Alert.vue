<template>
  <t-card>
    <template #header>
      <h1>Alert</h1>
    </template>

    <TInputGroup
      label="Regular alert"
      class="mb-4"
    >
      <t-alert>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ipsam necessitatibus deserunt quas dolorum at laboriosam, expedita eveniet facere excepturi non hic esse! Facere, illum qui? Minus iste porro quidem!
      </t-alert>
    </TInputGroup>

    <TInputGroup
      label="Syncs with the show v-model"
      class="mb-4"
    >
      <div>
        <t-checkbox v-model="show" />
      </div>

      <t-alert
        v-model:show="show"
        class="mt-2"
        :close-icon="customCloseIcon"
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ipsam necessitatibus deserunt quas dolorum at laboriosam, expedita eveniet facere excepturi non hic esse! Facere, illum qui? Minus iste porro quidem!
      </t-alert>
    </TInputGroup>
  </t-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TCheckbox from '../components/TCheckbox.vue';
import TCard from '../components/TCard.vue';
import TAlert from '../components/TAlert.vue';
import TInputGroup from '../components/TInputGroup.vue';

export default defineComponent({
  name: 'App',
  components: {
    TCheckbox,
    TCard,
    TAlert,
    TInputGroup,
  },
  data() {
    return {
      show: true,
      customCloseIcon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>`,
    };
  },
  mounted() {},
});
</script>
