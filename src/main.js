import Vue from 'vue'
import routes from './routes'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Resource from 'vue-resource'

Vue.use(Element)
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