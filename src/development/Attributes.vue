<template>
  <div>
    <div class="grid grid-cols-1 gap-6">
      <p>Gets the same placeholder attribute from different sources</p>

      <p>From the attribute</p>
      <t-input placeholder="Defined on the attribute" />

      <p>From the attribute (to ensure is overriden)</p>
      <t-input
        placeholder="Defined on the attribute (overrides the variant)"
        variant="alt"
      />

      <p>Placeholder on the configuration</p>
      <t-input />

      <p>Placeholder on the variant</p>
      <t-input variant="alt" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import TInput from '../components/TInput.vue';

export default defineComponent({
  name: 'Attributes',
  components: {
    TInput,
  },
  setup() {
    provide('configuration', {
      TInput: {
        placeholder: 'Comes from the config',
        variants: {
          alt: {
            placeholder: 'From "alt" variant',
          },
        },
      },
    });
  },

});
</script>
