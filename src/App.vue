<template>
  <div style="padding: 15px">
    <!-- <t-input
      :id="id"
      fixed-classes="block w-full px-3 py-2  transition duration-100 ease-in-out border rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
      classes="text-black placeholder-gray-400 bg-white border-gray-300"
      :type="type"
      :variants="variants"
      :variant="variant"
    />

    <t-input /> -->

    <t-input
      v-model="id"
      type="text"
    />

    <t-input
      v-model="id"
      type="text"
      variant="test2"
    />

    <p>{{ id }}</p>

    <!-- {{ variant }}

    {{ id }}

    {{ type }}

    <select v-model="variant">
      <option value="success">
        Success
      </option>
      <option value="error">
        Error
      </option>
    </select>

    <t-select
      v-model="type"
      :options="['number', 'text']"
    />

    <t-select
      v-model="number"
      :options="[1, 2, 3]"
    />
    {{ number }} -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TInput from './components/TInput.vue';
import TSelect from './components/TSelect.vue';
import './assets/tailwind.css';

export default defineComponent({
  name: 'App',
  components: {
    TInput,
    TSelect,
  },
  data() {
    return {
      number: 2,
      variants: {
        error: {
          id: 'error',
          type: 'number',
          title: 'Hola',
          placeholder: 'error',
          classes: 'text-red-500 placeholder-red-300 bg-red-100 border-gray-500',
        },
      },
      id: 'test',
      variant: 'success',
      type: 'text',
    };
  },
  methods: {
    onChange() {
      console.log('Change');
    },
    onFocus() {
      console.log('docus');
    },
  },

});
</script>
