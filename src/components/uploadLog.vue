<template>
  <div class="v-gamelog">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        inline-template
        width="100"
        label="剧照">
        <img height="40" :src="row.images+'-guessmovie'" alt="">
      </el-table-column>
      <el-table-column
        inline-template
        label="电影"
        width="240">
        <span>{{ row.movie.objectId }}</span>
      </el-table-column>
      <el-table-column
        inline-template
        label="难度"
        width="100">
        <span>{{ row.rating.average }}</span>
      </el-table-column>
      <el-table-column
        property="createdAt"
        sortable
        label="日期"
        width="240">
      </el-table-column>
      <el-table-column
        inline-template
        label="状态">
        <div>
          {{ row.status | statusText }}
        </div>
      </el-table-column>
    </el-table>
    <div class="block mt10">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-size="15"
        layout="total, prev, pager, next"
        :total="totalPages">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import bus from '../bus'

export default {
  mounted () {
    this.getPictureList()
  },
  props: ['userinfo'],
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      totalPages: 0,
      page: 0,
      message: ''
    }
  },
  methods: {
    // 获取剧照列表
    getPictureList () {
      this.$http.get(bus._val.path + 'picture?page=' + this.page + '&status=0&user=' + this.userinfo.objectId)
          .then(function (response) {
            if (response.status === 200) {
              let data = response.body
              this.tableData = data.results
              this.totalPages = data.count
            } else {
              console.log(response.status)
            }
          })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.page = (val - 1) * 15
      this.getPictureList()
    }
  },
  filters: {
    statusText (val) {
      if (val === 0) {
        return '已审核'
      } else if (val === 2) {
        return '待审核'
      } else {
        return '被拒绝'
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
