import './assets/tailwind.css';
import { createApp } from 'vue';
import { VariantJSConfiguration } from './types';
import variantJsPlugin from '.';

import App from './development/App.vue';

import router from './development/router';

const app = createApp(App);

app.use(router);

const configuration: VariantJSConfiguration = {};

app.use(variantJsPlugin, configuration);

app.mount('#app');
