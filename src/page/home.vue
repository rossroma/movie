<template>
	<div class="wrap">
		<h1>猜电影</h1>
		<screen :images="newImg" :rightAnswer="currentFilm.movie" :answerText="!answerShow"></screen>
		<answer v-if="answerShow" :iHeight="imgHeight" :movie="currentFilm.movie" :picId="currentFilm.objectId"></answer>
		<br>
		<br>
		<upload></upload>		
	</div>
</template>

<script>
import screen from '../components/screen'
import answer from '../components/answer'
import comments from '../components/comments'
import upload from '../components/upload'
import bus from '../bus'

export default {
	created: function () {
	  bus.$on('get-new', this.getNewFilm),
	  bus.$on('answer-show', this.showAnswer)
	  bus.$on('screen-height', this.resetHeight)
	},
	beforeDestroy: function () {
	  bus.$off('get-new', this.getNewFilm),
	  bus.$off('answer-show', this.showAnswer)
	  bus.$off('screen-height', this.resetHeight)
	},
  mounted () {
  	this.getCount()
  },
  data () {
    return {
      currentFilm: {},
      answerShow: false,
      imgHeight: 0
    }
  },
  components: {
    screen,
    answer,
    comments,
    upload
  },
  methods: {
  	// 获取剧照总数
  	getCount () {
	    this.$http.get(bus._val.path + 'getCount')
	        .then(function (response) {
	          if (response.status === 200) {
	          	this.getNewFilm(response.body.count)
	          } else {
	            console.log(response.status)
	          }
	        })
  	},
  	// 随机获取一部电影
  	getNewFilm ( count ) {
  		bus.$emit('loading', true)
	    this.$http.get(bus._val.path + 'rd-pic?count=' + count)
	        .then(function (response) {
	          if (response.status === 200) {
	            this.currentFilm = response.body.results[0]
	          } else {
	            console.log(response.status)
	          }
	        })
  	},
  	// 控制答案是否显示
  	showAnswer (bol) {
  		if (bol) {
  			this.answerShow = true
  		} else {
  			this.answerShow = false
  		}
  	},
    //重置answer页面高度
    resetHeight (h) {
      this.imgHeight = h
    }
  },
  computed: {
  	newImg: function () {
  		return this.currentFilm.images + '-large'
  	}
  }
}
</script>

<style lang="less">
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
	.el-table {
		a{
			color: #20a0ff;
		}
	}
</style>