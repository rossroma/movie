import Vue from 'vue'
const globalVal = {
	// 本地测试ip
	// path: 'http://172.168.8.248/'

	// 线上IP或域名
	path: 'http://123.206.213.35/'
}
var bus = new Vue()
bus._val = globalVal
export default bus