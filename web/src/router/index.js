import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import News from '../views/News.vue'
import Product from '../views/Product.vue'
import NProgress from 'nprogress'
import New from '../views/New.vue'
import 'nprogress/nprogress.css'


const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path:'/new/:id',
    name:'new',
    component: New
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to,from,next)=>{     //路由切换的前置，在路由开始前执行
  NProgress.start();
  next()
})
router.afterEach((to,from,next)=>{     //后置钩子，
  NProgress.done();
})


export default router
