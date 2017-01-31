<template>
  <div class="picture-list">
    <el-table
      :data="tableData"
      style="width: 100%"
      @selection-change="handleMultipleSelectionChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        inline-template
        width="80"
        label="缩略图">
        <img height="40" :src="row.thumb" alt="">
      </el-table-column>
      <el-table-column
        property="title"
        label="标题"
        width="240">
      </el-table-column>
      <el-table-column
        property="year"
        sortable
        label="年代"
        width="80">
      </el-table-column>
      <el-table-column
        property="countries"
        label="地区"
        width="160">
      </el-table-column>
      <el-table-column
        property="rating"
        sortable
        label="评分"
        width="80">
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
import { Message } from 'element-ui'

export default {
  mounted () {
    this.getMovieList()
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
    getMovieList () {
      const url = `movie`
      const params = {
        page: this.page
      }
      bus.get(url, params, (data) => {
        this.tableData = data.results
        this.totalPages = data.count
      })
    },
    // 删除
    delItem (objectId) {
      const url = `delMovie/${objectId}`
      bus.get(url, {}, (data) => {
        this.message('删除成功', 'success')
        this.getMovieList()
      })
    },
    delItems () {
      let arrId = ''
      if (this.multipleSelection.length) {
        for (let id in this.multipleSelection) {
          arrId += this.multipleSelection[id].objectId + ','
        }
        this.delItem(arrId.slice(0, -1))
      } else {
        this.message('未选中任何数据', 'warning')
      }
    },
    message (mes, type) {
      Message({
        message: mes,
        type: type
      })
    },
    handleMultipleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      this.page = (val - 1) * 15
      this.getMovieList()
    }
  }
}
</script>


