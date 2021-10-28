<template>
  <t-card header="Options">
    <TInputGroup
      label="Default Datepicker"
      class="mb-4"
    >
      <t-datepicker />
    </TInputGroup>
    <!-- <TInputGroup
      label="Range"
      class="mb-4"
    >
      <t-datepicker
        range
        :model-value="[
          new Date(2020, 11, 11),
          new Date(2020, 11, 15),
        ]"
      />
    </TInputGroup> -->
  </t-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TCard from '../components/TCard.vue';
import TInputGroup from '../components/TInputGroup.vue';
import TDatepicker from '../components/TDatepicker.vue';

export default defineComponent({
  name: 'Datepicker',
  components: {
    TCard,
    TInputGroup,
    TDatepicker,
  },
  data() {
    return {

    };
  },

});
</script>
