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
});
</script>
