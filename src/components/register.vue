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
        <el-button type="primary" @click="sendData">提交</el-button>
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
      validata: false,
      formData: {}
    }
  },
  methods: {
    // 验证输入信息
    enterVal (event, name) {
      const regList = {
        UserName: /^[\w|\d]{4,16}$/,
        Password: /^[\w!@#$%^&*.]{6,16}$/,
        Mail: /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
      }
      const result = event.target.value
      if (name === 'username') {
        if (regList.UserName.test(result)) {
          this.formData.username = result
          this.controlCss(event.target, 'success')
        } else {
          this.message('用户名不符合要求', 'error')
          this.controlCss(event.target)
        }
      } else if (name === 'password') {
        if (regList.Password.test(result)) {
          this.formData.password = result
          this.controlCss(event.target, 'success')
        } else {
          this.message('密码不符合要求', 'error')
          this.controlCss(event.target)
        }
      } else if (name === 'password2') {
        if (result !== this.formData.password) {
          this.message('与第一次输入的密码不同', 'error')
          this.controlCss(event.target)
        } else {
          this.controlCss(event.target, 'success')
        }
      } else if (name === 'email') {
        if (regList.Mail.test(result)) {
          this.formData.email = result
          this.controlCss(event.target, 'success')
        } else {
          this.message('邮箱格式有误，请检查后重新输入', 'error')
          this.controlCss(event.target)
        }
      }
    },
    // 控制样式
    controlCss (event, success) {
      const classname = event.parentNode.className.replace(/[v\-success|v\-danger]/, '')
      if (success) {
        event.parentNode.className = 'v-success ' + classname
        this.validata = true
      } else {
        event.parentNode.className = 'v-danger ' + classname
        this.validata = false
      }
    },
    // 提示信息
    message (mes, type) {
      Message({
        message: mes,
        type: type
      })
    },
    // 提交数据
    sendData () {
      if (this.validata && this.formData.username && this.formData.username && this.formData.email) {
        this.$http.post(bus._val.path + 'register', this.formData)
            .then((response) => {
              if (response.status === 200) {
                if (response.body.error) {
                  if (response.body.code === 202) {
                    this.message('错误：用户名' + this.formData.username + '已被使用', 'error')
                  } else if (response.body.code === 203) {
                    this.message('错误：邮箱' + this.formData.email + '已被使用', 'error')
                  } else {
                    this.message('错误：' + response.body.code + response.body.error, 'error')
                  }
                } else {
                  const that = this
                  Message({
                    message: '注册成功，请登录。',
                    duration: 1000,
                    onClose () {
                      that.$router.push('/login')
                    }
                  })
                }
              } else {
                console.log(response.status)
              }
            })
      }
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
