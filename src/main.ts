import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { store, key } from './store/store.ts';
import router from './router/index.ts';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(store, key).use(router).mount('#app');
