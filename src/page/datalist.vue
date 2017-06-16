<template>
  <div class="wrap">
    <h1>内容管理</h1>
    <el-tabs type="card" v-model="currentView">
      <el-tab-pane name="pendList" label="待审核"></el-tab-pane>
      <el-tab-pane name="errorsList" label="答案评审"></el-tab-pane>
      <el-tab-pane name="pictureList" label="电影剧照"></el-tab-pane>
      <el-tab-pane name="movieList" label="电影"></el-tab-pane>
    </el-tabs>
    <component :is="currentView"></component>
  </div>
</template>

<script>
import pictureList from '../components/pictureList'
import pendList from '../components/pendList'
import movieList from '../components/movieList'
import errorstList from '../components/errorsList'

export default {
  data () {
    return {
      currentView: 'pendList'
    }
  },
  components: {
    pictureList,
    pendList,
    movieList,
    errorsList
  }
}
</script>

<style lang="less">
  .cell{
    img{
      vertical-align: middle;
    }
  }
  .block{
    .el-pagination{
      float: right;
    }
    &.mt10{
      margin-top: 10px;
    }
  }
</style>
