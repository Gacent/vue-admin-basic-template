import Vue from 'vue'
import Router from 'vue-router'
function _imports(file) {
  return resolve => require(['@/views/' + file + '.vue'], resolve)
}
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: _imports('redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: _imports('login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: _imports('404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: _imports('home/index'),
      meta: { title: 'Home', icon: 'dashboard' }
    }]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
