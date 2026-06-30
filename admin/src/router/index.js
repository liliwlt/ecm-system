import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainBox from '../views/MainBox.vue'
import RoutesConfig from './config'
import store from '../store/index'
const routes = [      //父路由
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/mainbox",
    name: "mainbox",
    component: MainBox
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


/* 路由拦截   每次页面跳转前都要执行      具有动态路由  */
router.beforeEach((to, from, next) => {   /* to是要跳转的，from是 */
  if (to.name === "login") {             //   已登录 next() ， 
    next()
  }
  // ✅ 放行 token 过期页面
  else if (to.path === "/tokenlose") {
        next()
        return
  }
  else {                              //  要去除登录外的其他地方  
    if (!localStorage.getItem("token")) {     //  未登录过  重定向到login   （判断有没有token  无token
      next({ path: "/login" })
    }
    else {                                     //如果token没过期，token存在 添加动态路由
      if (!store.state.isGetterRouter) {        //如果是第一次登录（如果动态路由没添加过）（这里说的第一次不是第一次登录，而是第一次走configrouter，！第一次是让浏览器去找已经添加好的动态路由

        router.removeRoute("mainbox")

        configrouter()
        next({
          path: to.fullPath
        })
      } else {          //如果configrouter走过一次了
        next()
      }
    }
  }
})
const configrouter = () => {
  if (!router.hasRoute("mainbox")) {
    router.addRoute({
      path: "/mainbox",
      name: "mainbox",
      component: MainBox
    })
  }

  RoutesConfig.forEach(item => {   //遍历   把配置挂载成子路由，和路由规则合在一起是子路由
    checkPermiission(item) && router.addRoute("mainbox", item)//添加路由子孩子
  })
  //改变isGetterRouter为true
  store.commit("changeGetterRouter", true)
}

const checkPermiission = (item) => {
  if (item.requireAdmin) {
    return store.state.userInfo.role === 1
  }
  return true
}

export default router
