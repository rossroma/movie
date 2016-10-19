<template>
	<div class="wrap">
		<h1>猜电影</h1>
		<screen></screen>
		<answer></answer>
		<br>
		<br>
		<div class="v-comments">
			<h2>评论</h2>
			<div class="v-coments-list">
				<dl>
					<dt class="color-gray bg-gray-lighter">
						<span class="v-name">rossroma</span>
						2015-12-20 12:35
					</dt>
					<dd><a>@爱飞舞的鱼</a>有种超现实的感觉~挺棒~</dd>
					<dd class="v-review color-gray hide"><a>回应</a></dd>
				</dl>
				<dl>
					<dt class="color-gray bg-gray-lighter">
						<span class="v-name">爱飞舞的鱼</span>
						2015-12-20 12:35
					</dt>
					<dd>有种超现实的感觉~挺棒~</dd>
					<dd class="v-review color-gray"><a>回应</a></dd>
				</dl>

				<div class="v-comments-box">
					<div class="v-title">你的回应</div>
					<el-input
					  type="textarea"
					  :autosize="{minRows: 3, maxRows: 5}"
					  v-model="textarea">
					</el-input>
					<div class="v-text-right">
						<el-button>回应</el-button>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import screen from './components/screen'
import answer from './components/answer'
import { Button, Input } from 'element-ui'

export default {
  name: 'app',
  data () {
    return {
      textarea: ''
    }
  },
  components: {
    screen,
    answer,
    'el-button': Button,
    'el-input': Input
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
	.v-coments-list{
		dl {
			padding-bottom: 30px;
			position: relative;
			font-size: 14px;
			dt {
				padding: 4px 10px;
				text-align: right;
				margin-bottom: 10px;
				overflow: hidden;
				span {
					float: left;
				}
			}
			dd {
				a {
					color: #20a0ff;
				}
				&.v-review{
					position: absolute;
					right: 10px;
					bottom: 10px;
					padding: 0 4px;
					display: none;
					cursor: pointer;
				}
			}
			&:hover {
				.v-review {
					display: block;
				}
			}
		}
	}
	.v-comments-box {
		padding-bottom: 30px;
		.v-title {
			margin-bottom: 10px;
		}
		.v-text-right {
			margin-top: 10px;
		}
	}
</style>