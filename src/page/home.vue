<template>
  <div class="wrap">
    <h1>猜电影</h1>
    <screen :images="newImg" :rightAnswer="currentFilm.movie" :answerText="!answerShow"></screen>
    <answer v-if="answerShow" :iHeight="imgHeight" :movie="currentFilm.movie" :picId="currentFilm.objectId"></answer>
    <upload :login="userName"></upload>
    <div class="v-foot-nav">
      <router-link to="/about">About</router-link>
      <router-link v-if="!userName" to="/login">Login</router-link>
      <router-link v-if="userName" to="/user">{{userName}}</router-link>
    </div>
  </div>
</template>

<script>
import screen from '../components/screen'
import answer from '../components/answer'
import upload from '../components/upload'
import bus from '../bus'

export default {
  created () {
    bus.$on('get-new', this.getNewFilm)
    bus.$on('answer-show', this.showAnswer)
    bus.$on('screen-height', this.resetHeight)
  },
  beforeDestroy () {
    bus.$off('get-new', this.getNewFilm)
    bus.$off('answer-show', this.showAnswer)
    bus.$off('screen-height', this.resetHeight)
  },
  mounted () {
    this.getCount()
    this.loginStatus()
  },
  data () {
    return {
      currentFilm: {},
      answerShow: false,
      imgHeight: 0,
      userName: '',
      userObid: ''
    }
  },
  components: {
    screen,
    answer,
    upload
  },
  methods: {
    // 获取剧照总数
    getCount () {
      this.$http.get(bus._val.path + 'getCount')
          .then((response) => {
            if (response.status === 200) {
              this.getNewFilm(response.body.count)
            } else {
              console.log(response.status)
            }
          })
    },
    // 查询登录状态
    loginStatus () {
      this.$http.get(bus._val.path + 'loginstatus')
          .then((response) => {
            if (response.status === 200) {
              if (response.body) {
                this.userName = response.body.name
                this.userObid = response.body.obid
              }
            } else {
              console.log(response.status)
            }
          })
    },
    // 随机获取一部电影
    getNewFilm (count) {
      bus.$emit('loading', true)
      this.$http.get(bus._val.path + 'rd-pic?count=' + count)
          .then((response) => {
            if (response.status === 200) {
              this.currentFilm = response.body.results[0]
            } else {
              console.log(response.status)
            }
          })
    },
    // 控制答案是否显示
    showAnswer (bol) {
      if (bol) {
        this.answerShow = true
      } else {
        this.answerShow = false
      }
    },
    // 重置answer页面高度
    resetHeight (h) {
      this.imgHeight = h
    }
  },
  computed: {
    newImg () {
      if (this.currentFilm.images) {
        return this.currentFilm.images + '-large'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less">
  .bg-gray-lighter {
    background-color: #eff2f7;
  }
  .color-gray {
      color: #5e6d82;
  }
  .v-text-right {
    text-align: right;
  }
  .el-table {
    a{
      color: #20a0ff;
    }
  }
  .v-foot-nav {
    position: fixed;
    right: 40px;
    bottom: 20px;
    a{
      text-decoration: none;
      transition:all 0.3s;
      font-weight: bold;
      color: #aaa;
      font-size: 16px;
      margin-left: 10px;
      &:hover {
        color: #888;
        text-decoration: underline;
      }
    }
  }
</style>