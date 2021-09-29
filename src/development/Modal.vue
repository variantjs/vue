<template>
  <div>
    <t-card>
      <template #header>
        <h1>Modal</h1>
      </template>

      <TInputGroup
        label="Open with modal name"
        class="mb-4"
      >
        <t-modal name="my-modal">
          <template #header>
            This it the header
          </template>
          <t-button
            type="button"
            @click="$modal.hide('my-modal')"
          >
            Hide modal
          </t-button>
        </t-modal>

        <div class="flex space-x-2">
          <t-button
            @click="$modal.show('my-modal')"
          >
            Show modal
          </t-button>
        </div>
      </TInputGroup>
      <TInputGroup

        label="Open with ref"
        class="mb-4"
      >
        <t-modal ref="modal">
          <template #header>
            This it the header
          </template>
          <t-button
            type="button"
            @click="$refs.modal.hide()"
          >
            Hide modal
          </t-button>
        </t-modal>

        <div class="flex space-x-2">
          <t-button
            @click="$refs.modal.show()"
          >
            Show modal
          </t-button>
        </div>
      </TInputGroup>

      <TInputGroup
        label="Syncs show property"
        class="mb-4"
      >
        <div>
          <t-checkbox v-model="show" />
        </div>

        <t-modal v-model="show">
          <template #header>
            This it the header
          </template>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repudiandae totam, alias voluptas deleniti ex tempora asperiores perspiciatis qui. Repellendus, exercitationem itaque! Beatae error ut fuga vel tempora, repellat optio molestiae!</p>
          <template #footer>
            this is the footer
          </template>
        </t-modal>
      </TInputGroup>
    </t-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import TCheckbox from '../components/TCheckbox.vue';
import TButton from '../components/TButton.vue';
import TCard from '../components/TCard.vue';
import TModal from '../components/TModal.vue';
import TInputGroup from '../components/TInputGroup.vue';

export default defineComponent({
  name: 'App',
  components: {
    TButton,
    TCheckbox,
    TCard,
    TModal,
    TInputGroup,
  },
  data() {
    return {
      show: false,
    };
  },

});
</script>
