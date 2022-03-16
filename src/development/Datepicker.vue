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
      label="Weekstart on Tuesday"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
        :week-start="2"
      />
    </TInputGroup>
    <TInputGroup
      label="Multiple months per view"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
        :months-per-view="3"
      />
    </TInputGroup>
    <TInputGroup
      label="Multiple months per view + range"
      class="mb-4"
    >
      <t-datepicker
        v-model="range2"
        range
        :months-per-view="3"
      />
      
      <p class="space-x-2 flex items-center mt-2 text-sm">
        <span>Value:</span>
        <span
          class="bg-gray-200 text-gray-800 text-xs font-mono rounded py-1 px-2"
          v-text="(range2 || []).join(' - ')"
        />
      </p>
    </TInputGroup>
    <TInputGroup
      label="Button"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
        input-type="button"
      />
    </TInputGroup>
    <TInputGroup
      label="Disabled"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
        disabled
      />
    </TInputGroup>
    <TInputGroup
      label="Read only"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
        readonly
      />
    </TInputGroup>
    <TInputGroup
      label="Placeholderr"
      class="mb-4"
    >
      <t-datepicker
        placeholder="Select a date"
      />
    </TInputGroup>
    <TInputGroup
      label="Custom Selector"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
      >
        <template #trigger="{ focusHandler, blurHandler, formattedDate, userFormattedDate }">
          <div
            class="flex items-center space-x-2 border-2 p-3 shadow-inner "
          >
            <div class="flex items-center space-x-2">
              <span>Value</span>
              <span
                class="bg-gray-200 text-gray-800 text-xs font-mono rounded py-1 px-2"
                v-text="formattedDate"
              />
            </div>
            <div class="flex items-center space-x-2">
              <span>Formatted</span>
              <span
                class="bg-gray-200 text-gray-800 text-xs font-mono rounded py-1 px-2"
                v-text="userFormattedDate"
              />
            </div>

            <button
              type="button"
              @focus="focusHandler"
              @blur="blurHandler"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </template>
      </t-datepicker>
    </TInputGroup>
    <TInputGroup
      label="Range"
      class="mb-4"
    >
      <t-datepicker
        v-model="range"
        range
      />

      <p class="space-x-2 flex items-center mt-2 text-sm">
        <span>Value:</span>
        <span
          class="bg-gray-200 text-gray-800 text-xs font-mono rounded py-1 px-2"
          v-text="(range || []).join(' - ')"
        />
      </p>
    </TInputGroup>

    <TInputGroup
      label="Multiple"
      class="mb-4"
    >
      <t-datepicker
        v-model="multiple"
        multiple
      />

      <p class="space-x-2 flex items-center mt-2 text-sm">
        <span>Value:</span>
        <span
          class="bg-gray-200 text-gray-800 text-xs font-mono rounded py-1 px-2"
          v-text="(multiple || []).join(', ')"
        />
      </p>
    </TInputGroup>

    <TInputGroup
      label="Syncs show property"
      class="mb-4"
    >
      <div>
        <t-checkbox v-model="show" />
      </div>

      <t-datepicker
        v-model:show="show"
      />
    </TInputGroup>

    <TInputGroup
      label="Toggle on focus"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
        toggle-on-focus
        :toggle-on-click="false"
        :toggle-on-hover="false"
      />
    </TInputGroup>

    <TInputGroup
      label="Toggle on hover"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
        toggle-on-hover
        :toggle-on-click="false"
        :toggle-on-focus="false"
      />
    </TInputGroup>
    <TInputGroup
      label="Toggle on click"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
        toggle-on-click
        :toggle-on-focus="false"
        :toggle-on-hover="false"
      />
    </TInputGroup>
    <TInputGroup
      label="Toggle on click + focus (default)"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
        toggle-on-click
        toggle-on-focus
        :toggle-on-hover="false"
      />
    </TInputGroup>
    <TInputGroup
      label="Toggle on click + focus + hover"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
        toggle-on-click
        toggle-on-focus
        toggle-on-hover
      />
    </TInputGroup>
    <TInputGroup
      label="Toggle on focus + hover"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
        :toggle-on-click="false"
        toggle-on-focus
        toggle-on-hover
      />
    </TInputGroup>
    <TInputGroup
      label="Toggle on click + hover"
      class="mb-4"
    >
      <t-datepicker
        v-model="date"
        toggle-on-click
        :toggle-on-focus="false"
        toggle-on-hover
      />
    </TInputGroup>
  </t-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TCard from '../components/TCard.vue';
import TInputGroup from '../components/TInputGroup.vue';
import TDatepicker from '../components/TDatepicker.vue';
import TCheckbox from '../components/TCheckbox.vue';

export default defineComponent({
  name: 'DatepickerComponent',
  components: {
    TCard,
    TInputGroup,
    TDatepicker,
    TCheckbox,
  },
  data() {
    return {
      show: false,
      date: '1987-02-18',
      customDate: [
        
      ],
      range: undefined,
      range2: undefined,
      multiple: undefined,
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
