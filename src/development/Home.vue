<template>
  <div>
    <t-card>
      <template #header>
        <h1>List of components</h1>
      </template>

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

      <t-dropdown text="Click me">
        <template #default="{ hide, blurHandler }">
          <div>
            <button
              class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              role="menuitem"
              @blur="blurHandler"
            >
              Your Profile
            </button>
            <button
              class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              role="menuitem"
              @blur="blurHandler"
            >
              Settings
            </button>

            <button
              class="block w-full px-4 py-2 text-sm leading-5 text-red-500 transition duration-150 ease-in-out border-t hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              @click="hide"
            >
              Close me
            </button>
          </div>
        </template>
      </t-dropdown>

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
import TDropdown from '../components/TDropdown.vue';

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
    TDropdown,
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
