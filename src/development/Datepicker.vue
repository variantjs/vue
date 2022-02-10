<template>
  <t-card header="Options">
    <TInputGroup
      label="Default Datepicker"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
        @change="dateChange"
        @input="dateInput"
      />
      
      <p class="space-x-2 flex items-center mt-2 text-sm">
        <span>Value:</span>
        <span
          class="bg-gray-200 text-gray-800 text-xs font-mono rounded py-1 px-2"
          v-text="date"
        />
      </p>
    </TInputGroup>
    <TInputGroup
      label="VModel Sync"
      class="mb-4"
    >
      <t-datepicker v-model="date" />
    </TInputGroup>
    <TInputGroup
      label="Range"
      class="mb-4"
    >
      <t-datepicker
        range
      />
    </TInputGroup>

    <TInputGroup
      label="Multiple"
      class="mb-4"
    >
      <t-datepicker
        multiple
      />
    </TInputGroup>
  </t-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TCard from '../components/TCard.vue';
import TInputGroup from '../components/TInputGroup.vue';
import TDatepicker from '../components/TDatepicker.vue';

export default defineComponent({
  name: 'DatepickerComponent',
  components: {
    TCard,
    TInputGroup,
    TDatepicker,
  },
  data() {
    return {
      date: '1987-02-18',
    };
  },
  methods: {
    dateChange(e: CustomEvent) {
      console.log('Datepicker: dateChange', e);
    },
    dateInput(e: CustomEvent) {
      console.log('Datepicker: dateInput', e);
    },
  },

});
</script>
