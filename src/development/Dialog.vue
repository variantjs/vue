<template>
  <t-card class="w-full">
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
      label="Input with a validator"
      class="mb-4"
    >
      <t-dialog
        icon="question"
        type="prompt"
        title="Secret word?"
        text="Pass a word that is between 5 and 10 chars"
        name="input-with-validator"
        :input-validator="inputValidator"
      />

      <div class="flex space-x-2">
        <t-button
          @click="showNamedDialog('input-with-validator')"
        >
          Show input
        </t-button>
      </div>
    </TInputGroup>

    <TInputGroup
      label="Alert with failing promise"
      class="mb-4"
    >
      <t-dialog
        icon="question"
        type="alert"
        title="Delete?"
        text="This action cannot be undone"
        name="promise-alert"
        :pre-confirm="failingAlertPromise"
      />

      <div class="flex space-x-2">
        <t-button
          @click="showNamedDialog('promise-alert')"
        >
          Show alert that will fail
        </t-button>
      </div>
    </TInputGroup>

    <TInputGroup
      label="Alert with success promise"
      class="mb-4"
    >
      <t-dialog
        icon="question"
        type="alert"
        title="Delete?"
        text="This action cannot be undone"
        name="promise-alert-succeed"
        :pre-confirm="successAlertResponse"
      />

      <div class="flex space-x-2">
        <t-button
          @click="showNamedDialog('promise-alert-succeed')"
        >
          Show alert that will succeed
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
          <t-button @click="() => hide()">
            Close this
          </t-button>
        </template>
      </t-dialog>
    </TInputGroup>

    <TInputGroup
      label="Open alert programatically"
      class="mb-4"
    >
      <t-button @click="programaticAlert">
        Show alert
      </t-button>
      <t-button @click="programaticAlert2">
        Show alert alt
      </t-button>
      <t-button @click="programaticFailingAlert">
        Show failing alert
      </t-button>
    </TInputGroup>
  </t-card>
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

const failingAlertPromise = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(new Error('Failed to delete'));
  }, 1000);
});

const successAlertResponse = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve({
      foo: 'bar',
    });
  }, 1000);
});

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
      failingAlertPromise,
      successAlertResponse,
    };
  },
  methods: {
    inputValidator(input: any) {
      const isProperLength = String(input).length >= 5 && String(input).length <= 10;

      if (!isProperLength) {
        return `Your word is ${String(input).length} chars length`;
      }

      return null;
    },
    programaticAlert() {
      this.$dialog.alert('Whatever').then((result) => {
        console.log('result', result);
      }).catch((error) => {
        console.log('error', error);
      });
    },
    programaticAlert2() {
      this.$confirm('Whatever').then((result) => {
        console.log('result', result);
      }).catch((error) => {
        console.log('error', error);
      });
    },
    programaticFailingAlert() {
      this.$dialog.alert({
        title: 'Will fail',
        icon: DialogIcon.Error,
        preConfirm: failingAlertPromise,
      }).then((result) => {
        console.log('result', result);
      }).catch((error) => {
        console.log('error', error);
      });
    },
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
