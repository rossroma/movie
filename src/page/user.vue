<template>
  <div class="wrap">
    <h1>欢迎回来，{{user.username}}</h1>
    <br>
    <br>
    <br>
    <el-row>
      <el-col :span="4">
        <el-menu default-active="gameLog" class="el-menu-vertical-demo" @select="handleSelect">
          <el-menu-item index="gameLog"><i class="el-icon-date"></i>游戏记录</el-menu-item>
          <el-menu-item index="userInfos"><i class="el-icon-document"></i>基本信息</el-menu-item>
          <el-menu-item index="uploadLog"><i class="el-icon-upload"></i>我上传的剧照</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :offset="1" :span="19">
        <component :is="currentView" :userinfo="user"></component>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import bus from '../bus'
import { Message } from 'element-ui'
import gameLog from '../components/gameLog'
import userInfos from '../components/userInfos'
import uploadLog from '../components/uploadLog'

export default {
  mounted () {
    this.loginStatus()
  },
  data () {
    return {
      currentView: 'gameLog',
      user: {}
    }
  },
  components: {
    gameLog,
    userInfos,
    uploadLog
  },
  methods: {
    handleSelect (index) {
      this.currentView = index
    },
    loginStatus () {
      this.$http.get(bus._val.path + 'loginstatus')
          .then(function (response) {
            if (response.status === 200) {
              if (response.body) {
                this.getUser(response.body.obid)
              } else {
                var that = this
                Message({
                  message: '登录已超时，请重新登录',
                  duration: 1500,
                  onClose: function () {
                    that.$router.push('/')
                  }
                })
              }
            } else {
              console.log(response.status)
            }
          })
    },
    getUser (objectId) {
      this.$http.get(bus._val.path + 'getuser?id=' + objectId)
          .then(function (response) {
            if (response.status === 200) {
              this.user = response.body
              console.log(this.user)
            } else {
              console.log(response.status)
            }
          })
    }
  }
}
</script>