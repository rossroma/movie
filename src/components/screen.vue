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
      <el-button slot="append" @click.native="enterAnswer">确定</el-button>
    </el-input>    
  </div>
</template>

<script>
import bus from '../bus'

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
  props: ['images', 'answerText', 'rightAnswer'],
  methods: {
    // 输入答案
    enterAnswer () {
      console.log(this.rightAnswer.title)
      if (this.filmName) {
        if (this.answerMatch (this.filmName, this.rightAnswer.title)) {
          this.notify (1, '厉害了我的哥，这都能猜对！')
        } else {
          this.notify (0, '猜不中了吧，要加油啊！', 'error')
        }
        bus.$emit('answer-show', true)
      } else {
        this.message()
      }
    },
    // 判断答案对错
    answerMatch (userVal, dataVal) {
      this.regcn = str => str.replace(/[^\u4e00-\u9fa5]/g, '')
      const regResult = this.regcn(dataVal)
      const regTest = this.regcn(userVal)
      if (regResult.length <=3) {
        return regResult === regTest 
      } else {
        return Boolean(regResult.search(regTest)+1) && regTest.length>=3
      }
    },
    // 回答后的提示
    notify (title, message, type) {
      this.$notify({
        title: title ? '答对啦！' : '答错了！',
        message: message,
        type: type ? type : 'success'
      });
    },
    // 输入为空时提示的内容
    message () {
      this.$message({
        message: '请输入电影名称',
        type: 'warning'
      })
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
