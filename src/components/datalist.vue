<template>
  <div class="v-datalist">
    数据列表2
  </div>
</template>
<script>
import bmob form '../bmob/bmob-min.js'

export default {
  data () {
    return {
      filmName: ''
    }
  },
  mounted: function () {
    console.log(1)
    Bmob.initialize("897d8343de907640340fa6b06684b181", "8a3d04621f341624f41a5db35d688abd")
    let MovieObject = Bmob.Object.extend("movie")
    let query = new Bmob.Query(MovieObject)
    //查询所有数据
    query.find({
      success: function (results) {
        cosole.log("共查询到 " + results.length + "条记录")
        var datalist = []
        //循环处理查询到的数据
        for (let i = 0; i < results.length; i++) {
          datalist.push(results[i])
        }
        console.log(datalist)
      },
      error: function (error) {
        alert("查询失败：" + error.code + " " + error.message)
      }
    })
  }
}
</script>

<style lang="less" scoped>
</style>
