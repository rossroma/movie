import Vue from 'vue'
import App from './App'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import Resource from 'vue-resource'

Vue.use(Element)
Vue.use(Resource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
