<template>
  <div>
    <t-card>
      <template #header>
        <h1>Dialog</h1>
      </template>

      <TInputGroup
        label="Dialog types"
        class="mb-4"
      >
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

        <div class="flex mb-2 space-x-3">
          <label
            for="success"
            class="flex items-center space-x-1"
          >
            <t-radio
              id="success"
              v-model="dialogIcon"
              value="success"
            />
            <span>success</span>
          </label>
          <label
            for="error"
            class="flex items-center space-x-1"
          >
            <t-radio
              id="error"
              v-model="dialogIcon"
              value="error"
            />
            <span>Error</span>
          </label>
          <label
            for="warning"
            class="flex items-center space-x-1"
          >
            <t-radio
              id="warning"
              v-model="dialogIcon"
              value="warning"
            />
            <span>Warning</span>
          </label>
          <label
            for="info"
            class="flex items-center space-x-1"
          >
            <t-radio
              id="info"
              v-model="dialogIcon"
              value="info"
            />
            <span>Info</span>
          </label>
          <label
            for="question"
            class="flex items-center space-x-1"
          >
            <t-radio
              id="question"
              v-model="dialogIcon"
              value="question"
            />
            <span>Question</span>
          </label>
        </div>
      </TInputGroup>

      <TInputGroup
        label="Open with dialog name"
        class="mb-4"
      >
        <t-dialog
          name="my-dialog"
          title="Are you sure?"
          text="This action cannot be undone"
          :icon="dialogIcon"
          :type="dialogType"
        />

        <div class="flex space-x-2">
          <t-button
            @click="showNamedDialog('my-dialog')"
          >
            Show {{ dialogType }} dialog
          </t-button>
        </div>
      </TInputGroup>

      <TInputGroup
        label="Prompt"
        class="mb-4"
      >
        <t-dialog
          icon="question"
          type="prompt"
          input-type="text"
          input-value="A"
          title="This is a restricted section"
          text="Whats is your secret word?"
          name="input-dialog"
        />
        <div class="flex space-x-2">
          <t-button
            @click="showNamedDialog('input-dialog')"
          >
            Show dialog with text input
          </t-button>
        </div>
      </TInputGroup>

      <TInputGroup
        label="Prompt with custom input"
        class="mb-4"
      >
        <t-dialog
          icon="question"
          type="prompt"
          input-type="text"
          input-value="A"
          title="This is a restricted section"
          text="Whats is your secret word?"
          name="custom-input-dialog"
        >
          <template #input="{ setInputValue }">
            <TSelect
              :options="['A', 'B', 'C']"
              @change="setInputValue(($event as any).target.value)"
            />
          </template>
        </t-dialog>
        <div class="flex space-x-2">
          <t-button
            @click="showNamedDialog('custom-input-dialog')"
          >
            Show witch custom select input
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

import { Data, DialogIcon, DialogType } from '@variantjs/core';
import TCheckbox from '../components/TCheckbox.vue';
import TButton from '../components/TButton.vue';
import TCard from '../components/TCard.vue';
import TDialog from '../components/TDialog.vue';
import TSelect from '../components/TSelect.vue';
import TRadio from '../components/TRadio.vue';
import TInputGroup from '../components/TInputGroup.vue';

export default defineComponent({
  name: 'App',
  components: {
    TButton,
    TCheckbox,
    TCard,
    TDialog,
    TSelect,
    TInputGroup,
    TRadio,
  },
  data() {
    return {
      dialogIcon: 'success' as DialogIcon,
      dialogType: 'alert' as DialogType,
      show: false,
      email: 'alfonso@variantjs.com',
      name: 'Alfonso',
      user: {} as Data,
    };
  },
  methods: {
    async showNamedDialog(name: string) {
      this.$dialog.show(name)
        .then((result) => {
          console.log('result', result);
        }).catch((error) => {
          console.log('error', error);
        });
    },
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
