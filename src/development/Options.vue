<template>
  <div>
    <div class="grid grid-cols-1 gap-6">
      <p>Options components v-model sync</p>
      <t-select
        v-model="selected"
        :options="options"
      />

      <t-rich-select
        v-model="selected"
        placeholder="select an option"
        :options="options"
      />

      <t-rich-select
        placeholder="select an option"
        :options="options"
      />

      <t-rich-select
        placeholder="select an option"
        :fetch-options="fetchOptions"
        :minimum-input-length="3"
      />

      <div>
        <label
          v-for="option in options"
          :key="option"
          class="flex items-center"
        >
          <t-radio
            v-model="selected"
            :value="option"
            name="option"
          />

          <span class="ml-2">{{ option }}</span>
        </label>
      </div>
    </div>

    <t-button @click="selected = null">
      Clear value
    </t-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TSelect from '../components/TSelect.vue';
import TRadio from '../components/TRadio.vue';
import TRichSelect from '../components/TRichSelect.vue';
import TButton from '../components/TButton.vue';

const fetchOptions = (q: string, nextPage: undefined | number) => {
  const url = `https://api.github.com/search/repositories?q=${q}&type=public&page=${nextPage || 1}&per_page=10`;

  const options = {
    method: 'GET',
    headers: {
      Authorization: 'token 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',
    },
  };

  const request = new Request(url, options);

  return fetch(request)
    .then((response) => response.json())
    .then((data) => ({
      results: data.items.map((i) => ({ value: i.id, text: i.full_name })),
      hasMorePages: data.total_count > (data.items.length * (nextPage || 1)) * 10,
    }));
};
export default defineComponent({
  name: 'Options',
  components: {
    TSelect,
    TRadio,
    TButton,
    TRichSelect,
  },
  data() {
    return {
      fetchOptions,
      selected: null,
      newOption: '',
      selectedUser: null,
      users: [
        {
          email: 'alfonso@vexilo.com',
          name: 'Alfonso Bribiesca',
        },
        {
          email: 'saida@gmail.com',
          name: 'Saida Redondo',
        },
      ],
      options: [
        { value: 'A', text: 'Option A' },
        {
          value: 'B',
          text: 'Option B',
          children: [

            { value: 1, text: 'Option B1' },
            { value: 2, text: 'Option B2', children: ['Blue', 'Red', 'Yellow'] },
            { value: 3, text: 'Option B3' },
          ],
        },
        { value: 'C', text: 'Option C' },
      ],
      // options: ['Blue', 'Red', 'Yellow', 'Green'],
    };
  },
});
</script>
