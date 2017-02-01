<template>
  <div class="picture-list">
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
        label="剧照">
        <a :href="row.images+'-large'" target="_blank"><img height="40" :src="row.images+'-guessmovie'"></a>
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
    this.getPictureList()
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
  props: ['images'],
  methods: {
    // 获取剧照列表
    getPictureList () {
      const url = `picture`
      const params = {
        page: this.page,
        status: 0
      }
      bus.get(url, params, (data) => {
        this.loading = false
        this.tableData = data.results
        this.totalPages = data.count
      })
    },
    // 删除
    delItem (objectId) {
      const url = `delPicture/${objectId}`
      const params = {
        status: 1
      }
      bus.get(url, params, (data) => {
        this.message('删除成功', 'success')
        this.getPictureList()
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
      console.log('message')
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
      this.getPictureList()
    }
  }
}
</script>


