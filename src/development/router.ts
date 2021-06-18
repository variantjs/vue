// eslint-disable-next-line import/no-extraneous-dependencies
import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './Home.vue';
import About from './About.vue';
import Options from './Options.vue';
import Multioptions from './Multioptions.vue';
import Theme from './Theme.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/options', component: Options },
  { path: '/multioptions', component: Multioptions },
  { path: '/theme', component: Theme },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
