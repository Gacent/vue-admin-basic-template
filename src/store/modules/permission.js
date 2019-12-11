// eslint-disable-next-line
import { asyncRoutes, constantRoutes } from '@/router'
import Layout from '@/layout'
import { routerTest } from '@/api/user'
function _imports(file) {
  return resolve => require(['@/views/' + file + '.vue'], resolve)
}
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export function filterAsyncRoutesTwo(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (tmp.children) {
      tmp.children = filterAsyncRoutesTwo(tmp.children, roles)
    }
    if (tmp.component) {
      if (tmp.component === 'Layout') { // Layout组件特殊处理
        tmp.component = Layout
      } else {
        tmp.component = _imports(tmp.component)
      }
    }
    res.push(tmp)
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      // 从后台获取当前角色的权限的路由
      let accessedRoutes
      routerTest().then((res) => {
        if (res.code === 20000) {
          accessedRoutes = filterAsyncRoutesTwo(res.data, roles) || []
          accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }
      }).catch((err) => {
        reject(err)
      })
      // if (roles.includes('admin')) {
      //   accessedRoutes = asyncRoutes || []
      // } else {
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      // }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
