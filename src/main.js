import { createApp } from 'vue'
import './assets/index.css'
import App from './App.vue'
import router from './routes/route'

createApp(App).use(router).mount('#app')
