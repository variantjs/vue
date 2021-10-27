<template>
  <component :is="child" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IconProp } from '../types';
import { svgToVueComponent } from '../utils/svgToVueComponent';

// @vue/component
export default defineComponent({
  name: 'CustomIcon',
  compatConfig: {
    MODE: 3,
  },
  props: {
    icon: {
      type: [Object, String] as PropType<IconProp>,
      required: true,
    },
  },
  data() {
    return {
      child: this.icon instanceof Element || typeof this.icon === 'string' ? svgToVueComponent(this.icon) : this.icon,
    };
  },
});
</script>
