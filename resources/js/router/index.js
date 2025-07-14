import { createRouter, createWebHistory } from 'vue-router'
import home from '../views/home.vue'


const routes = [
  { path: '/', component: home },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
