<template>
  <div style="padding: 15px">
    <t-input
      :id="id"
      fixedClasses="block w-full px-3 py-2  transition duration-100 ease-in-out border rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
      classes="text-black placeholder-gray-400 bg-white border-gray-300"
      :type="type"
      :variants="variants"
      :variant="variant"
    />

    <t-input />
    

    <input type="text" v-model="id">
    
    {{variant}}

    {{id}}
    
    {{type}}

    <select v-model="variant">
      <option value="success">Success</option>
      <option value="error">Error</option>
    </select>

    <select v-model="type">
      <option value="number">number</option>
      <option value="text">text</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TInput from './components/TInput.vue'
import "./assets/tailwind.css"

export default defineComponent({
  name: 'App',
  components: {
    TInput
  },
  methods: {
      onChange() {
        console.log("Change")
      },
      onFocus() {
        console.log("docus")
      }
    },
  data() {
    
    return {
      variants: {
        error: {
          id: 'error',
          type: 'number',
          title: 'Hola',
          placeholder: "error",
          classes: 'text-red-500 placeholder-red-300 bg-red-100 border-gray-500'
        }
      },
      id: 'test',
      variant: 'success',
      type: 'text'
    }
  }
})
</script>
