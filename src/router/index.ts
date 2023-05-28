import {createRouter, createWebHistory} from 'vue-router'
import MainPage from '../views/MainPage.vue'
import StockGlassfrom from '../views/StockGlass.vue'

const routes = [
    { path: '/', component: MainPage },
    { path: '/glass', component: StockGlassfrom },
  ]

  const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
  })

  export default router