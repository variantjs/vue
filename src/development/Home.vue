<template>
  <div>
    <t-card>
      <template #header>
        <h1>List of components</h1>
      </template>

      <t-alert>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam id iusto quas quaerat quasi cum alias consequuntur perspiciatis, quam ea. Quibusdam incidunt ex vel illum ab quaerat, sed tempora beatae!
      </t-alert>

      <t-input
        v-model="model"
        placeholder="My placeholder"
        type="text"
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
            v-model="radioValue"
            name="radio"
            value="1"
            checked
          />

          <span class="ml-2">Select this ({{ radioValue }}) </span>
        </label>
        <label class="flex items-center">
          <t-radio
            v-model="radioValue"
            name="radio"
            value="2"
          />

          <span class="ml-2">Or select this ({{ radioValue }})</span>
        </label>
      </div>

      <t-button>My button</t-button>

      <template #footer>
        <h1>Footer content</h1>
      </template>
    </t-card>
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
import TCard from '../components/TCard.vue';
import TAlert from '../components/TAlert.vue';

export default defineComponent({
  name: 'App',
  components: {
    TInput,
    TTextarea,
    TRadio,
    TCheckbox,
    TSelect,
    TButton,
    TCard,
    TAlert,
  },
  data() {
    return {
      radioValue: '1',
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

<style>
  input[type=text]:after {
    display: block;
    content: 'x';

  }
</style>
