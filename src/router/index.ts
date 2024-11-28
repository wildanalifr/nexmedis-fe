import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/homepage',
      name: 'homepage',
      component: () => import('../views/HomePageView.vue'),
    },
  ],
})

const isAuthenticated = localStorage.getItem('token')

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
  else next()
})

export default router
