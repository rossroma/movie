<template>
  <div class="v-comments">
    <h2>评论</h2>
    <div class="v-coments-list">
      <dl>
        <dt class="color-gray bg-gray-lighter">
          <span class="v-name">rossroma</span>
          2015-12-20 12:35
        </dt>
        <dd><router-link to="/datalist">@爱飞舞的鱼</router-link>有种超现实的感觉~挺棒~</dd>
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
          <el-button @click.native="getData">回应</el-button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      textarea: ''
    }
  }
}
</script>

<style lang="less" scoped>
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
