<template>
  <div>
    <t-card>
      <template #header>
        <h1>Dropdown</h1>
      </template>

      <TInputGroup
        label="Toggle on click (default)"
        class="mb-4"
      >
        <t-dropdown text="Toggle on click">
          <template #default="{ hide, blurHandler }">
            <div>
              <button
                class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                role="menuitem"
                @blur="blurHandler"
              >
                Your Profile
              </button>
              <button
                class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                role="menuitem"
                @blur="blurHandler"
              >
                Settings
              </button>

              <button
                class="block w-full px-4 py-2 text-sm leading-5 text-red-500 transition duration-150 ease-in-out border-t hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                @click="hide"
              >
                Close me
              </button>
            </div>
          </template>
        </t-dropdown>
      </TInputGroup>

      <TInputGroup
        label="Toggle on hover"
        class="mb-4"
      >
        <t-dropdown
          toggle-on-hover
          :toggle-on-click="false"
          text="Toggle on hover"
        >
          <template #default="{ hide, blurHandler }">
            <div>
              <button
                class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                role="menuitem"
                @blur="blurHandler"
              >
                Your Profile
              </button>
              <button
                class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                role="menuitem"
                @blur="blurHandler"
              >
                Settings
              </button>

              <button
                class="block w-full px-4 py-2 text-sm leading-5 text-red-500 transition duration-150 ease-in-out border-t hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                @click="hide"
              >
                Close me
              </button>
            </div>
          </template>
        </t-dropdown>
      </TInputGroup>

      <TInputGroup
        label="Toggle on focus"
        class="mb-4"
      >
        <t-dropdown
          toggle-on-focus
          :toggle-on-click="false"
          text="Toggle on focus"
        >
          <div>
            <button
              class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              role="menuitem"
            >
              Your Profile
            </button>
            <button
              class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
              role="menuitem"
            >
              Settings
            </button>

            <button
              class="block w-full px-4 py-2 text-sm leading-5 text-red-500 transition duration-150 ease-in-out border-t hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
            >
              Close me
            </button>
          </div>
        </t-dropdown>

        <t-dropdown
          class="mt-2"
          toggle-on-focus
          :toggle-on-click="false"
          text="Toggle on focus without focusable elements"
        >
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius dolores nesciunt rem iure blanditiis sunt minima porro quam cum iste neque aut culpa quas reprehenderit doloribus, eveniet vero atque id?</p>
        </t-dropdown>
      </TInputGroup>
    </t-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TCheckbox from '../components/TCheckbox.vue';
import TCard from '../components/TCard.vue';
import TDropdown from '../components/TDropdown.vue';
import TInputGroup from '../components/TInputGroup.vue';

export default defineComponent({
  name: 'App',
  components: {
    TCheckbox,
    TCard,
    TDropdown,
    TInputGroup,
  },
  data() {
    return {
      toggleOnFocus: true,
      show: false,
      model: '',
    };
  },

});
</script>

<style>
  input[type=text]:after {
    display: block;
    content: 'x';

  }
</style>
