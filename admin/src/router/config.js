import Home from '../views/home/Home.vue'
import Center from '../views/center/Center.vue'

import UserAdd from '../views/user-manage/UserAdd.vue'
import UserList from '../views/user-manage/UserList.vue'

import NewsAdd from '../views/news-manage/NewsAdd.vue'
import NewsList from '../views/news-manage/NewsList.vue'
import NewsEdit from '../views/news-manage/NewsEdit.vue'

import ProductAdd from '../views/product-manage/ProductAdd.vue'
import ProductList from '../views/product-manage/ProductList.vue'
import ProductEdit from '../views/product-manage/ProductEdit.vue'

import NotFound from '../views/notfound/NotFound.vue'
import TokenLose from '../views/notfound/TokenLose.vue'

const shuzu=[                   //路由配置数组，每一项都是路由规则
{ 
  path:"/home",              
  component:Home
},
{   
  path:"/center",            
  component:Center
},

//use
{   
  path:"/user-manage/useradd",     
  component:UserAdd,
  requireAdmin:true
},
{   
  path:"/user-manage/userlist",             
  component:UserList,
  requireAdmin:true
},

//news
{   
  path:"/news-manage/newsadd",         
  component:NewsAdd
},
{   
  path:"/news-manage/newslist",            
  component:NewsList
},
{   
  path:"/news-manage/newsedit/:id",            
  component:NewsEdit
},

//product
{   
  path:"/product-manage/productadd",        
  component:ProductAdd
},
{   
  path:"/product-manage/productlist",            
  component:ProductList
},
{   
  path:"/product-manage/productedit/:id",            
  component:ProductEdit
},

{
  path:"/",
  redirect:"/home"        
},
{
  path:"/:pathMatch(.*)*",  //乱输入跳转
  name:"NotFound",
  component: NotFound
},
{
  path:"/tokenlose",
  component:TokenLose
}


]

export default shuzu