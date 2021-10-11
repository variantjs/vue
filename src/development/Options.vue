<template>
  <t-card header="Options">
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
        v-model="selected"
        placeholder="select an option"
        :options="options"
      />

      <t-rich-select
        placeholder="select an option"
        :fetch-options="fetchOptions"
        :minimum-input-length="3"
        value-attribute="imdbID"
        text-attribute="Title"
      >
        <template #option="{ option: { raw: movie }, className, isSelected }">
          <div
            class="flex flex-col items-center px-3 py-2 space-x-4 overflow-auto bg-white sm:flex-row"
            :class="className"
          >
            <div
              class="flex-shrink-0 w-10 h-10 bg-gray-500 bg-center bg-cover rounded"
              :style="{ backgroundImage: `url(${movie?.Poster})` }"
            />
            <div class="flex flex-col w-full overflow-auto">
              <div class="flex-grow overflow-auto">
                <h3
                  class="font-semibold truncate "
                  :class="{
                    'text-white': isSelected,
                    'text-gray-800': !isSelected,
                  }"
                >
                  {{ movie?.Title }}
                </h3>
                <p
                  class="text-sm "
                  :class="{
                    'text-white': isSelected,
                    'text-gray-400': !isSelected,
                  }"
                >
                  {{ movie?.Year }}
                </p>
              </div>
            </div>
          </div>
        </template>
      </t-rich-select>

      <t-rich-select
        placeholder="select an option"
        :options="[1,2,3,4]"
        hide-search-box
      />
    </div>

    <t-button @click="selected = null">
      Clear value
    </t-button>
  </t-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TSelect from '../components/TSelect.vue';
import TRichSelect from '../components/TRichSelect.vue';
import TButton from '../components/TButton.vue';
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
  name: 'Options',
  components: {
    TSelect,
    TCard,
    TButton,
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
