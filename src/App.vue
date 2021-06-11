<template>
  <div style="padding: 15px">
    <!-- <t-input
      :id="id"
      fixed-classes="block w-full px-3 py-2  transition duration-100 ease-in-out border rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
      classes="text-black placeholder-gray-400 bg-white border-gray-300"
      :type="type"
      :variants="variants"
      :variant="variant"
    />-->

    <t-input-2
      variant="error"
      
    />

    <t-input-2
      id="hola"
      v-model="id"
      type="text"
      data-test="test"
      :variant="variant"
    />

    <!--<t-input
      v-model="id"
      type="text"
      :variant="variant"
    />-->

    <t-select
      v-model="variant"
      :options="['test2', 'test', 'error', 'ther']"
    />

    <!-- {{ variant }}

    {{ id }}

    {{ type }}

    <select v-model="variant">
      <option value="success">
        Success
      </option>
      <option value="error">
        Error
      </option>
    </select>-->

    <!-- <t-radio
      v-model="test"
      name="test"
      value="1"
    />
    <t-radio
      v-model="test"
      name="test"
      value="2"
    />
    <t-radio
      v-model="test"
      name="test"
      value="3"
    /> -->

    <!-- <t-wrapped-radio
      id="test2-1"
      v-model="test"
      name="test2"
      value="1"
      label="1"
    />
    <t-wrapped-radio
      id="test2-2"
      v-model="test"
      name="test2"
      :value="{text: 1}"
      label="2"
    />
    <t-wrapped-radio
      id="test2-3``"
      v-model="test"
      name="test2"
      value="3"
      label="3"
    /> -->

    <!--<div action="">
      <t-wrapped-radio
        name="test3"
        :value="true"
      >
        gola 1
      </t-wrapped-radio>
      <t-wrapped-radio
        checked
        name="test3"
        :value="{text: 1}"
      >
        Hoal 2
      </t-wrapped-radio>

      <t-wrapped-radio
        :fixed-classes="{
          wrapper: 'text-blue-500'
        }"
        name="test3"
        value="3"
      >
        Hola 3
      </t-wrapped-radio>
    </div>

    <t-wrapped-radio
      name="test3"
      :value="[1,2,3]"
    >
      Hola 4
    </t-wrapped-radio>

    <t-wrapped-radio
      name="test3"
      :value="() => {console.log('')}"
    >
      Hola 5
    </t-wrapped-radio>

    <p>{{ test }}</p>

    <t-select
      v-model="type"
      :options="['number', 'text']"
    />

    <t-select
      v-model="number"
      :options="[1, 2, 3]"
    />-->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TInput from './components/TInput.vue';
import TInput2 from './components/TInput2.vue';
import TSelect from './components/TSelect.vue';
import TRadio from './components/TRadio.vue';
import TWrappedRadio from './components/TWrappedRadio.vue';
import TCheckbox from './components/TCheckbox.vue';
import './assets/tailwind.css';

export default defineComponent({
  name: 'App',
  components: {
    TInput,
    TInput2,
    TSelect,
    TRadio,
    TWrappedRadio,
    TCheckbox,
  },
  data() {
    return {
      test: '3',
      number: 2,
      variants: {
        error: {
          id: 'error',
          type: 'number',
          title: 'Hola',
          placeholder: 'error',
          classes: 'text-red-500 placeholder-red-300 bg-red-100 border-gray-500',
        },
        ther: {
          classes: undefined,
          fixedClasses: undefined,
        },
      },
      id: '',
      variant: 'success',
      type: 'text',
    };
  },
  methods: {
    onChange() {
      console.log('Change');
    },
    onFocus() {
      console.log('docus');
    },
  },

});
</script>
