<template>
  <div class="signin">
		<el-row :gutter="20">
		  <el-col :span="24">
		  	<el-input size="large" placeholder="输入用户名" v-model="username">
	  		</el-input>
		  </el-col>
		  <el-col :span="24">
			  <el-input size="large" type="password" placeholder="输入密码" v-model="password">
			  	 <el-button slot="append" @click.native="signin" icon="d-arrow-right"></el-button>
			  </el-input>
		  </el-col>
		  <el-col :span="24">
			  <p class="v-forget"><a href="">忘记密码？</a></p>
		  </el-col> 
		</el-row>
  </div>
</template>

<script>
import bus from '../bus'
import { Message } from 'element-ui'

export default {
	data () {
		return {
			username: null,	
			password: null,
			objectId: null
		}
	},
	methods: {
		signin () {
			if (this.username && this.password) {
				let body = {
					username: this.username,	
					password: this.password
				}
				var that = this
        this.$http.post(bus._val.path + 'signin', body)
            .then(function (response) {
              if (response.status === 200) {
                if (response.body.error) {
                	this.message('账号或密码错误','warning')
                } else {
					        that.$router.push('/')
                }
              } else {
                console.log(response.status)
              }
            })
			} else {
				this.message('用户名或密码不能为空','warning')
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

<style lang="less" scoped>
	.signin {
		padding: 30px 300px 0;
		.el-col {
			height: 70px;
		}
		.v-forget {
			text-align: right;
			a {
				color: #99A9BF;
				text-decoration: none;
				&:hover{
					color: #20a0ff;
				}
			}
		}
	}
</style>
