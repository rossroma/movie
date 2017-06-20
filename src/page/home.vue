<template>
  <div class="wrap">
    <h1>猜电影</h1>
    <div class="v-screen" v-loading="loading">
      <div class="v-img">
        <img ref="pictrue" :src="newImg">
      </div>
      <el-input
        v-if="inputShow"
        placeholder="请输入电影名称"
        :number="true"
        size="large"
        @keyup.native.enter="enterAnswer"
        v-model="filmName">
        <el-button slot="append" @click.native="enterAnswer">确定&跳过</el-button>
      </el-input>
      <answer
        v-if="answerShow"
        :movie="movieInfos"
        :picId="imageId"
        :userAnswer="filmName"
        :isRight="isRight"
        @get-new="getNewFilm">
      </answer>
    </div>
    <upload :login="userName"></upload>
    <div class="v-foot-nav">
      <router-link to="/about">About</router-link>
      <router-link v-if="!userName" to="/login">Login</router-link>
      <router-link v-if="userName" to="/user">{{userName}}</router-link>
    </div>
  </div>
</template>

<script>
import bus from '../bus'
import { Notification } from 'element-ui'

export default {
  data () {
    return {
      pictrue: '', // 剧照URL
      imageId: '', // 剧照ID
      movieInfos: {}, // 电影详情
      inputShow: true, // 是否显示输入框
      answerShow: false, // 是否显示答案
      picHeight: 0,
      userName: '',
      userObid: '',
      pageCount: '', // 剧照总数
      loading: true,
      filmName: '',
      isRight: false // 答案是否正确
    }
  },
  computed: {
    newImg () {
      if (this.pictrue) {
        return this.pictrue + '-large'
      } else {
        return this.pictrue
      }
    }
  },
  mounted () {
    this.getCount()
    this.loginStatus()
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
      this.loading = true
      this.pictrue = ''
      this.clearFilm()
      this.answerShow = false
      const url = 'rd-pic'
      const params = {
        rdNum: this.getRandom()
      }
      bus.get(url, params, (data) => {
        this.pictrue = data.images
        this.imageId = data.objectId
        this.loading = false
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
    },
    // 输入答案
    enterAnswer () {
      if (this.filmName) {
        this.inputShow = false
        const url = 'answerMatch'
        const params = {
          answer: this.filmName,
          objectId: this.imageId
        }
        bus.get(url, params, (data) => {
          if (data.isMatch) {
            this.notify(1, this.ranMessage(1))
            this.gameLog('right')
          } else {
            this.notify(0, this.ranMessage())
            this.gameLog()
          }
          this.isRight = data.isMatch
          this.movieInfos = data
          this.answerShow = true
        })
      } else {
        // 输入为空时跳过该题目
        this.getNewFilm()
      }
    },
    // 回答后的提示
    notify (type, message) {
      Notification({
        title: type ? '答对啦！' : '答错了！',
        message: message,
        type: type ? 'success' : 'error'
      })
    },
    // 随机显示回答提示语
    ranMessage (bol) {
      let arr
      if (bol) {
        arr = ['厉害了我的哥，这都能猜对！', '大哥，你这是蒙对的吧！', '哎呦！不错哦！下一题还能猜对么？', '6翻了，无敌是多么寂寞！', '就你牛逼！', '我不相信这是你猜对的，除非你亲我一下！', '又对了，你咋不上天呢！']
      } else {
        arr = ['猜不中了吧，要加油啊！', '这都没猜对，蓝瘦，香菇！', '这一题我闭着眼睛都能猜对！', '前辈！在下对你的答案有不同的看法！', '你这么回答是什么意思？', '对方不想和你说话，并向你丢了一个正确答案！']
      }
      const num = Math.floor(Math.random() * arr.length)
      return arr[num]
    },
    // 答题记录
    gameLog (str) {
      // 判断用户是否登录
      if (this.userid) {
        const url = `gamelog/${this.userid}`
        const params = {
          result: str
        }
        bus.get(url, params, (data) => {})
      }
    },
    // 清空输入框
    clearFilm () {
      this.filmName = ''
      this.inputShow = true
    }
  },
  components: {
    answer: (resolve) => {
      require(['../components/answer'], resolve)
    },
    upload: (resolve) => {
      require(['../components/upload'], resolve)
    }
  }
}
</script>

<style lang="less" scoped>
  .wrap {
    .v-screen {
      position: relative;
      .v-img {
        display: block;
        overflow: hidden;
        border-radius: 4px;
        position: relative;
        min-height: 400px;
        transition: height 0.3s ease;
        .el-loading-demo {
          height: 100%;
          width: 100%;
          left: 0;
          top: 0;
        }
        img {
          width: 100%;
          display: block;
        }
      }
    }
    .el-input {
      margin-top: 10px;
      position: absolute;
      left: 0;
      top: 100%;
    }
  }
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