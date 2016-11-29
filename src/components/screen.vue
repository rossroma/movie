<template>
  <div class="v-screen">
    <div class="v-img">
      <img class="v-scr" :src="images">
      <div v-loading="loading" style="position:absolute" class="el-loading-demo"></div>
    </div>
    <el-input
      v-if="answerText"
      placeholder="请输入电影名称"
      :number="true"
      size="large"
      v-model="filmName">
      <el-button slot="append" @click.native="enterAnswer">确定&跳过</el-button>      
    </el-input>
  </div>
</template>

<script>
import bus from '../bus'
import { Notification } from 'element-ui'

export default {
  created: function () {
    bus.$on('get-new', this.clearFilm)
    bus.$on('loading', this.scrLoading)
  },
  beforeDestroy: function () {
    bus.$off('get-new', this.clearFilm)
    bus.$off('loading', this.scrLoading)
  },
  mounted () {
    var img = document.getElementsByClassName('v-scr')[0]
    var _this = this
    img.onload = function () {
      _this.loading = false
      bus.$emit('screen-height', img.height)
    }
  },
  data () {
    return {
      filmName: '',
      message: '',
      loading: false
    }
  },
  props: ['images', 'answerText', 'rightAnswer', 'userid'],
  methods: {
    // 输入答案
    enterAnswer () {
      if (this.filmName) {
        if (this.answerMatch (this.filmName, this.rightAnswer.title, this.rightAnswer.original_title)) {
          this.notify (1, this.ranMessage(1))
          this.gameLog('right')
        } else {
          this.notify (0, this.ranMessage(), 'error')
          this.gameLog()
        }
        bus.$emit('answer-show', true)
      } else {
        // 输入为空时跳过该题目
        bus.$emit('get-new')
      }
    },
    // 判断答案对错
    answerMatch (userVal, cnVal, enVal) {
      // 将答案进行正则替换，只保留汉字和英文
      this.regcn = str => str.replace(/[^\u4e00-\u9fa5]/g, '')
      this.regen = str => str.replace(/[^a-z]/i, '')
      // 汉字匹配规则，至少匹配3个汉字
      function regcnFun(regResult, regTest) {
        if (regResult.length <=3) {
          return regResult === regTest 
        } else {
          return Boolean(regResult.search(regTest)+1) && regTest.length>=3
        }
      }
      // 英文匹配规则，至少匹配6个英文字母
      function regenFun(regResult, regTest) {
        if ( regResult.length>1 )
          if (regResult.length <=5) {
            return regResult.toLowerCase() === regTest.toLowerCase()
          } else {
            return Boolean(regResult.search(RegExp(regTest,'i'))+1) && regTest.length>=6
          }
        else {
          return false
        }
      }
      // 中英文匹配其一即算对
      let final = regcnFun(this.regcn(cnVal), this.regcn(userVal)) || regenFun(this.regen(enVal), this.regen(userVal))
      return final
    },
    // 回答后的提示
    notify (title, message, type) {
      Notification({
        title: title ? '答对啦！' : '答错了！',
        message: message,
        type: type ? type : 'success'
      });
    },
    // 随机显示回答提示语
    ranMessage (bol) {
      var arr
      if (bol) {
        arr = ['厉害了我的哥，这都能猜对！','大哥，你这是蒙对的吧！','哎呦！不错哦！下一题还能才对么？','6翻了，无敌是多么寂寞！','就你牛逼！','我不相信这是你猜对的，除非你亲我一下！','又对了，你咋不上天呢！']
      } else {
        arr = ['猜不中了吧，要加油啊！','这都没猜对，蓝瘦，香菇！','这一题我闭着眼睛都能猜对！','前辈！在下对你的答案有不同的看法！','你这么回答是什么意思？','对方不想和你说话，并向你丢了一个正确答案！']
      }
      var num = Math.floor(Math.random() * arr.length)
      return arr[num]
    },
    // 答题记录
    gameLog (str) {
      //判断用户是否登录
      if (this.userid) {
      this.$http.get(bus._val.path + 'gamelog/' + this.userid +'?result='+str)
          .then(function (response) {
            if (response.status === 200) {
              console.log(response.body)
            } else {
              console.log(response.status)
            }
          })
      }
    },
    // 清空输入框
    clearFilm () {
      this.filmName = ''
    },
    scrLoading (bol) {
      this.loading = bol
    }
  }
}
</script>

<style lang="less">
  .v-screen {
    .v-img {
      display: block;
      margin-bottom: 10px;
      overflow: hidden;
      border-radius: 4px;
      position: relative;
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

</style>
