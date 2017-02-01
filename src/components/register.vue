<template>
  <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="register">
    <el-form-item label="用户名" prop="username">
      <el-input size="large" v-model="formData.username" placeholder="长度不小于5位的英文或数字"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input size="large" type="password" v-model="formData.password" placeholder="长度不小于6位的英文或数字，以及'_'"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input size="large" type="password" v-model="formData.checkPass" placeholder="重复输入密码"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input size="large" v-model="formData.email" placeholder="输入常用邮箱"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('formData')">注册</el-button>
      <el-button @click="resetForm('formData')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import bus from '../bus'
import { Message } from 'element-ui'

export default {
  data () {
    const validateUser = (rule, value, callback) => {
      const rules = /^[\w|\d]{5,24}$/
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!rules.test(value)) {
        callback(new Error('用户名不符合规范'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      const rules = /^[\w!@#$%^&*.]{6,16}$/
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (!rules.test(value)) {
        callback(new Error('密码不符合规范'))
      } else {
        if (this.formData.checkPass !== '') {
          this.$refs.formData.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        username: '',
        password: '',
        checkPass: '',
        email: ''
      },
      rules: {
        username: [
          { required: true, validator: validateUser, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 注册验证
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sendData()
        }
      })
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 提交数据
    sendData () {
      console.log(this.formData)
      const url = `register`
      const body = this.formData
      bus.post(url, body, (data) => {
        if (data.error) {
          if (data.code === 202) {
            this.message('错误：用户名' + this.formData.username + '已被使用', 'error')
          } else if (data.code === 203) {
            this.message('错误：邮箱' + this.formData.email + '已被使用', 'error')
          } else {
            this.message('错误：' + data.code + data.error, 'error')
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
      })
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
    padding: 30px 260px 0 240px;
  }
</style>
