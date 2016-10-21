<template>
	<router-view>
		<home></home>
	</router-view>
</template>

<script>
import home from './page/home'

export default {
  name: 'app',
  components: {
    home
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

</style>