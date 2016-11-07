<template>
  <div class="picture-list">
    <el-table
      :data="tableData"
      selection-mode="multiple"
      style="width: 100%"
      @selectionchange="handleMultipleSelectionChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
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
        label="操作">
        <div>
          <a href="javascript:;" @click="delItem( row.objectId )">删除</a>
        </div>
      </el-table-column>
    </el-table>
    <div class="block mt10">
      <el-button size="small"><span @click="delItems()">批量删除</span></el-button>
      <el-pagination
        @sizechange="handleSizeChange"
        @currentchange="handleCurrentChange"
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
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      totalPages: 0,
      page: 0,
      message: ''
    }
  },
  props: ['images'],
  methods: {
    // 获取电影列表
    getPictureList () {
      this.$http.get(bus._val.path + 'picture?page=' + this.page)
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
    // 删除
    delItem (objectId) {
      this.$http.get(bus._val.path + 'delPicture/' + objectId)
          .then(function (response) {
            if (response.status === 200) {
              this.message('删除成功','success')
              this.getPictureList()
            } else {
              console.log(response.status)
            }
          })
    },
    delItems () {
      var arrId = ''
      if (this.multipleSelection.length) {
        for (let id in this.multipleSelection) {
          arrId += this.multipleSelection[id].objectId + ','
        }
        this.delItem(arrId.slice(0, -1))
      } else {
        this.message('未选中任何数据','warning')
      }
    },
    message (mes, type) {
      this.$message({
        message: mes,
        type: type
      })
    },
    handleMultipleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.page = (val-1)*15
      this.getPictureList ()
    },
  }
}
</script>


