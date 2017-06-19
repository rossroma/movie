<template>
  <div class="v-answer">
    <h2>{{ movie.title }} <span v-if="movie.title !== movie.original_title">{{ movie.original_title }}</span></h2>
    <div class="v-article">
      <div class="v-main-pic">
        <img :src="movie.thumb" alt="">
        <br>
        <div class="block">
          <span class="demonstration">豆瓣评分</span>
          <el-rate
            v-model="scoreStar"
            disabled
            text-template="{value}">
          </el-rate>
      <span class="v-score">{{movie.rating}}</span>
        </div>
      </div>
      <ul class="v-desc">
        <li><span class="color-gray">导演: </span>{{ movie.directors }}</li>
        <li><span class="color-gray">主演: </span>{{ movie.casts }}</li>
        <li><span class="color-gray">类型: </span>{{ movie.genres }}</li>
        <li><span class="color-gray">地区: </span>{{ movie.countries }}</li>
        <li><span class="color-gray">年代: </span>{{ movie.year }}</li>
        <li><span class="color-gray">别名: </span>{{ movie.aka }}</li>
        <li><span class="color-gray">简介: </span>{{ movie.summary }}</li>
      </ul>
      <div class="v-option">
        <div class="block">
          <span class="demonstration">你觉得容易吗？</span>
          <el-rate
            v-model="hard"
            show-text
            void-color="#999999"
            :texts="['容易', '容易', '一般', '困难', '困难']">
          </el-rate>
        </div>
        <ul class="icon-list">
          <li>
            <span @click="like(1, $event)"><i class="el-icon-star-on"></i>
              <em>Like</em>
            </span>
          </li>
          <li>
            <span @click="like(0, $event)"><i class="el-icon-delete"></i>
              <em>Unlike</em>
            </span>
          </li>
          <li>
            <span @click="postErros(userAnswer)"><i class="el-icon-warning"></i>
              <em>{{isRight ? '有错误' : '采纳我的答案'}}</em>
            </span>
          </li>
        </ul>
        <div class="v-next">
          <el-button @click.native="next()" type="info">下一题 <i class="el-icon-arrow-right el-icon-next"></i></el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import bus from '../bus'
import { Message } from 'element-ui'

export default {
  data () {
    return {
      hard: 0,
      likeMethod: true,
      errorMethod: true,
      rate: {}
    }
  },
  props: ['movie', 'picId', 'userAnswer', 'isRight'],
  computed: {
    scoreStar () {
      return this.movie.rating / 2
    }
  },
  methods: {
    // 下一题
    next () {
      if (this.hard) {
        this.rating()
      }
      this.$emit('get-new')
    },
    // 喜欢
    like (bol, event) {
      if (this.likeMethod) {
        // 添加一个点击动画效果
        event.currentTarget.className = 'like-animate'
        const url = `like/${this.picId}`
        const params = {
          bol: bol
        }
        bus.get(url, params, (data) => {})
        this.likeMethod = false
      }
    },
    // 打开Dialog
    openDialog () {

    },
    // 提交错误
    postErros (val) {
      if (this.errorMethod) {
        const url = `addErrors`
        let params = {
          objectId: this.movie.objectId
        }
        if (!this.isRight) {
          params.answer = val
        }
        bus.get(url, params, (data) => {
          this.message('问题已提交，谢谢你的反馈！', 'success')
        })
        this.errorMethod = false
      }
    },
    // 评级
    rating () {
      const url = `rate/${this.picId}`
      const params = {
        rating: this.hard
      }
      bus.get(url, params, (data) => {})
    },
    // 提示信息
    message (mes, type) {
      Message({
        message: mes,
        type: type
      })
    }
  }
}
</script>

<style lang="less">
  .v-answer{
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 30px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    h2 {
      margin-top: 0;
    }
  }
  .v-article {
    display: flex;
    position: relative;
    height: 100%;
    .v-main-pic {
      width: 160px;
      img {
        display: block;
        width: 100%;
      }
      .block {
      position: relative;
    .el-rate {
      margin-top:5px;
    }
    .v-score {
      font-size: 20px;
      position: absolute;
      right: 5px;
      bottom: -3px;
      color:#ff9900;
    }
    }
    }
    .v-desc {
      padding: 0 30px;
      flex: 1;
      font-size: 14px;
      li{
        padding-bottom: 8px;
        a {
          color: #20a0ff;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .v-option {
      width: 240px;
      .block {
        margin-bottom: 30px;
        margin-left: 24px;
        height: 90px;
        border-bottom: dotted 1px #DEDEDE;
        .el-rate {
          margin-top: 10px;
          .el-rate__icon {
            font-size: 26px;
          }
        }
      }
      .icon-list {
        li{
          float: left;
          width: 33.3%;
          text-align: center;
          font-size: 14px;
          span {
            display: inline-block;
            line-height: normal;
            vertical-align: middle;
            cursor: pointer;
            i {
              font-size: 28px;
              display: block;
              margin-bottom: 10px;
              color: #8492a6;
            }
            em {
              font-style: normal;
              opacity: 0;
              transition: all 0.3s;
            }
            &:hover{
              i {
                color: #555;
              }
              em {
                opacity: 1;
              }
            }
            &.like-animate {
              color: #f00;
              transform: perspective(1px) translateZ(0);
              box-shadow: 0 0 1px transparent;
              animation: clickaction 0.3s;
              transform: scale(1);
              i {
                color: #f00;
              }
            }
          }
        }
      }
      .v-next {
        position: absolute;
        right: 10px;
        bottom: 50px;
      }
    }
  }
  @keyframes clickaction {
    50% {transform: scale(1.2);}
  }
  .errorlist {
    .item {
      padding: 10px;
      color: #222;
      font-weight: 200;
      font-size: 14px;
      cursor: pointer;
      &:first-child {
        border-bottom: 1px solid #eaeefb;
      }
      &:hover {
        color: #20a0ff;
      }
    }
  }
</style>
