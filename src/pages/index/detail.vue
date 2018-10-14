<template>
  <div>
    <div class="swiper_container">
      <swiper circular class="swiper_info" :current="current" @change="imageCount">
        <swiper-item v-for="item in images" :key="item">
          <image 
            class="slide_image"
            :src="item"
            @click="previewSwiperImg(item)"
            >
          </image>
        </swiper-item>
      </swiper>
      <div class="image_count">{{current + 1}} / {{images.length}}</div>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
// import card from '@/components/card'
export default {
  components: {
  },

  data() {
    return {
      current: 0,
      images: [
        '../../../static/images/goods.png',
        '../../../static/images/goods.png',
        '../../../static/images/goods.png',
        '../../../static/images/goods.png',
        '../../../static/images/goods.png',
        '../../../static/images/goods.png'
      ]
    }
  },

  created() {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  },
  methods: {
    imageCount(e) {
      this.current = e.mp.detail.current
    },
    previewSwiperImg(url){
      console.log(url)
      // wx.previewImage({
      //   current: url, // 当前显示图片的http链接
      //   urls: this.urls // 需要预览的图片http链接列表
      // })
    }
  }
}
</script>

<style scoped lang="less">
.swiper_container {
  position: relative;
  .swiper_info {
    height: 230px;
  }
  .slide_image {
    display: block;
    width: 100%;
  }
  .image_count {
    position: absolute;
    right: 15px;
    bottom: 10px;
    padding: 0 10px;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    background-color: #999;
    color: #ffffff;
    text-align: center;
    font-size: 12px;
  }
}
</style>
