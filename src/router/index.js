import { createRouter, createWebHistory } from 'vue-router'
import ScanView from '../views/ScanView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'thescan',
      component: ScanView,
    },
  ]
})

export default router