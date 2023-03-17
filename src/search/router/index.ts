import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'

// 设置NProgress样式

NProgress.configure({ easing: 'ease', speed: 500 })

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'BaseLayout',
    component: () => import('@/search/layout/BaseLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/search/views/HomePage.vue'),
      },
    ],
  },
]

const router: Router = createRouter({
  // 使用 hash 模式
  history: createWebHashHistory(),
  routes,
})

/**
 * @description: 全局路由前置守卫，在进入路由前触发，导航在所有守卫 resolve 完之前一直处于等待中。
 * @param {RouteLocationNormalized} to  即将要进入的目标
 * @param {RouteLocationNormalizedLoaded} from  当前导航正在离开的路由
 * @return {*}
 */
router.beforeEach((to, from) => {
  console.log('全局路由前置守卫：to,from\n', to, from)
  // 设置页面标题
  document.title = (to.meta.title as string) || import.meta.env.VITE_APP_TITLE
  if (!NProgress.isStarted()) NProgress.start()
})

router.afterEach((to, from) => {
  console.log('全局路由后置守卫：to,from\n', to, from)
  NProgress.done()
})

export default router
