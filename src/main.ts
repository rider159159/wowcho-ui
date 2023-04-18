import { createApp } from 'vue'
import '../src/style/style.scss'
import App from './App.vue'
// import api from './api/index'
import 'uno.css'
import { setupStore } from './stores';
import { setupRouter } from './router';
import { setupPlugins } from './plugins';
import '@unocss/reset/tailwind-compat.css'

function setupApp() {
  const app = createApp(App)
  setupStore(app);
  setupRouter(app)
  setupPlugins(app)
  app.mount('#app')
}
setupApp();
