<template>
  <div class="v-answer">
    <h2>兰戈 Rango</h2>
    <div class="v-article">
      <div class="v-main-pic">
        <img src="../assets/main-pic.jpg" alt="">
        <br>
        <div class="block">
          <span class="demonstration">豆瓣评分</span>
          <el-rate
            v-model="scoreStar"
            disabled
            text-template="{value}">
          </el-rate>
		  <span class="v-score">{{score}}</span>
        </div>
      </div>
      <ul class="v-desc">
        <li><span class="color-gray">导演: </span>戈尔·维宾斯基</li>
        <li><span class="color-gray">主演: </span> 约翰尼·德普 / 艾拉·菲舍尔 / 阿比盖尔·布蕾斯琳</li>
        <li><span class="color-gray">类型: </span> 喜剧 / 动作 / 动画 / 家庭 / 西部 / 冒险</li>
        <li><span class="color-gray">地区: </span>美国</li>
        <li><span class="color-gray">语言: </span>英语</li>
        <li><span class="color-gray">上映日期: </span>2011-03-04(美国)</li>
        <li><span class="color-gray">别名: </span>飙风雷哥(台) / 马拉高(港) / 荒漠大冒险 / 雷人哥 / 宠物大冒险 / 里戈 / 兰格</li>
        <li><span class="color-gray">IMDB链接: </span><a href="" target="_blank">tt1192628</a></li>
      </ul>
      <div class="v-option">
        <div class="block">
          <span class="demonstration">你觉得容易吗？</span>
          <el-rate
		    v-model="hard"
			show-text
			:texts="['容易', '容易', '一般', '困难', '困难']">
		  </el-rate>
        </div>
        <ul class="icon-list">
          <li>
            <span><i class="el-icon-yduihao"></i>
              <em>Like</em>
            </span>
          </li>
          <li>
            <span><i class="el-icon-yduihuai"></i>
              <em>Unlike</em>
            </span>
          </li>
          <li>
            <span><i class="el-icon-yduiwenhao"></i>
              <em>反馈</em>
            </span>
          </li>
        </ul>
        <div class="v-next">
          <el-button type="info">下一题<i class="el-icon-arrow-right el-icon-right"></i></el-button>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Rate } from 'element-ui'

export default {
  data () {
    return {
      maxNumber: 5,
      score: 7.2,
      hard: 4.2
    }
  },
  computed: {
    scoreStar: function () {
      return this.score / 2
    }
  },
  components: {
    'el-button': Button,
    'el-rate': Rate
  }
}
</script>

<style lang="less">
  .v-answer{
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 30px;
    box-sizing: border-box;
    height: 562px;
    background-color: rgba(255, 255, 255, 0.8);
    position: absolute;
    width: 1000px;
    top: 85px;
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
              font-size: 26px;
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
</style>
