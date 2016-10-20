<template>
	<div class="wrap">
		<h1>猜电影</h1>
		<screen></screen>
		<answer></answer>
		<br>
		<br>
		<comments></comments>
		<upload></upload>		
	</div>
</template>

<script>
import screen from './components/screen'
import answer from './components/answer'
import comments from './components/comments'
import upload from './components/upload'

export default {
  name: 'app',
  components: {
    screen,
    answer,
    comments,
    upload
  }
}
</script>

<style lang="less">
	body {
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	}
	h1, h2 {
	  font-weight: normal;
	}
	h1 {
		text-align: center;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	dd {
		margin-left: 0;
	}
	.wrap {
	  width: 1000px;
	  margin: 0 auto;
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

</style>