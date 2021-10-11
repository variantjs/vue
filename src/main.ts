import './assets/tailwind.css';
import { createApp } from 'vue';
import plugin from './plugin';
import { VariantJSConfiguration } from './types/variantCore';

import App from './development/App.vue';

import router from './development/router';

const app = createApp(App);

app.use(router);

const configuration: VariantJSConfiguration = {
  TCard: {
    classes: {
      wrapper: 'bg-white border border-gray-100 rounded shadow-sm w-full',
    },
  },
};

app.use(plugin, configuration);

app.mount('#app');
