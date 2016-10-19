<template>
  <div class="v-screen">
    <div class="v-img">
      <img src="../assets/demo.jpg" alt="">
    </div>
    <el-input
      placeholder="请输入电影名称"
      :number="true"
      size="large"
      v-model="input">
      <el-button slot="append">确定</el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="less" scoped>
  .v-img {
    display: block;
    margin-bottom: 10px;
    overflow: hidden;
    border-radius: 4px;
    img {
      width: 100%;
      display: block;
    }
  }
</style>
