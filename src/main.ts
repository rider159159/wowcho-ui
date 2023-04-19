import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './stores';
import { setupRouter } from './router';
import { setupPlugins } from './plugins';

import '@unocss/reset/tailwind-compat.css'
import 'uno.css'
import '../src/style/style.scss'

function setupApp() {
  const app = createApp(App)
  setupStore(app);
  setupRouter(app)
  setupPlugins(app)
  app.mount('#app')
}
setupApp();
