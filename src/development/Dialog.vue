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
        <t-dialog name="my-dialog" />

        <div class="flex space-x-2">
          <t-button
            @click="$dialog.show('my-dialog')"
          >
            Show dialog
          </t-button>
        </div>
      </TInputGroup>

      <TInputGroup
        label="Dialog types"
        class="mb-4"
        :type="dialogType"
      >
        <t-dialog name="dialog-type" />

        <div class="flex mb-2 space-x-3">
          <label
            for="alert"
            class="flex items-center space-x-1"
          >
            <t-radio
              id="alert"
              v-model="dialogType"
              value="alert"
            />
            <span>Alert</span>
          </label>
          <label
            for="confirm"
            class="flex items-center space-x-1"
          >
            <t-radio
              id="confirm"
              v-model="dialogType"
              value="confirm"
            />
            <span>Confirm</span>
          </label>
          <label
            for="prompt"
            class="flex items-center space-x-1"
          >
            <t-radio
              id="prompt"
              v-model="dialogType"
              value="prompt"
            />
            <span>Prompt</span>
          </label>
        </div>

        <t-button
          @click="$dialog.show('dialog-type')"
        >
          Show {{ dialogType.charAt(0).toUpperCase() + dialogType.slice(1) }}
        </t-button>
      </TInputGroup>

      <!-- <TInputGroup
        label="Pass parameter trough the `before-show` event"
        class="mb-4"
      >
        <t-dialog
          name="param-modal"
          @before-show="onBeforeShow"
          @before-hide="onBeforeHide"
        >
          User email is: <strong>{{ user.email }}</strong>

          <div class="mb-4">
            <span class="text-sm text-gray-600 uppercase">set new email:</span>
            <t-input v-model="email" />
            <span class="text-xs text-gray-500">write `cancel` to prevent the modal to hide</span>
          </div>
        </t-dialog>

        <div class="mb-4">
          <span class="text-sm text-gray-600 uppercase">set user email:</span>
          <t-input v-model="email" />
          <span class="text-xs text-gray-500">write `cancel` to prevent the modal to show</span>
        </div>

        <div class="flex space-x-2">
          <t-button
            @click="$dialog.show('param-modal', { email })"
          >
            Show dialog with parameter
          </t-button>
        </div>
      </TInputGroup>

      <TInputGroup

        label="Open with ref"
        class="mb-4"
      >
        <t-dialog ref="modal">
          <template #header>
            This it the header
          </template>
          <t-button
            type="button"
            @click="($refs.modal as any).hide()"
          >
            Hide modal
          </t-button>
        </t-dialog>

        <div class="flex space-x-2">
          <t-button
            @click="($refs.modal as any).show()"
          >
            Show dialog
          </t-button>
        </div>
      </TInputGroup>-->

      <TInputGroup
        label="Syncs show property"
        class="mb-4"
      >
        <div>
          <t-checkbox v-model="show" />
        </div>

        <t-dialog v-model="show" />
      </TInputGroup>

      <TInputGroup
        label="Only closable trough the custom button inside"
        class="mb-4"
      >
        <t-button @click="$dialog.show('notClosable')">
          Show dialog
        </t-button>

        <t-dialog
          name="notClosable"
          :esc-to-close="false"
          :click-to-close="false"
        >
          <template #default="{ hide }">
            <t-button @click="hide">
              Close this
            </t-button>
          </template>
        </t-dialog>
      </TInputGroup>
    </t-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Data, DialogType } from '@variantjs/core';
import TCheckbox from '../components/TCheckbox.vue';
import TButton from '../components/TButton.vue';
import TCard from '../components/TCard.vue';
import TDialog from '../components/TDialog.vue';
import TInput from '../components/TInput.vue';
import TRadio from '../components/TRadio.vue';
import TInputGroup from '../components/TInputGroup.vue';

export default defineComponent({
  name: 'App',
  components: {
    TButton,
    TCheckbox,
    TCard,
    TDialog,
    TInput,
    TInputGroup,
    TRadio,
  },
  data() {
    return {
      dialogType: 'alert' as DialogType,
      show: false,
      email: 'alfonso@variantjs.com',
      name: 'Alfonso',
      user: {} as Data,
    };
  },
  methods: {
    onBeforeShow({ params, cancel }: { params: { email: string }, cancel: () => void }) {
      const { email } = params;
      if (email === 'cancel') {
        cancel();
        return;
      }

      this.user = {
        email,
      };
    },
    onBeforeHide({ cancel }: { cancel: () => void }) {
      if (this.email === 'cancel') {
        cancel();
      }
    },
  },
});
</script>
