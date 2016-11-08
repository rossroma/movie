<template>
	<div class="wrap">
    <h1>内容管理</h1>
	  <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane label="待审核"></el-tab-pane>
	    <el-tab-pane label="电影剧照"></el-tab-pane>
      <el-tab-pane label="电影"></el-tab-pane>
	  </el-tabs>
	  <pend-list v-if="tab === 1"></pend-list>
    <picture-list v-if="tab === 2"></picture-list>
	  <movie-list v-if="tab === 3"></movie-list>
	</div>
</template>

<script>
import pictureList from '../components/pictureList'
import pendList from '../components/pendList'
import movieList from '../components/movieList'

export default {
	data () {
		return {
			tab: 1
		}
	},
  components: {
    pictureList,
    pendList,
    movieList
  },
  methods: {
    handleClick(tab) {
    	this.tab = Number(tab)
    }
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
