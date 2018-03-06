import Vue from 'vue'
import Router from 'vue-router'
import Home from 'containers/Home'
import List from 'containers/List'
import Collect from 'containers/Collect'
import Add from 'containers/Add'
// 在基础config.js中修改过路径；
// src == @  如：import HelloWorld from '@/components/HelloWorld';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/collect',
      component: Collect
    },
    {
      path: '/add',
      name: 'add', //别名没用
      component: Add
    },
    {  // 404 路由；
    	path: '*',    //任意路径
//			path:'/'
    	redirect:'/home'
    }
  ],
  linkActiveClass:'active',    //tab 切换加class;
  mode:'history'    // 去除 #/
})
