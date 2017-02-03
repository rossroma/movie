<template>
  <div class="v-userinfos">
    <el-row>
      <el-col :span="4">
        我的账号：
      </el-col>
      <el-col :span="20">
        {{userinfo.username}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        我的邮箱：
      </el-col>
      <el-col :span="20">
        {{userinfo.email}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        手机号码：
      </el-col>
      <el-col :span="20">
        {{userinfo.mobilePhoneNumber}}
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        创建时间：
      </el-col>
      <el-col :span="20">
        {{userinfo.createdAt}}
      </el-col>
    </el-row>
    <el-button class="v-quit" @click="quit">退出登录</el-button>
  </div>
</template>

<script>
import bus from '../bus'
import { MessageBox, Message } from 'element-ui'

export default {
  props: ['userinfo'],
  data () {
    return {
      disable: true,
      emial: ''
    }
  },
  methods: {
    quit () {
      MessageBox.confirm('退出登录', '此操作将退出登录, 是否继续?', {
        type: 'warning'
      }).then(() => {
        const url = `quit`
        bus.get(url, {}, (data) => {
          this.$router.push('/')
        })
      }).catch(() => {
        Message({
          message: '已取消操作'
        })
      })
    }
  }
}
</script>

<style lang="less">
  .v-userinfos {
    .el-row {
      margin-bottom: 18px;
      .el-col-20 {
        color: #888;
        line-height: 1.4;
      }
    }
    .v-quit {
      position: absolute;
      right: 10px;
      top: 0;
    }
  }
</style>
