// eslint-disable-next-line import/no-extraneous-dependencies
import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './Home.vue';
import About from './About.vue';
import Options from './Options.vue';
import Multioptions from './Multioptions.vue';
import Dropdown from './Dropdown.vue';
import Alert from './Alert.vue';
import Modal from './Modal.vue';
import Dialog from './Dialog.vue';
import Theme from './Theme.vue';
import Attributes from './Attributes.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/options', component: Options },
  { path: '/multioptions', component: Multioptions },
  { path: '/dropdown', component: Dropdown },
  { path: '/alert', component: Alert },
  { path: '/modal', component: Modal },
  { path: '/dialog', component: Dialog },
  { path: '/theme', component: Theme },
  { path: '/attributes', component: Attributes },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
