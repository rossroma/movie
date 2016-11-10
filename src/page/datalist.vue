<template>
	<div class="wrap">
    <h1>内容管理</h1>
	  <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane name="pend" label="待审核"></el-tab-pane>
	    <el-tab-pane name="picture" label="电影剧照"></el-tab-pane>
      <el-tab-pane name="movie" label="电影"></el-tab-pane>
	  </el-tabs>
	  <pend-list v-if="tab === 'pend'"></pend-list>
    <picture-list v-if="tab === 'picture'"></picture-list>
	  <movie-list v-if="tab === 'movie'"></movie-list>
	</div>
</template>

<script>
import pictureList from '../components/pictureList'
import pendList from '../components/pendList'
import movieList from '../components/movieList'

export default {
	data () {
		return {
			tab: 'pend'
		}
	},
  components: {
    pictureList,
    pendList,
    movieList
  },
  methods: {
    handleClick(val) {
    	this.tab = val.name
    }
  }
}
</script>

<style lang="less">
  body {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  h1 {
    text-align: center;
    font-weight: normal;
  }
  .wrap {
    width: 1000px;
    margin: 0 auto;
  }  .cell{
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
