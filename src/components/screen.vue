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
  props: ['images', 'answerText'],
  methods: {
    // 输入答案
    enterAnswer () {
      if (this.filmName) {
         bus.$emit('answer-show', true)
      } else {
        this.message()
      }
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
