import './assets/tailwind.css';
import { createApp } from 'vue';
import { VariantJSConfiguration } from './types';
import variantJsPlugin from '.';

import App from './App.vue';

const app = createApp(App);

const configuration: VariantJSConfiguration = {};

app.use(variantJsPlugin, configuration);

app.mount('#app');
