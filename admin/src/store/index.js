import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {          //状态
    isGetterRouter:false,
    isCollapsed:false,
    userInfo:{}
  },
  getters: {
  },
  mutations: {      //方法
    //改变  动态路由的获取状态  的方法
    changeGetterRouter(state,value){
      state.isGetterRouter = value
    },
    //控制侧边栏的展开
    changeCollapsed(state){
      state.isCollapsed = !state.isCollapsed   
    },
    changeUserInfo(state,value){
      state.userInfo = {
        ...state.userInfo,
        ...value
      }
    },
    clearUserInfo(state,value){             //清空用户信息
       state.userInfo = {}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      key: 'admin_store', // 自定义存储key，避免冲突
      paths: ['isCollapsed','userInfo'] // 只持久化你需要的状态，可选
    })
  ]
})
