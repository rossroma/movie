<template>
  <div class="register">
		<el-row :gutter="20">
		  <el-col :span="24">
		  	<el-input size="large" @change.native="enterVal($event, 'username')" placeholder="设置用户名，大于6位的英文或数字">
	  		</el-input>
		  </el-col>
		  <el-col :span="24">
			  <el-input size="large" @change.native="enterVal($event, 'password')" type="password" placeholder="输入密码">
			  </el-input>
		  </el-col>
		  <el-col :span="24">
			  <el-input size="large" @change.native="enterVal($event, 'password2')" type="password" placeholder="重复密码"></el-input>
		  </el-col>
		  <el-col :span="24">
		  	<el-input size="large" @change.native="enterVal($event, 'email')" placeholder="输入常用的邮箱">
	  		</el-input>
		  </el-col>
		  <el-col :span="24">
		  	<el-button type="primary">提交</el-button>
		  </el-col>		  		  		
		</el-row>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
	data () {
		return {
			formData: {}
		}
	},
	methods: {
		enterVal (event, name) {
			var regList = {
		    UserName: /^[\w|\d]{4,16}$/,
		    Password: /^[\w!@#$%^&*.]{6,16}$/,
		    Mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
			}
			var result = event.target.value
			console.log(event)
			if ( name === 'username') {
				if (regList.UserName.test(result)) {
					this.formData.username = result
					this.controlCss(event.target, 'success')
				} else {
					this.message('用户名不符合要求','warning')
					this.controlCss(event.target)
				}
			} else if ( name === 'password') {
				if (regList.Password.test(result)) {
					this.formData.password = result
					this.controlCss(event.target, 'success')
				} else {
					this.message('密码不符合要求','warning')
					this.controlCss(event.target)
				}
			} else if ( name === 'password2') {
				if (result !== this.formData.password) {
					this.message('与第一次输入的密码不同','warning')
					this.controlCss(event.target)
				} else {
					this.controlCss(event.target, 'success')
				}
			} else if ( name === 'email') {
				if (regList.Mail.test(result)) {
					this.formData.email = result
					this.controlCss(event.target, 'success')
				} else {
					this.message('邮箱格式有误，请检查后重新输入','warning')
					this.controlCss(event.target)
				}
			}
		},
		//控制样式
		controlCss (event, success) {
			var classname = event.parentNode.className.replace(/[v\-success|v\-danger]/,'')
			if (success) {
				event.parentNode.className = 'v-success '+classname
			} else {
				event.parentNode.className = 'v-danger '+classname
			}
		},
    // 提示信息
    message (mes, type) {
      Message({
        message: mes,
        type: type
      })
    }
	}
}
</script>

<style lang="less">
	.register {
		padding: 30px 300px 0;
		.el-col {
			height: 70px;
			position: relative;
		}
	}
	.v-success{
		&::after {
			font-family: element-icons!important;
			content: "\E609";
			color: #13CE66;
			position: absolute;
			right: -25px;
			top: 12px;
		}
	}
	.v-danger{
		&::after {
			font-family: element-icons!important;
			content: "\E60B";
			color: #FF4949;
			position: absolute;
			right: -25px;
			top: 12px;
		}
	}
</style>
