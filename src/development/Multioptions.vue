<template>
  <div>
    <div class="grid grid-cols-1 gap-6">
      <p>Multioptions components v-model sync</p>
      <t-select
        v-model="selected"
        multiple
        :options="options"
      />

      <t-rich-select
        v-model="selected"
        placeholder="select an option"
        :options="options"
        multiple
      />

      <div class="flex items-center justify-center py-20 my-20 border">
        <input
          v-model="selected2"
          class="p-3 border"
        >
      </div>

      <t-rich-select
        v-model="selected2"
        placeholder="select an option"
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
import TRichSelect from '../components/TRichSelect.vue';

export default defineComponent({
  name: 'Multioptions',
  components: {
    TSelect,
    TCheckbox,
    TRichSelect,
  },
  data() {
    return {
      selected2: null,
      selected: ['B'],
      options: [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
      ],
    };
  },
});
</script>
