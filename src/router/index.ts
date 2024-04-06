import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/',
      component: () => import('@/layout/Layout.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/login/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/login/Register.vue')
    },


    {
      path: '/layout',
      name: 'layout',
      component: () => import('@/layout/Layout.vue'),
    },

    {
      path: '/scene',
      name: 'scene',
      component: () => import('@/components/scene/Scenecopy.vue'),
    },

    {
      path: '/scene2',
      name: 'scene2',
      component: () => import('@/components/scene/Scene2.vue')
    },

    {
      path: '/scene3',
      name: 'scene3',
      component: () => import('@/components/scene/Scene3.vue')
    },

    {
      path: '/test',
      component: () => import('@/components/article/ArticleDetail.vue')
    },
    {
      path: '/scroll',
      component: () => import('@/components/ScrollList.vue')
    },
    {
      path: '/admin',
      component: () => import('@/components/admin/admin.vue')
    },
    {
      path: '/home',
      name: '主页',
      meta: {
        title: '主页'
      },
      component: () => import('@/views/Home.vue'),
      redirect: '/index',
      children: [
        {
          path: '/index',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/Welcome.vue')
        },
        {
          path: '/user/list',
          meta: {
            title: '用户管理'
          },
          component: () => import('@/views/user/Index.vue'),
        },
        {
          path: '/user/detail',
          meta: {
            title: '用户详情'
          },
          component: () => import('@/views/user/Detail.vue'),
        },
        {
          path: '/article/list',
          meta: {
            title: '文章列表'
          },
          component: () => import('@/views/article/Index.vue'),
        },
        {
          path: '/comment/list',
          meta: {
            title: '评论列表'
          },
          component: () => import('@/views/comment/Index.vue'),
        }
      ]
    },


  ]
})

// const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// export function resetRouter() {
//   const newRouter = createRouter()
//   router.matcher = newRouter.matcher // reset router
// }

export function resetRouter() {
  //获取所有路由
  router.getRoutes().forEach((route) => {
    const { name } = route;   //获取路由name
    router.hasRoute(name) && router.removeRoute(name); //移除
  });
}


export default router
