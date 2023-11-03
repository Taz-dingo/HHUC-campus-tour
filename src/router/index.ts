import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: ()=>import('@/views/login/index.vue')
    },

    {
      path: '/scene',
      name: 'scene',
      component: ()=>import('@/components/Scene.vue')
    },

    {
      path: '/scene2',
      name: 'scene2',
      component: ()=>import('@/components/Scene2.vue')
    },
    
    {
      path: '/scene3',
      name: 'scene3',
      component: ()=>import('@/components/Scene3.vue')
    },

    {
      path: '/test',
      component: ()=>import('@/views/test.vue')
    },
  
    
  ]
})
export default router
