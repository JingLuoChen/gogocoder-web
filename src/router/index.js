//引入vue
import Vue from 'vue';
//引入vue-router
import VueRouter from 'vue-router';
//第三方库需要use一下才能用
Vue.use(VueRouter)
//
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
// 首页
import index  from '../view/index/index';
// 面经
import face  from '../view/face/index';
// 内推
import official  from '../view/official/index';
// 联系我们
import about  from '../view/about/index';
// 爆料
import brokeNews  from '../view/brokeNews/index';
// 相关资源
import resources  from '../view/resources/index';
// 知识体系
import knowSystem from '../view/knowSystem/index'

//定义routes路由的集合，数组类型
const routes=[
    //单个路由均为对象类型，path代表的是路径，component代表组件
    {path:'/', redirect:'home'},
    {path:'/face', name: 'face', component: face},
    {path:'/official', name: 'official', component: official},
    {path:'/about', name: 'about', component: about},
    {path:'/home', name: 'home', component: index},
    {path:'/brokeNews', name: 'brokeNews', component: brokeNews},
    {path:'/resources', name: 'resources', component: resources},
    {path:'/knowSystem', name: 'knowSystem', component: knowSystem}
]

// 实例化VueRouter并将routes添加进去
const router = new VueRouter({
   // ES6简写，等于routes：routes
    mode: 'history',
    routes
});

// 抛出这个这个实例对象方便外部读取以及访问
export default router
