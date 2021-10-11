<template>
  <div class="pb-36">
    <div class="relative z-10 p-4 sm:hidden">
      <t-dropdown ref="dropdown">
        <template #trigger>
          Menú
        </template>

        <div class="p-4">
          <app-menu />
        </div>
      </t-dropdown>
    </div>

    <div class="flex max-w-2xl mx-auto mb-10 space-x-4 sm:mt-10">
      <div>
        <app-menu class="hidden sm:block" />
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
import TDropdown from '../components/TDropdown.vue';

export default defineComponent({
  name: 'App',
  components: { AppMenu, TDropdown },
  watch: {
    $route() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this.$refs.dropdown as any).doHide();
    },
  },
});
</script>
