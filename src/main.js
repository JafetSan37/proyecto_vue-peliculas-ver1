import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'  // Importa Quasar

import firebaseApp from "./firebase";
console.log("Firebase conectado:", firebaseApp);

const app = createApp(App)

app.use(router)
app.use(Quasar, { plugins: {} })  // Activa Quasar

app.mount('#app')
