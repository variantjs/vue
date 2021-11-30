<template>
  <t-card header="RichSelect">
    <t-input-group
      label="Disabled rich select"
      class="mb-4"
    >
      <t-rich-select
        v-model="selected"
        :options="options"
        placeholder="Disabled"
        disabled
      />
    </t-input-group>

    <t-input-group
      label="Preselect option with an inital set"
      class="mb-4"
    >
      <t-rich-select
        v-model="preselectedOption"
        :options="initialSet"
        :fetch-options="fetchOptions"
        :minimum-input-length="3"
        value-attribute="imdbID"
        text-attribute="Title"
      />
    </t-input-group>

    <t-input-group
      label="Select the option if the options change dinamically"
      class="mb-4"
    >
      <t-rich-select
        v-model="preselectedOption2"
        :options="dynamicSet"
        :fetch-options="fetchOptions"
        :minimum-input-length="3"
        value-attribute="imdbID"
        text-attribute="Title"
      />
    </t-input-group>

    <t-input-group
      label="Prefetch options"
      class="mb-4"
    >
      <t-rich-select
        v-model="preselectedOption3"
        :fetch-options="fetchOptions"
        :minimum-input-length="3"
        value-attribute="imdbID"
        text-attribute="Title"
        :prefetch-options="prefetchOptions"
      />
    </t-input-group>

    <t-input-group
      label="Clear search on close"
      class="mb-4"
    >
      <t-rich-select
        v-model="selected"
        :options="options"
        :hide-search-box="false"
        :clear-search-on-close="true"
      />
    </t-input-group>
  </t-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TRichSelect from '../components/TRichSelect.vue';
import TInputGroup from '../components/TInputGroup.vue';
import TCard from '../components/TCard.vue';
import { PreFetchOptionsFn } from '../types';

const fetchOptions = (query?: string, nextPage?: number) => {
  const url = `https://www.omdbapi.com/?apikey=e1b3617e&s=${query}&page=${nextPage || 1}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => ({
      results: data.Search as Record<string, any>[],
      hasMorePages: data.Search && data.totalResults > (data.Search.length * (nextPage || 1)) * 10,
    }));
};

const prefetchOptions: PreFetchOptionsFn = (currentValue: any) => {
  const url = `https://www.omdbapi.com/?apikey=e1b3617e&i=${currentValue}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => [data]);
};

export default defineComponent({
  name: 'RichSelect',
  components: {
    TCard,
    TRichSelect,
    TInputGroup,
  },
  data() {
    return {
      fetchOptions,
      prefetchOptions,
      initialSet: [
        {
          Title: 'The Matrix',
          Year: '1999',
          imdbID: 'tt0133093',
          Type: 'movie',
          Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        },
      ],
      dynamicSet: [] as Record<string, unknown>[],
      preselectedOption: 'tt0133093',
      preselectedOption2: 'tt0133093',
      preselectedOption3: 'tt0133093',
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

  mounted() {
    setTimeout(() => {
      this.dynamicSet = [
        {
          Title: 'The Matrix',
          Year: '1999',
          imdbID: 'tt0133093',
          Type: 'movie',
          Poster: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
        },
      ];
    }, 2000);
  },
});
</script>
