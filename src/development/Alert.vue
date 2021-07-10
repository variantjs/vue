<template>
  <div>
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
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ipsam necessitatibus deserunt quas dolorum at laboriosam, expedita eveniet facere excepturi non hic esse! Facere, illum qui? Minus iste porro quidem!
        </t-alert>
      </TInputGroup>
    </t-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TCheckbox from '../components/TCheckbox.vue';
import TCard from '../components/TCard.vue';
import TAlert from '../components/TAlert.vue';
import TInputGroup from '../components/TInputGroup.vue';

// <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
//   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
// </svg>
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
    };
  },
  mounted() {},
});
</script>
