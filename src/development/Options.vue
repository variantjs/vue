<template>
  <div>
    <div class="grid grid-cols-1 gap-6">
      <p>Options components v-model sync</p>
      <t-select
        v-model="selected"
        :options="options"
      />

      <t-rich-select
        v-model="selected"
        placeholder="select an option"
        :options="options"
      />

      <div>
        <label
          v-for="option in options"
          :key="option"
          class="flex items-center"
        >
          <t-radio
            v-model="selected"
            :value="option"
            name="option"
          />

          <span class="ml-2">{{ option }}</span>
        </label>
      </div>
    </div>

    <t-button @click="selected = null">
      Clear value
    </t-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TSelect from '../components/TSelect.vue';
import TRadio from '../components/TRadio.vue';
import TRichSelect from '../components/TRichSelect.vue';
import TButton from '../components/TButton.vue';

export default defineComponent({
  name: 'Options',
  components: {
    TSelect,
    TRadio,
    TButton,
    TRichSelect,
  },
  data() {
    return {
      selected: 'A',
      options: [
        'A',
        'B',
        'C',
      ],
    };
  },
});
</script>
