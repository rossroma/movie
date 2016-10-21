import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Resource from 'vue-resource'
import VueRouter from 'vue-router'
import dataList from './page/datalist'
import Home from './page/home'

Vue.use(Element)
Vue.use(Resource)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/datalist', component: dataList }
]

const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
