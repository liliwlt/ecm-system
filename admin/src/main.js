import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'  //引入组件库
import 'element-plus/dist/index.css'

import '@/util/axios.config'

// 1. 新增：导入 Element Plus 图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 1. 先创建实例，保存到 app 变量里
const app = createApp(App)
// 2. 新增：循环注册所有图标组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}



app.use(ElementPlus).use(store).use(router).mount('#app')//ElementPlus是完整的插件，ElementPlusIconsVue只是很多个组件
//             ----------------使用element



