<template>
  <div class="wrap">
    <div class="v-tabs">
      <el-tabs type="card" @tab-click="handleClick">
        <el-tab-pane name="signin" label="登录"></el-tab-pane>
        <el-tab-pane name="register" label="注册"></el-tab-pane>
      </el-tabs> 
    </div>
    <br>
    <signin v-if="tab === 'signin'"></signin>
    <register v-if="tab === 'register'"></register>

  </div>
</template>

<script>
import signin from '../components/signin'
import register from '../components/register'

export default {
  data () {
    return {
      tab: 'signin'
    }
  },
  components: {
    signin,
    register
  },
  methods: {
    handleClick(val) {
      this.tab = val.name
    }
  }
}
</script>

<style lang="less" scoped>
  .v-tabs{
    margin: 100px 200px 0;
    text-align: center;
    border-bottom: 3px solid #ededee;
  }
</style>
