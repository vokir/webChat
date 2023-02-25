import { createApp } from 'vue';
import App from './index.vue';
import { router } from "./router";
import { pinia } from "./store";
import './firebase'

const modules = import.meta.glob('./assets/icons/*.svg');
Object.entries(modules).forEach(async ([key, el]) => {
  await el();
});

const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
