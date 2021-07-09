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
      type: Object as PropType<Element>,
      required: true,
      validator: (icon: Element) => icon.tagName === 'svg',
    },
    iconName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      child: svgToVueComponent(this.icon, this.iconName),
    };
  },
});
</script>
