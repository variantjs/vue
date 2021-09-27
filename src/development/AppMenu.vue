<template>
  <div class="flex justify-center mb-4 space-x-4">
    <t-button to="/">
      Home
    </t-button>
    <t-button to="/theme">
      Theme
    </t-button>
    <t-button to="/attributes">
      Attributes
    </t-button>
    <t-button to="/options">
      Options
    </t-button>
    <t-button to="/multioptions">
      MultiOptions
    </t-button>
    <t-button to="/dropdown">
      Dropdown
    </t-button>
    <t-button to="/alert">
      Alert
    </t-button>
    <t-button to="/modal">
      Modal
    </t-button>
    <t-button to="/about">
      About
    </t-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TButton from '../components/TButton.vue';

export default defineComponent({
  name: 'AppMenu',
  components: {
    TButton,
  },
});
</script>
