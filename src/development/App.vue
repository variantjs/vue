<template>
  <div class="pb-36">
    <div class="max-w-md mx-auto my-10">
      <app-menu />

      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppMenu from './AppMenu.vue';

export default defineComponent({
  name: 'App',
  components: { AppMenu },
});
</script>
