import Vue from 'vue'
const globalVal = {
  // 根据环境自动切换path地址
  path: process.env.NODE_ENV === 'production' ? '/' : 'http://127.0.0.1/'
}
let bus = new Vue()
bus._val = globalVal
export default bus