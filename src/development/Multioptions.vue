<template>
  <div>
    <div class="grid grid-cols-1 gap-6">
      <p>Multioptions components v-model sync</p>
      <t-select
        v-model="selected"
        multiple
        :options="options"
      />

      <div>
        <label
          v-for="option in options"
          :key="option"
          class="flex items-center"
        >
          <t-checkbox
            v-model="selected"
            :value="option"
            name="option"
          />

          <span class="ml-2">{{ option }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TSelect from '../components/TSelect.vue';
import TCheckbox from '../components/TCheckbox.vue';

export default defineComponent({
  name: 'Multioptions',
  components: {
    TSelect,
    TCheckbox,
  },
  data() {
    return {
      selected: ['B'],
      options: [
        'A',
        'B',
        'C',
      ],
    };
  },
});
</script>
