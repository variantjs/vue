<template>
  <div>
    <div class="grid grid-cols-1 gap-6">
      <t-input
        v-model="model"
        placeholder="My placeholder"
      />
      <t-textarea
        v-model="model"
        placeholder="My placeholder"
      />
      <t-select :options="options" />
      <label class="flex items-center">
        <t-checkbox checked />
        <span class="ml-2">Check me</span>
      </label>
      <div>
        <label class="flex items-center">
          <t-radio
            name="radio"
            checked
          />

          <span class="ml-2">Select this</span>
        </label>
        <label class="flex items-center">
          <t-radio name="radio" />

          <span class="ml-2">Or select this</span>
        </label>
      </div>

      <t-button>My button</t-button>
      <t-button
        :title="model"
        type="submit"
        class="text-red-600"
      >
        My button
      </t-button>
      <t-button
        :title="model"
        type="submit"
        fixed-classes="text-red-500"
        classes="border-red-500"
        class="font-semibold"
      >
        My button
      </t-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TInput from '../components/TInput.vue';
import TSelect from '../components/TSelect.vue';
import TRadio from '../components/TRadio.vue';
import TCheckbox from '../components/TCheckbox.vue';
import TTextarea from '../components/TTextarea.vue';
import TButton from '../components/TButton.vue';

export default defineComponent({
  name: 'App',
  components: {
    TInput,
    TTextarea,
    TRadio,
    TCheckbox,
    TSelect,
    TButton,
  },
  data() {
    return {
      model: '',
      options: [
        'Option A',
        'Option B',
        'Option C',
      ],
    };
  },

});
</script>
