import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import StockGlassfrom from '../views/StockGlass.vue';

const routes = [
  { path: '/', component: MainPage },
  { path: '/glass', component: StockGlassfrom },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
