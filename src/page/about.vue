<template>
	<div class="wrap">
		<h1>更新日志</h1>
		<h2>未来</h2>
		<ul>
			<li>增加上传进度条</li>
			<li>拖拽上传</li>
			<li>点击提交后，再上传图片</li>
			<li>增加用户，登录、注册、管理、答题记录、上传记录</li>
		</ul>
		<h2>2016-11-10</h2>
		<ul>
			<li>删掉了多余的组件</li>
			<li>将Vue-router替换为更简单的路由</li>
			<li>element-ui 更新到1.0稳定版</li>
			<li>引入babel-plugin-component，按需引入element组建，打包后的体积减少了300多kb</li>
			<li>新增 about 页面</li>
		</ul>
		<h2>2016-11-09</h2>
		<ul>
			<li>增加了跳过功能</li>
			<li>完善了答案判断机制</li>
			<li>默认读取压缩后的图片</li>
		</ul>
		<h2>2016-11-08</h2>
		<ul>
			<li>新增了剧照审核功能，新上传的剧照必须过审才能显示到首页</li>
			<li>新增了非图片（包含防盗链图片）过滤功能</li>
			<li>新增了答案判断机制</li>
		</ul>
		<h2>2016-11-07</h2>
		<ul>
			<li>部署到到服务器，正式上线</li>
			<li>修复了上传按钮的显示问题，并将其改名为“提交”</li>
			<li>新增了上传小提示</li>
		</ul>
		<h1>意见反馈</h1>
		<p>有任何意见或建议，欢迎反馈到：<a href="mailto:rossromay@gmail.com">rossromay@gmail.com</a>，或到github提交issues：<a href="https://github.com/rossroma/movie/issues">Movie</a></p>
	</div>
</template>


<style lang="less">
body {
	font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
.wrap {
  width: 1000px;
  margin: 0 auto;
}
</style>