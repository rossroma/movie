<template>
  <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" class="signin">
    <el-form-item label="用户名" prop="username">
      <el-input size="large" v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input size="large" type="password" v-model="formData.password" @keyup.native.enter="submitForm('formData')"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('formData')">登录</el-button>
      <el-button @click="resetForm('formData')">重置</el-button>
    </el-form-item>
    <el-form-item>
      <p class="v-forget"><a href="javascript:;">忘记密码？</a></p>
    </el-form-item>
  </el-form>
</template>

<script>
import bus from '../bus'
import { Message } from 'element-ui'

export default {
  data () {
    return {
      formData: {
        username: null,
        password: null
      },
      rules: {
        username: { required: true, message: '请输入用户名', trigger: 'blur' },
        password: { required: true, message: '请输入密码', trigger: 'blur' }
      }
    }
  },
  methods: {
    // 登录验证
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.signin()
        }
      })
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 登录
    signin () {
      const url = `signin`
      const body = this.formData
      bus.post(url, body, (data) => {
        if (data.error) {
          this.message('账号或密码错误', 'warning')
        } else {
          this.$router.push('/')
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

<style lang="less" scoped>
  .signin {
    padding: 30px 260px 0 240px;
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
