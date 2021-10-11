<template>
  <t-card class="w-full">
    <template #header>
      Simple component
    </template>

    <div class="grid grid-cols-1 gap-6">
      <p>Disable all classes</p>

      <div class="p-2 bg-gray-100 transparency">
        <t-button
          :fixed-classes="undefined"
          :classes="undefined"
          :class="undefined"
        >
          Press me!
        </t-button>
      </div>

      <p>Override something with the native `class`</p>
      <t-button class="text-red-600">
        Press me!
      </t-button>

      <p>Get the variant from...</p>

      <div class="flex space-x-3">
        <label class="flex items-center">
          <t-radio
            v-model="variant"
            :value="null"
            name="variant"
          />

          <span class="ml-2">Default</span>
        </label>
        <label class="flex items-center">
          <t-radio
            v-model="variant"
            value="error"
            name="variant"
          />

          <span class="ml-2">Error</span>
        </label>
        <label class="flex items-center">
          <t-radio
            v-model="variant"
            value="success"
            name="variant"
          />

          <span class="ml-2">Success</span>
        </label>
      </div>

      <t-button
        :variant="variant"
        :variants="variants"
      >
        ...the variant  prop
      </t-button>

      <t-button
        :classes="[{
          'block px-4 py-2 text-white transition duration-100 ease-in-out bg-red-500 border border-transparent rounded shadow-sm hover:bg-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed': variant === 'error'
        }, variant !== 'error' ? defaultTheme : '']"
      >
        ...a condition
      </t-button>

      <t-button
        :variant="variant"
      >
        ...the configuration
      </t-button>
    </div>
  </t-card>

  <t-card class="w-full">
    <template #header>
      Complex for component
    </template>

    <div class="grid grid-cols-1 gap-6">
      <p>Disable all classes</p>

      <div class="p-2 bg-gray-100 transparency">
        <t-card
          :fixed-classes="{
            wrapper: '',
            body: '',
            header: '',
            footer: '',
          }"
          :classes="{
            wrapper: '',
            body: '',
            header: '',
            footer: '',
          }"
        >
          Im a card without styles
        </t-card>
      </div>

      <p>Override the wrapper class with the native `class`</p>
      <t-card class="border-red-600">
        I should have a red border
      </t-card>

      <p>Get the variant from...</p>

      <div class="flex space-x-3">
        <label class="flex items-center">
          <t-radio
            v-model="variant"
            :value="null"
            name="variant-card"
          />

          <span class="ml-2">Default</span>
        </label>
        <label class="flex items-center">
          <t-radio
            v-model="variant"
            value="error"
            name="variant-card"
          />

          <span class="ml-2">Error</span>
        </label>
        <label class="flex items-center">
          <t-radio
            v-model="variant"
            value="success"
            name="variant-card"
          />

          <span class="ml-2">Success</span>
        </label>
      </div>

      <t-card
        :variant="variant"
        :variants="cardVariants"
      >
        ...the variant  prop
      </t-card>

      <t-card
        :classes="{
          body: {
            'p-3 text-red-600 bg-red-100': variant === 'error',
            'p-3 text-green-600 bg-green-100': variant === 'success',
          },
        }"
      >
        ...a condition
      </t-card>

      <t-card
        :variant="variant"
      >
        ...the configuration
      </t-card>

      <t-card>
        ...the configuration
      </t-card>
    </div>
  </t-card>
</template>

<script lang="ts">
import { TButtonConfig, TCardConfig } from '@variantjs/core';
import { defineComponent, provide } from 'vue';
import TButton from '../components/TButton.vue';
import TRadio from '../components/TRadio.vue';
import TCard from '../components/TCard.vue';

const variants = {
  error: {
    classes: 'block px-4 py-2 text-white transition duration-100 ease-in-out bg-red-500 border border-transparent rounded shadow-sm hover:bg-red-600 focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
  },
  success: {
    classes: 'block px-4 py-2 text-white transition duration-100 ease-in-out bg-green-500 border border-transparent rounded shadow-sm hover:bg-green-600 focus:border-green-500 focus:ring-2 focus:ring-red-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
  },
};

const cardVariants = {
  error: {
    fixedClasses: {
      body: 'text-white',
    },
    classes: {
      body: 'p-3 bg-red-600',
    },
  },
  success: {
    classes: {
      body: 'p-3 text-green-600 bg-green-100',
    },
  },
};

export default defineComponent({
  name: 'Theme',
  components: {
    TButton,
    TRadio,
    TCard,
  },
  setup() {
    provide('configuration', {
      TButton: {
        variants,
      },
      TCard: {
        variants: cardVariants,
      },
    });
  },
  data() {
    return {
      variants,
      variant: 'error',
      defaultTheme: TButtonConfig.classes,
      cardVariants,
      defaultCardConfig: TCardConfig.classes,
    };
  },
});
</script>

<style>
.transparency {
background-color: #ffffff;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cg fill='%23707070' fill-opacity='0.25'%3E%3Cpath fill-rule='evenodd' d='M0 0h4v4H0V0zm4 4h4v4H4V4z'/%3E%3C/g%3E%3C/svg%3E");
}
</style>
