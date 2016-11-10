import Vue from 'vue'
import routes from './routes'
import { Button, Input, Form, Row, Col, Rate, Loading, Dialog, Icon, Tabs, TabPane, Pagination, Table, tableColumn, Checkbox } from 'element-ui'
import Resource from 'vue-resource'

Vue.use(Button)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Rate)
Vue.use(Loading)
Vue.use(Dialog)
Vue.use(Icon)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(tableColumn)

Vue.use(Resource)

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      const matchingView = routes[this.currentRoute]
      return require('./page/' + matchingView + '.vue')
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})