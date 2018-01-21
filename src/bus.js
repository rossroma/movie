import Vue from 'vue'
import Resource from 'vue-resource'
Vue.use(Resource)

  // 根据环境自动切换path地址
const path = process.env.NODE_ENV === 'production' ? '/' : 'http://movie.rossroma.com/'

// get请求
const get = function (url, params, cb) {
  Vue.http.get(`${path}${url}`, { params: params })
      .then((response) => {
        if (response.status === 200) {
          cb(response.body)
        } else {
          console.log(response.status)
        }
      })
}

// post请求
const post = function (url, body, cb) {
  Vue.http.post(`${path}${url}`, body)
      .then((response) => {
        if (response.status === 200) {
          cb(response.body)
        } else {
          console.log(response.status)
        }
      })
}

// 封装sessionStorage
const storage = function () {
  return {
    set: function (key, value) {
      window.sessionStorage.setItem(key, value)
    },
    get: function (key) {
      return window.sessionStorage.getItem(key)
    },
    remove: function (key) {
      window.sessionStorage.removeItem(key)
    }
  }
}

let bus = new Vue()
bus.path = path
bus.get = get
bus.post = post
bus.storage = storage
export default bus