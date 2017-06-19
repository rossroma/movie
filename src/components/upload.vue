<template>
  <div class="v-upload">
    <el-button class="v-up" type="text" @click.native="dialogVisible=true">上传剧照</el-button>
    <el-dialog v-model="dialogVisible" size="full">
      <h1>上传我的剧照</h1>
      <div class="wrap">
        <div class="v-tips">
          <h3>上传小贴士：</h3>
          <ul>
            <li>① 尽量使用本地图片上传，因为个别网站（如豆瓣）有图片防盗链功能，会导致图片上传失败；</li>
            <li>② 图片宽度要大于等于1000px，尽量选择横版剧照，不要上传竖版的剧照，只能上传jpg/png文件，且不超过600kb。</li>
            <li>③ 剧照中不要有水印、电影名称、字幕和上下黑边，这会影响界面的美观度；</li>
            <li>④ 图片上传后，如有缩略图显示则证明剧照上传成功，然后在右侧输入电影标题，在下拉列表中选择与之匹配的电影；</li>
            <li>⑤ 检查电影剧照与电影信息，确认无误后点击提交按钮，剧照上传成功！</li>
          </ul>
        </div>
        <el-tabs type="card" @tab-click="handleClick">
          <el-tab-pane name="local" label="本地图片上传"></el-tab-pane>
          <el-tab-pane name="online" label="在线图片上传"></el-tab-pane>
        </el-tabs>
         <el-row :gutter="20">
          <el-col :span="12">
            <el-upload
              v-if="tab"
              :action="uploadPath"
              type="drag"
              :thumbnail-mode="true"
              :on-success="handleSuccess"
              :on-error="handleError">
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
            <div v-if="!tab">
              <el-input placeholder="输入图片的URL" style="width: 400px;" v-model="upimg">
                <el-button slot="append" @click.native="onlineImg">上传</el-button>
              </el-input>
              <img v-if="upimgResult" class="v-img-result" :src="upimgResult" alt="">
            </div>
          </el-col>
          <el-col :span="12">
            <el-input placeholder="请输入电影标题" v-model.lazy="filmName">
            </el-input>
            <div class="v-result" v-if="search.length">
              <ul>
                <li v-for="item in search" @click="getFilmData(item.url)">
                  <div class="v-thumb">
                    <img :src="item.img" alt="">
                  </div>
                  <div class="v-con">
                    <p>{{item.title}} <span>{{item.year}}</span></p>
                    <span>{{item.sub_title}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
        <br><br>
        <div v-loading="loading" v-if="loading" class="el-loading-demo"></div>
        <el-row :gutter="20" v-if="searchResult">
          <el-col :span="6">
            <img class="v-img" :src="filmInfos.images.large" alt="">
          </el-col>
          <el-col class="v-sercon" :span="18">
            <el-row :gutter="20">
              <el-col :span="2">标题:</el-col>
              <el-col :span="22">{{filmInfos.title}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="2">评分:</el-col>
              <el-col :span="22">{{filmInfos.rating.average}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="2">导演:</el-col>
              <el-col :span="22">
                <span v-for="i in filmInfos.directors">
                  {{i.name}}&nbsp;&nbsp;
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">主演:</el-col>
              <el-col :span="22">
                <span v-for="i in filmInfos.casts">
                  {{i.name}}&nbsp;&nbsp;
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">类型:</el-col>
              <el-col :span="22">
                <span v-for="i in filmInfos.genres">
                  {{i}}&nbsp;&nbsp;
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">年代:</el-col>
              <el-col :span="22">{{filmInfos.year}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="2">地区:</el-col>
              <el-col :span="22">
                <span v-for="i in filmInfos.countries">
                  {{i}}&nbsp;&nbsp;
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">又名:</el-col>
              <el-col :span="22">
                <span v-for="i in filmInfos.aka">
                  {{i}}&nbsp;&nbsp;
                </span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="2">简介:</el-col>
              <el-col :span="22">{{filmInfos.summary}}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="large" v-if="upButton" @click.native="submitInfos">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import bus from '../bus'
import { Message } from 'element-ui'

function arrToStr (arr) {
  let result = ''
  for (let i in arr) {
    if (typeof (arr[i]) === 'object') {
      result += arr[i].name + ' / '
    } else {
      result += arr[i] + ' / '
    }
  }
  return result.slice(0, -2)
}

export default {
  data () {
    return {
      dialogVisible: false,
      filmName: '',
      search: [],
      loading: false,
      searchResult: false,
      filmInfos: {},
      upimg: '',
      upimgResult: '',
      objectid: '',
      tab: true,
      uploadPath: bus.path + 'upimg'
    }
  },
  methods: {
    handleSuccess (response, file) {
      this.upimgResult = response
      console.log(response)
    },
    handleError (err) {
      this.message('上传错误，请重新尝试！', 'error')
      console.log(err)
    },
    // 选项卡
    handleClick (val) {
      if (val.name === 'local') {
        this.tab = true
      } else {
        this.tab = false
      }
    },
    CheckImgExists (imgurl) {
      const ImgObj = new window.Image() // 判断图片是否存在
      ImgObj.src = imgurl
      return new Promise((resolve, reject) => {
        ImgObj.onload = () => {
          resolve(true)
        }
        ImgObj.onerror = () => {
          resolve(false)
        }
      })
    },
    // 上传线上图片
    onlineImg () {
      this.CheckImgExists(this.upimg).then((bol) => {
        if (bol) {
          const url = `upimgUrl`
          const params = {
            pic: this.upimg
          }
          bus.get(url, params, (data) => {
            this.upimgResult = data.path + data.name
          })
        } else {
          this.message('图片地址有误，请检查后重新上传', 'warning')
        }
      }, (error) => {
        this.message(error, 'error')
      })
    },
    // 获取电影
    getFilmData (path) {
      this.search.length = 0
      this.searchResult = false
      this.loading = true
      // 通过url获取电影id
      const id = path.match(/[0-9]{7,8}/)
      const url = `getFilm`
      const url2 = `exist`
      const params = {
        id: id[0]
      }
      bus.get(url, params, (data) => {
        this.filmInfos = data
        this.loading = false
        this.searchResult = true
      })
      // 检索电影是否已存入数据库
      bus.get(url2, params, (data) => {
        if (data.results.length) {
          this.objectid = data.results[0].objectId
        } else {
          this.objectid = ''
        }
      })
    },
    // 提交数据
    submitInfos () {
      if (this.objectid) {
        const url = `addPicture`
        const body = { movie: { __type: 'Pointer', className: 'movie', objectId: this.objectid }, images: this.upimgResult, rating: { average: 0, stars: 0, total: 0 }, status: 2 }
        bus.post(url, body, (data) => {
          this.upSuccess()
        })
      } else {
        const url = `addMovie`
        const body = {
          movie: {
            id: this.filmInfos.id,
            title: this.filmInfos.title,
            thumb: this.filmInfos.images.large,
            original_title: this.filmInfos.original_title,
            rating: this.filmInfos.rating.average,
            year: this.filmInfos.year,
            countries: arrToStr(this.filmInfos.countries),
            genres: arrToStr(this.filmInfos.genres),
            directors: arrToStr(this.filmInfos.directors),
            casts: arrToStr(this.filmInfos.casts),
            aka: arrToStr(this.filmInfos.aka),
            summary: this.filmInfos.summary,
            status: 0
          },
          picture: this.upimgResult
        }
        bus.post(url, body, (data) => {
          this.upSuccess()
        })
      }
    },
    // 上传成功
    upSuccess () {
      this.message('上传成功', 'success')
      this.filmName = ''
      this.upimgResult = ''
      this.searchResult = false
      this.upimg = ''
    },
    // 提示信息
    message (mes, type) {
      Message({
        message: mes,
        type: type
      })
    }
  },
  watch: {
    filmName (val) {
      if (val) {
        const url = `search`
        const params = {
          keyword: val
        }
        bus.get(url, params, (data) => {
          this.search = data
        })
      } else {
        this.search.length = 0
      }
    }
  },
  computed: {
    upButton () {
      if (this.upimgResult && this.searchResult) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .v-uparea{
    padding: 6px;
    width: 250px;
    font-weight: bold;
    border: 2px dashed #20a0ff;
    border-radius: 5px;
    text-align: center;
    font-size: 16px;
    color: #555;
    opacity: 0.8;
    cursor: pointer;
    &:hover{
      opacity: 1;
      border-color: #0095FF;
      background-color: #f5f5f5;
    }
  }
  .el-loading-demo {
    width: 100%;
    height: 40px;
    border-radius: 15px;
    overflow: hidden;
  }
  .v-img {
    display: block;
    width: 100%;
  }
  .v-img-result {
    display: block;
    width: 20%;
    margin-top: 10px;
  }
  .v-up {
    position: fixed;
    right: -40px;
    top: 30px;
    padding: 8px 60px;
    background-color: #FF678D;
    color: #fff;
    font-family: 'microsoft yahei';
    transform: rotate(45deg);
    box-shadow: #999 0 1px 3px;
    &:hover{
      color: #fff;
      box-shadow: #FF4D7C 0px 0px 6px;
    }
  }
  .v-tips {
    border: 1px solid #dedede;
    border-radius: 5px;
    padding: 0 20px 18px;
    margin-bottom: 10px;
  }
  .v-sercon{
    .el-row{
      margin-bottom: 10px;
      .el-col-2{
        color: #888;
      }
    }
  }
  .v-result {
    position: relative;
    margin-top: 5px;
    z-index: 999;
    ul {
      position: absolute;
      background-color: #fff;
      width: 100%;
      left: 0;
      top: 0;
      border: 1px solid #d3dce6;
      border-radius: 2px;
      box-shadow: 0 0 6px 0 rgba(0,0,0,.04),0 2px 4px 0 rgba(0,0,0,.12);
      li {
        display: flex;
        padding: 8px;
        border-top: #dedede dotted 1px;
        .v-thumb {
          width: 40px;
          img {
            width: 100%;
            display: block;
          }
        }
        .v-con {
          flex: 1;
          padding-left: 10px;
          p {
            margin: 0 auto 10px;
          }
          span {
            font-size: 12px;
            color: #999;
          }
        }
        &:hover {
          background-color: #f2f2f2;
        }
        &:first-child {
          border-top-width: 0;
        }
      }
    }
  }
  .dialog-footer{
    text-align: center;
  }
</style>
