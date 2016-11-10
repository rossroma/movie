<template>
  <div class="v-upload">
    <el-button class="v-up" type="text" @click.native="dialogVisible = true">上传剧照</el-button>

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
            <form v-if="tab" enctype="multipart/form-data" method="post" name="fileinfo">
              <input type="file" style="display:none;" name="file" @change="upLocalImg" required />
              <div class="v-uparea" @click="triggerFile">点击选择图片</div>
            </form>
            <div v-if="!tab">
              <el-input placeholder="输入图片的URL" style="width: 400px;" v-model.trim="upimg">
                <el-button slot="append" @click.native="onlineImg">上传</el-button>
              </el-input>              
            </div>
            <img v-if="upimgResult" class="v-img-result" :src="upimgResult" alt="">
          </el-col>
          <el-col :span="12">
            <el-input placeholder="请输入电影标题" v-model="filmName">
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
      objectid:'',
      tab: true
    }
  },
  methods: {
    // 选项卡
    handleClick(val) {
      if (val.name === 'local') {
        this.tab = true
      } else {
        this.tab = false
      }
    },
    //出发上传控件
    triggerFile () {
      var objFile = document.forms.namedItem("fileinfo").file
      objFile.click()
    },
    // 上传本地图片
    upLocalImg () {
      var form = document.forms.namedItem("fileinfo")
      var file_url = new RegExp(form.file.value.slice(-4),"i")
      var imgTypes = '.jpg,.jpeg,.png'
      if (file_url.test(imgTypes)) {
        var oData = new FormData(form)
        var oReq = new XMLHttpRequest()
        oReq.open("POST", bus._val.path + "upimg", true)
        var self = this
        oReq.onload = function(oEvent) {
          if (oReq.status == 200) {
            self.upimgResult = oReq.responseText
          } else {
            console.log(oReq)
          }
        }
        oReq.send(oData)
      } else {
        this.message('请上传正确的图片格式','warning')
      }
    },
    CheckImgExists (imgurl) {  
      var ImgObj = new Image() //判断图片是否存在  
      ImgObj.src = imgurl  
      //没有图片，则返回-1  
      if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {  
        return true  
      } else {  
        return false
      }  
    },
    // 上传线上图片
    onlineImg () {
      if (this.upimg && this.CheckImgExists(this.upimg)) {
        this.$http.get(bus._val.path + 'upimgUrl?pic=' + this.upimg)
            .then(function (response) {
              if (response.status === 200) {  
                this.upimgResult = response.body.path + response.body.name                
              } else {
                console.log(response.status)
              }
            })
      } else {
        this.message('图片地址有误，请检查后重新上传','warning')
      }
    },
    //获取电影
    getFilmData (url) {
      this.search.length = 0
      this.searchResult = false
      this.loading = true
      // 通过url获取电影id
      var id = url.match(/[0-9]{7,8}/)
      this.$http.get(bus._val.path + 'getFilm?id=' + id[0])
          .then(function (response) {
            if (response.status === 200) {
              this.filmInfos = response.body
              this.loading = false
              this.searchResult = true
            } else {
              console.log(response.status)
            }
          })
      // 检索电影是否已存入数据库
      this.$http.get(bus._val.path + 'exist?id=' + id[0])
          .then(function (response) {
            if (response.status === 200) {
              var data = response.body
              if (data.results.length) {
                this.objectid = data.results[0].objectId
              } else {
                this.objectid = ''
              }
            } else {
              console.log(response.status)
            }
          })
    },
    // 提交数据
    submitInfos () {
      if (this.objectid) {
        var picBody = {movie:{__type:"Pointer",className:"movie",objectId:this.objectid},images:this.upimgResult,rating:{average:0,stars:0,total:0},status:2}
        this.$http.post(bus._val.path + 'addPicture', picBody)
            .then(function (response) {
              if (response.status === 200) {
                this.upSuccess()
                console.log('已存在：'+response.body)
              } else {
                console.log(response.status)
              }
            })
      } else {
        function arrToStr(arr) {
          var result = ''
          for (let i in arr) {
            if (typeof(arr[i]) === 'object') {
              result += arr[i].name+' / '
            } else {
              result += arr[i]+' / '
            }
          }
          return result.slice(0,-2)
        }
        var body = {
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
            summary: this.filmInfos.summary.slice(0,160),
            status: 0
          },
          picture: this.upimgResult
        }
        this.$http.post(bus._val.path + 'addMovie', body)
            .then(function (response) {
              if (response.status === 200) {
                this.upSuccess()
                console.log(response.body)
              } else {
                console.log(response.status)
              }
            })
      }
    },
    // 上传成功
    upSuccess () {
      this.message('上传成功','success')
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
    filmName: function (val) {
      if (val) {
        this.$http.get(bus._val.path + 'search?keyword=' + val)
            .then(function (response) {
              if (response.status === 200) {
                this.search = response.body
              } else {
                console.log(response.status)
              }
            })
          } else {
            this.search.length = 0
          }
    }
  },
  computed: {
    upButton: function () {
      if ( this.upimgResult && this.searchResult) {
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
