<template>
	<div class="wrap">
    <h1>内容管理</h1>
	  <el-tabs type="card" @tab-click="handleClick">
	    <el-tab-pane label="电影剧照"></el-tab-pane>
	    <el-tab-pane label="电影"></el-tab-pane>
	  </el-tabs>
	  <picture-list v-if="tab"></picture-list>
	  <movie-list v-if="!tab"></movie-list>
	</div>
</template>

<script>
import pictureList from '../components/pictureList'
import movieList from '../components/movieList'

export default {
	data () {
		return {
			tab: true
		}
	},
  components: {
    pictureList,
    movieList
  },
  methods: {
    handleClick(tab) {
    	tab = Number(tab)
      if (tab === 1) {
      	this.tab = true
      } else {
      	this.tab = false
      }
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
