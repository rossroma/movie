import Vue from 'vue'
const globalVal = {
	// 本地测试ip
	// path: 'http://127.0.0.1/'

	// 线上IP或域名
	path: '/'
}
var bus = new Vue()
bus._val = globalVal
export default bus