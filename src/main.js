import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import ListTransactions from './views/ListTransactions.vue'
import CreateTransaction from './views/CreateTransaction.vue'

const routes = [
  { path: '/', name: 'home', component: ListTransactions },
  { path: '/transaction', name: 'create-transaction', component: CreateTransaction }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).mount('#app')
