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

      <div class="mt-2">
        <label class="flex items-center">
          <t-checkbox
            v-model="checkboxValue"
            name="radio"
            value="hola"
            checked
          />

          <span class="ml-2">Select this </span>
        </label>
        <label class="flex items-center">
          <t-checkbox
            v-model="checkboxValue"
            name="radio"
            value="hello"
          />

          <span class="ml-2">And select this</span>
        </label>

        <pre>{{ checkboxValue }}</pre>
      </div>

      <div class="mt-2">
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

      <div class="flex justify-between mt-2">
        <t-button>My button</t-button>
        <t-submit>
          TSubmit (Custom component)
        </t-submit>
      </div>

      <template #footer>
        <h1>Footer content</h1>
      </template>
    </t-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';

import TInput from '../components/TInput.vue';
import TSelect from '../components/TSelect.vue';
import TRadio from '../components/TRadio.vue';
import TCheckbox from '../components/TCheckbox.vue';
import TTextarea from '../components/TTextarea.vue';
import TButton from '../components/TButton.vue';
import TCard from '../components/TCard.vue';
import TAlert from '../components/TAlert.vue';
import TSubmit from './TSubmit.vue';
import { VariantJSConfiguration } from '../types';

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
    TSubmit,
  },
  setup() {
    provide<VariantJSConfiguration>('configuration', {
      TSubmit: {
        type: 'submit',
        classes: 'block px-4 py-2 text-white transition duration-100 ease-in-out bg-red-500 border border-transparent rounded shadow-sm hover:bg-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
      },
    });
  },
  data() {
    return {
      checkboxValue: [],
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
