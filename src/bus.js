import Vue from 'vue'
const globalVal = {
	path: 'http://127.0.0.1:8888/'
}
var bus = new Vue()
bus._val = globalVal
export default bus