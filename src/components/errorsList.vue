<template>
  <div class="errors-list">
    <el-table
      v-loading.body="loading"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleMultipleSelectionChange">
      <el-table-column
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        inline-template
        width="100"
        label="缩略图">
        <a target="_blank"><img height="40" :src="row.movie.thumb"></a>
      </el-table-column>
      <el-table-column
        inline-template
        label="电影"
        width="220">
        <span>{{ row.movie.title }}</span>
      </el-table-column>
      <el-table-column
        inline-template
        label="待审标题"
        width="200">
        <span>{{ row.userAnswer }}</span>
      </el-table-column>
      <el-table-column
        property="createdAt"
        sortable
        label="日期"
        width="200">
      </el-table-column>
      <el-table-column
        inline-template
        label="操作">
        <div>
          <a href="javascript:;" @click="delItem( row.objectId )">删除</a>
          <a href="javascript:;" @click="delItem( row.objectId, 2, row.movie.objectId, row.userAnswer )">审核</a>
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
// status 0 删除 1 待审核 2 已审核

import bus from '../bus'
import { Message } from 'element-ui'

export default {
  mounted () {
    this.getErrorsList()
  },
  data () {
    return {
      tableData: [],
      multipleSelection: [],
      totalPages: 0,
      page: 0,
      loading: true
    }
  },
  methods: {
    // 获取答案评审列表
    getErrorsList () {
      const url = `errors`
      const params = {
        page: this.page,
        status: 1
      }
      bus.get(url, params, (data) => {
        this.loading = false
        this.tableData = data.results
        this.totalPages = data.count
      })
    },
    // 删除
    delItem (objectId, status, movieId, answer) {
      if (status !== 2) {
        status = 0
      }
      const url = `delAnswers/${objectId}`
      const params = {
        status: status,
        movieId: movieId,
        userAnswer: answer
      }
      bus.get(url, params, (data) => {
        this.message('操作成功', 'success')
        this.getErrorsList()
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
      this.getErrorsList()
    }
  }
}
</script>