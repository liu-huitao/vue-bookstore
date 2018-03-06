// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/index.less'   /*  公用样式 */


//、、、、、、、、、、、、、、、、、、、、、、、、
import axios from 'axios'
Vue.prototype.$axios = axios;				//那么在其他vue组件中就可以this.$axios调用使用
//、、、、、、、、、、、、、、、、、、、、、、、、、


import VueLazyload from 'vue-lazyload'       //解决懒加载：https://github.com/hilongjw/vue-lazyload
Vue.use(VueLazyload)
//、、、、、、、、、、、、、、、、、、、、、、、、、、

import VueScroller  from 'vue-scroller'
Vue.use(VueScroller);   //引用这个组件后 ，页面会多一个全局组件 scroller；把需要刷新的东西放在里面；   https://github.com/wangdahoo/vue-scroller

//、、、、、、、、、、、、、、、、、、、、、、、、、、

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
//components: { App },
	...App,
  template: '<App/>'
})
