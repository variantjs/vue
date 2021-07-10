<template>
  <component :is="child" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import svgToVueComponent from '../utils/svgToVueComponent';

// @vue/component
export default defineComponent({
  name: 'TIcon',
  props: {
    icon: {
      type: [Object, String] as PropType<Element | string>,
      required: true,
      // validator: (icon: Element) => icon.tagName === 'svg',
    },
  },
  data() {
    return {
      child: svgToVueComponent(this.icon),
    };
  },

});
</script>
