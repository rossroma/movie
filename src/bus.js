import Vue from 'vue'
const globalVal = {
	path: 'http://172.168.8.248:8888/'
}
var bus = new Vue()
bus._val = globalVal
export default bus