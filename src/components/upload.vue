<template>
  <div class="v-upload">
    <el-button type="text" @click.native="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog v-model="dialogVisible" size="full">
      <h1>上传我的剧照</h1>
      <div class="wrap">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-upload
              action="http://jsonplaceholder.typicode.com/"
              type="drag"
              :thumbnail-mode="true"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-upload"></i>
              <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-col>
          <el-col :span="12">
            <el-input placeholder="请输入内容" v-model="filmName">
            </el-input>
            <div class="v-result">
              <ul>
                <li>
                  <div class="v-thumb">
                    <img :src="form.images.small" alt="">
                  </div>
                  <div class="v-con">
                    <p>兰戈 <span>2011</span></p>
                    <span>Rango</span>
                  </div>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" v-if="!searchResult">
          <el-col :span="6">
            <img class="v-img" :src="form.images.large" alt="">
          </el-col>
          <el-col :span="18">
            <el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit">
              <el-form-item label="电影标题">
                <el-input v-model="filmTitel"></el-input>
              </el-form-item>
              <el-form-item label="导演">
                <el-input v-model="filmDirectors"></el-input>
              </el-form-item>
              <el-form-item label="主演">
                <el-input v-model="filmCasts"></el-input>
              </el-form-item>
              <el-form-item label="类型">
                <el-input v-model="form.genres"></el-input>
              </el-form-item>
              <el-form-item label="年代">
                <el-input v-model="form.year"></el-input>
              </el-form-item>
              <el-form-item label="地区">
                <el-input v-model="form.countries"></el-input>
              </el-form-item>
              <el-form-item label="又名">
                <el-input v-model="filmAka"></el-input>
              </el-form-item>
              <el-form-item label="简介">
                <el-input type="textarea" v-model="form.summary"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>


      <span slot="footer" class="dialog-footer">
        <el-button @click.native="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
let formData = {
  'rating': {
    'max': 10,
    'average': 7.8,
    'stars': '40',
    'min': 0
  },
  'reviews_count': 220,
  'wish_count': 23622,
  'douban_site': '',
  'year': '2011',
  'images': {
    'small': 'https://img3.doubanio.com/view/movie_poster_cover/ipst/public/p1000880652.jpg',
    'large': 'https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p1000880652.jpg',
    'medium': 'https://img3.doubanio.com/view/movie_poster_cover/spst/public/p1000880652.jpg'
  },
  'alt': 'https://movie.douban.com/subject/2998253/',
  'id': '2998253',
  'mobile_url': 'https://movie.douban.com/subject/2998253/mobile',
  'title': '兰戈',
  'do_count': null,
  'share_url': 'https://m.douban.com/movie/subject/2998253',
  'seasons_count': null,
  'schedule_url': '',
  'episodes_count': null,
  'countries': [
    '美国'
  ],
  'genres': [
    '喜剧',
    '动作',
    '动画'
  ],
  'collect_count': 95671,
  'casts': [
    {
      'alt': 'https://movie.douban.com/celebrity/1054456/',
      'avatars': {
        'small': 'https://img3.doubanio.com/img/celebrity/small/562.jpg',
        'large': 'https://img3.doubanio.com/img/celebrity/large/562.jpg',
        'medium': 'https://img3.doubanio.com/img/celebrity/medium/562.jpg'
      },
      'name': '约翰尼·德普',
      'id': '1054456'
    },
    {
      'alt': 'https://movie.douban.com/celebrity/1041001/',
      'avatars': {
        'small': 'https://img1.doubanio.com/img/celebrity/small/437.jpg',
        'large': 'https://img1.doubanio.com/img/celebrity/large/437.jpg',
        'medium': 'https://img1.doubanio.com/img/celebrity/medium/437.jpg'
      },
      'name': '艾拉·菲舍尔',
      'id': '1041001'
    },
    {
      'alt': 'https://movie.douban.com/celebrity/1025142/',
      'avatars': {
        'small': 'https://img3.doubanio.com/img/celebrity/small/75.jpg',
        'large': 'https://img3.doubanio.com/img/celebrity/large/75.jpg',
        'medium': 'https://img3.doubanio.com/img/celebrity/medium/75.jpg'
      },
      'name': '阿比盖尔·布蕾斯琳',
      'id': '1025142'
    },
    {
      'alt': 'https://movie.douban.com/celebrity/1010558/',
      'avatars': {
        'small': 'https://img3.doubanio.com/img/celebrity/small/23553.jpg',
        'large': 'https://img3.doubanio.com/img/celebrity/large/23553.jpg',
        'medium': 'https://img3.doubanio.com/img/celebrity/medium/23553.jpg'
      },
      'name': '尼德·巴蒂',
      'id': '1010558'
    }
  ],
  'current_season': null,
  'original_title': 'Rango',
  'summary': '兰戈（约翰尼·德普 Johnny Depp 配音）是一只干瘦、翠绿的蜥蜴，他住在鱼缸里，蓝天白云椰子树的假相让他倍感无聊，这个酷爱幻想和表演的家伙只得在头脑中编出属于自己的英雄剧。可就在某天，一个意外将他驱赶出惯常的方寸空间，兰戈莫名其妙来到了西部荒原的公路上。在沙漠中穿行的时候，兰戈遭到猎鹰的袭击。经过一番周折，他来到了名为黄沙（Dirt）的小镇，这里住着许多昆虫和动物，破败不堪，宛若死城。兰戈意外干掉了凶恶的猎鹰，由此被镇上的居民视为英雄，他也乐于享受这种荣誉，可是英雄毕竟不好当……\n本片荣获2012年奥斯卡金像奖最佳动画长片奖；2012年安尼奖最佳动画片、最佳角色设计、最佳编辑和最佳剧本奖；2011年青年选择奖最佳配音奖（约翰尼·德普）。©豆瓣',
  'subtype': 'movie',
  'directors': [
    {
      'alt': 'https://movie.douban.com/celebrity/1031987/',
      'avatars': {
        'small': 'https://img1.doubanio.com/img/celebrity/small/4299.jpg',
        'large': 'https://img1.doubanio.com/img/celebrity/large/4299.jpg',
        'medium': 'https://img1.doubanio.com/img/celebrity/medium/4299.jpg'
      },
      'name': '戈尔·维宾斯基',
      'id': '1031987'
    }
  ],
  'comments_count': 22043,
  'ratings_count': 77329,
  'aka': [
    '飙风雷哥(台)',
    '马拉高(港)',
    '荒漠大冒险',
    '雷人哥',
    '宠物大冒险',
    '里戈',
    '兰格'
  ]
}
export default {
  data () {
    return {
      dialogVisible: false,
      filmName: '',
      form: formData,
      searchResult: false
    }
  },
  computed: {
    filmTitel: function () {
      console.log(this.form.title)
      if (this.form.title !== this.form.original_title) {
        return this.form.title + ' ' + this.form.original_title
      } else {
        return this.form.title
      }
    },
    filmDirectors: function () {
      let result = ''
      for (let d in this.form.directors) {
        result += this.form.directors[d].name + '/'
      }
      return result.slice(0, -1)
    },
    filmCasts: function () {
      let result = ''
      for (let c in this.form.casts) {
        result += this.form.casts[c].name + '/'
      }
      return result.slice(0, -1)
    },
    filmAka: function () {
      let result = ''
      for (let a in this.form.aka) {
        result += this.form.aka[a] + '/'
      }
      return result.slice(0, -1)
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    }
  },
  watch: {
    'filmName': function (val) {
      this.$http.jsonp('https://movie.douban.com/j/subject_suggest?q=' + this.filmName)
          .then(function (response) {
            console.log(response)
          })
    }
  }
}
</script>

<style lang="less" scoped>
  .v-img {
    display: block;
    width: 100%;
  }
  .v-result {
    position: relative;
    margin-top: 5px;
    ul {
      position: absolute;
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
</style>
