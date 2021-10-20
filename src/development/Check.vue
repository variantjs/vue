<template>
  <t-card header="Options">
    <TInputGroup
      label="Toggle/Checkbox model sync "
      class="mb-4"
    >
      <t-toggle v-model="selected" />
      <t-checkbox v-model="selected" />
      <input
        v-model="selected"
        type="checkbox"
      >

      <p>Value: {{ selected }}</p>
    </TInputGroup>
    <TInputGroup
      label="No v-model"
      class="mb-4"
    >
      <t-toggle />
      <t-checkbox />
    </TInputGroup>

    <TInputGroup
      label="Checked attribute"
      class="mb-4"
    >
      <t-toggle checked />
      <t-checkbox checked />
    </TInputGroup>

    <TInputGroup
      label="Custom value"
      class="mb-4"
    >
      <t-toggle
        v-model="accepted"
        checked
        value="accepted"
        unchecked-value="notAccepted"
      />
      <t-checkbox
        v-model="accepted"
        checked
        value="accepted"
        unchecked-value="notAccepted"
      />

      <p>Value: {{ accepted }}</p>
    </TInputGroup>

    <TInputGroup
      label="Checked attribute sync"
      class="mb-4"
    >
      <t-toggle v-model:checked="checked" />

      <input
        v-model="checked"
        type="checkbox"
      >
    </TInputGroup>

    <TInputGroup
      label="Multiple"
      class="mb-4"
    >
      <div class="flex space-x-2">
        <t-toggle
          v-model="multiple"
          checked
          name="test"
          value="a"
        />
        <t-toggle
          v-model="multiple"
          checked
          name="test"
          value="b"
        />
        <t-toggle
          v-model="multiple"
          checked
          name="test"
          value="c"
        />

        <p>Value {{ multiple }}</p>
      </div>

      <div class="flex space-x-2">
        <t-checkbox
          v-model="multiple"
          checked
          value="a"
        />
        <t-checkbox
          v-model="multiple"
          checked
          value="b"
        />
        <t-checkbox
          v-model="multiple"
          checked
          value="c"
        />

        <p>Value {{ multiple }}</p>
      </div>
      <div class="flex space-x-2">
        <input
          v-model="multiple"
          type="checkbox"
          checked
          value="a"
        >
        <input
          v-model="multiple"
          type="checkbox"
          checked
          value="b"
        >
        <input
          v-model="multiple"
          type="checkbox"
          checked
          value="c"
        >

        <p>Value {{ multiple }}</p>
      </div>
    </TInputGroup>
  </t-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TToggle from '../components/TToggle.vue';
import TCheckbox from '../components/TCheckbox.vue';
import TCard from '../components/TCard.vue';
import TInputGroup from '../components/TInputGroup.vue';

export default defineComponent({
  name: 'Check',
  components: {
    TCheckbox,
    TToggle,
    TCard,
    TInputGroup,
  },
  data() {
    return {
      accepted: 'accepted',
      selected: true,
      multiple: ['b'],
      checked: false,
    };
  },

});
</script>
