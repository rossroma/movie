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
      userObid: '',
      pageCount: ''
    }
  },
  components: {
    screen,
    answer: (resolve) => {
      require(['../components/answer'], resolve)
    },
    upload: (resolve) => {
      require(['../components/upload'], resolve)
    }
  },
  methods: {
    // 获取剧照总数
    getCount () {
      const url = 'getCount'
      bus.get(url, {}, (data) => {
        this.pageCount = data.count
        this.getNewFilm()
      })
    },
    // 查询登录状态
    loginStatus () {
      const url = 'loginstatus'
      bus.get(url, {}, (data) => {
        this.userName = data.name
        this.userObid = data.obid
      })
    },
    // 随机获取一部电影
    getNewFilm () {
      bus.$emit('loading', true)
      const url = 'rd-pic'
      const params = {
        rdNum: this.getRandom()
      }
      bus.get(url, params, (data) => {
        this.currentFilm = data.results[0]
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
    },
    // 条件判断 随机数是否被初始化
    getRandom () {
      const randomArray = bus.storage().get('RANDOM_ARRAY')
      if (randomArray) {
        const arr = `[${randomArray}]`
        return this.sendRandom(JSON.parse(arr))
      } else {
        return this.initRandom()
      }
    },
    // 初始化随机数
    initRandom () {
      let arr = []
      for (let i = 0; i < this.pageCount; i++) {
        arr.push(i)
      }
      bus.storage().set('RANDOM_ARRAY', arr)
      return this.sendRandom(arr)
    },
    // 返回随机数
    sendRandom (arr) {
      if (arr.length) {
        const num = Math.floor(Math.random() * arr.length)
        window.setTimeout(function () {
          arr.splice(num, 1)
          bus.storage().set('RANDOM_ARRAY', arr)
        }, 50)
        return arr[num]
      } else {
        return this.initRandom()
      }
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