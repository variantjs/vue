<template>
  <div style="padding: 15px">
    <t-input
      :id="id"
      :classes="['fdsfds', id]"
      class="hoal "
      :type="type"
      :variants="variants"
      :variant="variant"
    />
    

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
import "./assets/styles.css"

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
          classes: 'text-danger'
        }
      },
      id: 'test',
      variant: 'success',
      type: 'text'
    }
  }
})
</script>
