<template>
  <div class="pb-36">
    <div class="flex max-w-2xl mx-auto my-10 space-x-4">
      <div>
        <app-menu />
      </div>

      <div class="flex flex-col items-center flex-grow">
        <router-view />
      </div>
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
