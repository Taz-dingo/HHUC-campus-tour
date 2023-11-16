import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      component: ()=>import('@/layout/Layout.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/components/login/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: ()=>import('@/components/login/Register.vue')
    },
    

    {
      path: '/layout',
      name: 'layout',
      component: ()=>import('@/layout/Layout.vue'),
    },

    {
      path: '/scene',
      name: 'scene',
      component: ()=>import('@/components/scene/Scenecopy.vue'),
      children:[
        {
          path:'posts', 
          name:'Details',
          component: ()=>import('@/views/Details.vue')
        }
      ]
    },

    {
      path: '/scene2',
      name: 'scene2',
      component: ()=>import('@/components/scene/Scene2.vue')
    },
    
    {
      path: '/scene3',
      name: 'scene3',
      component: ()=>import('@/components/scene/Scene3.vue')
    },

    {
      path: '/test',
      component: ()=>import('@/components/article/ArticleDetail.vue')
    },
    {
      path: '/scroll',
      component: ()=>import('@/components/ScrollList.vue')
    },
  
    
  ]
})
export default router
