<template>
  <div class="my_submit">
    <i-panel title="基本信息">
      <i-input @change="updataVal($event, item.key)" :title="item.name" v-for="item in basicInfo" :key="item.key" :placeholder="item.placeholder || '请输入'" />
    </i-panel>
    <i-panel title="上传商品详情轮播照片4张 *">
      <ul class="swiper_upload">
        <li v-for="(item, index) in formData.swiper" :key="index" class="pic_item" @click="uploadImg('swiper', index + '')">
          <image class="img" :src="item.src"></image>
          <icon type="clear" size="20" class="my_cancel" @click.stop="clearImg('swiper', index)" />
        </li>
        <li class="pic_item" @click="uploadImg('swiper')" v-if="swiperLen < 4">
          <image class="img" src="../../static/images/upload.png"></image>
        </li>
      </ul>
    </i-panel>
    <i-panel title="上传商品种类，并写标题（至少1种）">
      <ul class="swiper_upload">
        <li v-for="(item, styleIndex) in formData.style" :key="styleIndex" class="pic_item" @click="uploadImg('style', styleIndex + '')">
          <image class="img" :src="item.src"></image>
          <div class="img_title">{{item.name}}</div>
          <icon type="clear" size="20" class="my_cancel" @click.stop="clearImg('style', styleIndex)" />
        </li>
        <li class="pic_item" @click="styleAddShow = true">
          <image class="img" src="../../static/images/upload.png"></image>
        </li>
      </ul>
    </i-panel>
    <i-panel title="上传商品详情其他介绍照片（至少4张）">
      <ul class="swiper_upload">
        <li v-for="(item, othersIndex) in formData.others" :key="othersIndex" class="pic_item" @click="uploadImg('others', othersIndex + '')">
          <image class="img" :src="item.src"></image>
          <icon type="clear" size="20" class="my_cancel" @click.stop="clearImg('others', othersIndex)" />
        </li>
        <li class="pic_item" @click="uploadImg('others')">
          <image class="img" src="../../static/images/upload.png"></image>
        </li>
      </ul>
    </i-panel>
    <wux-popup position="bottom" title="添加种类" class-names="slideInUp" :visible="styleAddShow" @close.stop="onClose">
      <div class="my_popup">
        <div class="my_popup_title">种类标题：</div>
        <input @input="addItemName" title="种类标题：" placeholder="请输入" />
      </div>
      <div class="add_item_info">
        <image class="img" :src="addItem.src" @click="uploadStyle"></image>
        <button @click="finish" type="primary" class="fixed_btnggg">确定</button>
      </div>
    </wux-popup>
    <button @click="submit" class="fixed_btn" :class="{'fixed_btn_err': isComplete}">提交产品</button>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      isClick: true, // 防止重复点击
      styleAddShow: false, // 风格项添加
      addItem: {
        name: '',
        src: '../../static/images/upload.png'
      },
      basicInfo: [
        { key: 'id', name: '产品ID：', placeholder: '如 LCHY_01' },
        { key: 'title', name: '产品标题：' },
        { key: 'price', name: '产品价格：' },
        { key: 'sale', name: '产品销量：' },
        { key: 'praise', name: '产品好评数：' }
      ],
      formData: {
        id: '',
        title: '',
        price: '',
        sale: '',
        praise: '',
        swiper: [], // 轮播图片
        style: [], // 风格泪类图片上传
        others: [] // 其余的图片上传
      }
    }
  },
  computed: {
    swiperLen() {
      return this.formData.swiper.length
    },
    isBasic() {
      let list = ['id', 'title', 'price', 'sale', 'praise']
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        let val = this.formData[item]
        if (!val) {
          return true
        }
      }
      return false
    },
    isComplete() {
      let _style = this.formData.style.length // 至少填1张
      let _others = this.formData.others.length // 至少填4张
      return this.isBasic || this.swiperLen < 4 || _style === 0 || _others < 4
    }
  },
  methods: {
    updataVal(e, key) {
      let val = e.target.detail.value
      this.formData[key] = val
    },
    addItemName(e) {
      this.addItem.name = e.target.value
    },
    clearImg(key, i) {
      this.formData[key].splice(i, 1)
    },
    onClose() {
      this.addItem.name = ''
      this.addItem.src = '../../static/images/upload.png'
      this.styleAddShow = false
    },
    finish() {
      if (this.addItem.name && this.addItem.src) {
        let item = { ...this.addItem }
        this.formData.style.push(item)
      }
      this.onClose()
    },
    uploadStyle() {
      if (!this.formData.id) {
        wx.showToast({
          icon: 'none',
          title: '请输入产品ID',
        })
        return
      }
      if (!this.addItem.name) {
        wx.showToast({
          icon: 'none',
          title: '请输入种类标题',
        })
        return
      }
      this.upload(1, (arr) => {
        if (!arr || arr.length === 0) return
        this.addItem.src = arr[0]
      })
    },
    uploadImg(key, i) {
      let l = 1
      if (!this.formData.id) {
        wx.showToast({
          icon: 'none',
          title: '请输入产品ID',
        })
        return
      }
      if (!i) { // 单选
        if (key === 'swiper') l = 4 - this.swiperLen
        if (key === 'others') l = 9
      }
      this.upload(l, (arr) => {
        if (!arr || arr.length === 0) return
        if (i) {
          this.formData[key][i].src = arr[0]
        } else {
          let _id = this.formData.id
          let _num = this.formData[key].length
          arr.forEach((v, i) => {
            let len = _num + i + 1
            this.formData[key].push({
              name: `${_id}_${key}_${len}`,
              src: v
            })
          })
        }
      })
    },
    upload(num = 1, callback) { // 上传图片
      if (num >= 9) num = 9
      wx.chooseImage({
        count: num,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          wx.showLoading({
            title: '上传中'
          })
          let i = 0
          let list = []
          let timer = null
          let len = res.tempFilePaths.length
          let upload = function(l) {
            const filePath = res.tempFilePaths[i]
            const timestamp = new Date().getTime()
            // 上传图片
            const cloudPath = 'images/' + timestamp + filePath.match(/\.[^.]+?$/)[0]
            wx.cloud.uploadFile({
                cloudPath,
                filePath
              })
              .then(res => {
                const src = res.fileID
                list.push(src)
                // 如果还有照片，继续上传
                i++
                if (i < l) {
                  clearTimeout(timer)
                  timer = setTimeout(() => {
                    upload(l)
                  }, 50)
                } else {
                  timer = null
                  wx.hideLoading()
                  callback(list)
                }
              })
              .catch(error => {
                wx.hideLoading()
                wx.showToast({
                  icon: 'none',
                  title: '上传失败',
                })
              })
          }
          upload(len)
        },
        fail: e => {
          console.error(e)
        }
      })
    },
    submit() {
      if (this.isComplete) {
        wx.showToast({
          icon: 'none',
          title: '请输入完整的信息',
        })
        return
      }
      if (this.isClick) {
        this.isClick = false
        const db = wx.cloud.database()
        db.collection('goods').add({
            data: this.formData
          })
          .then(res => {
            this.isClick = true
            wx.showToast({
              title: '提交成功'
            })
            // 页面跳转
          })
          .catch(error => {
            this.isClick = true
            wx.showToast({
              icon: 'none',
              title: '提交失败'
            })
          })
      }
    }
  }
}

</script>
<style scoped lang="less">
.my_submit {
  padding-bottom: 100px;
  background-color: #F8F8F8;
}

.swiper_upload {
  padding: 14px 14px 0 14px;
  display: flex;
  flex-wrap: wrap;

  .pic_item {
    // flex-shrink: 0;
    position: relative;
    box-sizing: border-box;
    margin-right: 2%;
    margin-bottom: 20px;
    width: 23.5%;
    height: 68px;
    background-color: #F8F8F8;

    .img {
      display: block;
      width: 100%;
      height: 68px;
      vertical-align: middle;
    }

    .my_cancel {
      position: absolute;
      top: -10px;
      right: 0;
    }

    .img_title {
      text-align: center;
    }

    &:nth-child(4n+4) {
      margin-right: 0;
    }
  }
}

.add_item_info {
  padding: 14px;
  text-align: center;

  .img {
    display: block;
    margin: 0 auto 20px;
    width: 100px;
    height: 100px;
    vertical-align: middle;
    background-color: #F8F8F8;
  }
}

.my_popup {
  overflow: hidden;
  padding: 6px 14px;
  border-top: 1rpx solid #F8F8F8;
  border-bottom: 1rpx solid #F8F8F8;
  text-align: left;

  .my_popup_title {
    color: #000;
    float: left;
    height: 26px;
    line-height: 26px;
  }
}

.fixed_btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #fff;
  border-radius: 0;
  background-image: linear-gradient(to right, #1AA1FB, #1967FB);
}

.fixed_btn_err {
  background: #999;
}

</style>
