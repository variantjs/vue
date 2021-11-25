<template>
  <t-card header="RichSelect">
    <div class="grid grid-cols-1 gap-6">
      <p>Disabled rich select</p>
      <t-rich-select
        v-model="selected"
        :options="options"
        placeholder="Disabled"
        disabled
      />

      <p>Clear search on close</p>
      <t-rich-select
        v-model="selected"
        :options="options"
        :hide-search-box="false"
        :clear-search-on-close="true"
      />
    </div>
  </t-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TRichSelect from '../components/TRichSelect.vue';
import TCard from '../components/TCard.vue';

const fetchOptions = (query?: string, nextPage?: number) => {
  const url = `https://www.omdbapi.com/?apikey=e1b3617e&s=${query}&page=${nextPage || 1}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => ({
      results: data.Search as Record<string, any>[],
      hasMorePages: data.Search && data.totalResults > (data.Search.length * (nextPage || 1)) * 10,
    }));
};

export default defineComponent({
  name: 'RichSelect',
  components: {
    TCard,
    TRichSelect,
  },
  data() {
    return {
      fetchOptions,
      selected: 'A' as string | null,
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
