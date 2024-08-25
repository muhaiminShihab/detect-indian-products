import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/detector',
      name: 'detector',
      component: () => import('../views/Detector.vue')
    },
    {
      path: '/information',
      name: 'information',
      component: () => import('../views/Information.vue')
    },
  ]
})

export default router
