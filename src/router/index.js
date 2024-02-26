import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('../views/Login.vue')
    },
    {
      path: '/HomeChats',
      name: 'HomeChat',
      component: ()=>import('../components/home_page.vue')
    },
    {
      path: '/Inicio',
      name: 'Inicio',
      component: ()=>import('../views/inicio.vue')
    },
  ]
})

export default router
