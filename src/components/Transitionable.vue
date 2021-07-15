<template>
  <transition
    v-if="enabled"
    :enter-active-class="classesList?.enterActiveClass"
    :enter-from-class="classesList?.enterFromClass"
    :enter-to-class="classesList?.enterToClass"
    :leave-active-class="classesList?.leaveActiveClass"
    :leave-from-class="classesList?.leaveFromClass"
    :leave-to-class="classesList?.leaveToClass"
  >
    <slot />
  </transition>
  <slot v-else />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// @vue/component
export default defineComponent({
  name: 'Transitionable',
  props: {
    classesList: {
      type: Object,
      required: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
