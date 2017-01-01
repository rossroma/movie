<template>
  <ul class="v-gamelog">
    <li>
      累计猜对：<strong>{{userinfo.right || 0}}</strong>
    </li>
    <li>
      累计猜错：<strong>{{userinfo.wrong || 0}}</strong>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['userinfo']
}
</script>

<style lang="less" scoped>
  .v-gamelog {
    text-align: center;
    li {
      display: inline-block;
      font-size: 20px;
      margin: 0 50px;
      color: #666;
      strong {
        margin-left: 10px;
        font-size: 30px;
        color: #FF4949;
      }
    }
  }
</style>
