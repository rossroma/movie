import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Resource from 'vue-resource'
Vue.use(Resource)

import { Button, Input, Form, Row, Col, Rate, Loading, Dialog, Tabs, TabPane, Pagination, Table, tableColumn, Checkbox, Menu, MenuItem } from 'element-ui'
Vue.use(Button)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Rate)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(tableColumn)
Vue.use(Menu)
Vue.use(MenuItem)

// route
Vue.use(VueRouter)
const Home = resolve => require(['./page/home'], resolve)
const dataList = resolve => require(['./page/datalist'], resolve)
const about = resolve => require(['./page/about'], resolve)
const login = resolve => require(['./page/login'], resolve)
const user = resolve => require(['./page/user'], resolve)

const routes = [
  { path: '/', component: Home },
  { path: '/datalist', component: dataList },
  { path: '/about', component: about },
  { path: '/login', component: login },
  { path: '/user', component: user }
]

const router = new VueRouter({
  routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})