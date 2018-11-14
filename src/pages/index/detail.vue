<template>
  <div class="content">
    <scroll-view scroll-y>
      <div class="swiper_container">
        <swiper circular class="swiper_info" :current="current" @change="imageCount">
          <swiper-item v-for="item in goodInfo.swiper" :key="item">
            <image class="slide_image" :src="item.src" @click="previewSwiperImg(item)">
            </image>
          </swiper-item>
        </swiper>
        <div class="image_count">{{current + 1}} / {{goodInfo.swiper.length}}</div>
      </div>
      <div class="detail">
        <div class="price">￥{{goodInfo.price}}</div>
        <div class="desc">{{goodInfo.brand_title}}</div>
        <div class="info">
          <span>快递：免运费</span>
          <span>月销{{goodInfo.sale}}笔</span>
          <span>{{goodAdress}}</span>
        </div>
      </div>
      <!-- <xcell title="服务" fr="7天无理由 · 运费险"></xcell> -->
      <xcell title="规格" fr="请选择 颜色分类" @cellClick="sizeSelect"></xcell>
      <!-- <xcell title="参数" fr="品牌 形状..." @cellClick="paramsDialogShow = true"></xcell> -->
      <div class="img_title">
        <span>
          <span class="line1"></span>
        <div class="icon_info">
          <span>优惠礼品</span>
        </div>
        <span class="line1"></span>
        </span>
      </div>
      <div class="img_content">
        <image class="goods-img" mode="widthFix" src="/static/images/giving_01.jpg" /></image>
        <image class="goods-img" mode="widthFix" src="/static/images/giving_02.jpg" /></image>
      </div>
      <div class="img_title">
        <span>
          <span class="line1"></span>
        <div class="icon_info">
          <span>详情</span>
        </div>
        <span class="line1"></span>
        </span>
      </div>
      <div class="img_content">
        <img v-for="item in goodInfo.others" class="goods-img" mode="widthFix" :src="item.src" :key="item"/>
      </div>
        <div class="mock_foot"></div>
    </scroll-view>
    <div class="foot">
      <div class="left">
        <span class="store" @click="backToIndex">
          <img src="/static/icon/sub.png" alt="">
          <p>店铺</p>
        </span>
        <button :plain="true" class="service" open-type="contact">
          <img src="/static/icon/serve.png" alt="">
          <p>客服</p>
        </button>
      </div>
      <div class="right">
        <span class="btn_group">
          <span class="add" @click="toBug(0)">加入购物车</span>
        <span class="pay" @click="toBug(1)">立即购买</span>
        </span>
      </div>
    </div>
    <wux-popup position="bottom" class-names="slideInUp" :visible="sizeDialogShow" @close="sizeDialogClose">
      <div class="window">
        <span class="mock_icon" @click="sizeDialogClose"></span>
        <div class="flex info">
          <img class="img" :src="sizeDialogData.imgUrl">
          <div class="desc">
            <p class="price">￥{{goodInfo.price}}</p>
            <p>库存：{{goodInfo.price}}</p>
            <p>已选：{{sizeDialogData.colorName}}</p>
          </div>
        </div>
        <div class="color">
          <div class="title">颜色分类</div>
          <div class="color_type">
            <span v-for="(good, gdIndex) in goodInfo.style" :key="gdIndex" :class="{sel: good.select}" @click="colorSelect(gdIndex)">{{good.title}}</span>
          </div>
        </div>
        <div class="flex number">
          <div class="title">购买数量</div>
          <div>
            <i-input-number :value="goodNum" min="0" max="100" @change="goodNumChange"></i-input-number>
          </div>
        </div>
        <div class="btns">
          <span class="btn_group" v-if="!bugType">
            <span class="add" @click="addToCart">加入购物车</span>
          <span class="pay">立即购买</span>
          </span>
          <span class="btn_group" v-if="bugType">
            <span class="confirm" @click="sizeDialogConfirm">确定</span>
          </span>
        </div>
      </div>
    </wux-popup>
    <!-- <wux-popup position="bottom" class-names="slideInUp" :visible="paramsDialogShow" @close="paramsDialogShow = false">
      <div class="params_window">
        <div class="title">产品参数</div>
        <div class="params flex" v-for="(params, paramsIndex) in goodInfo.params" :key="paramsIndex">
          <div class="params_name">{{params.name}}</div>
          <div class="params_desc">{{params.desc}}</div>
        </div>
        <div class="complete" @click="paramsDialogShow = false">完成</div>
        <template v-for="params in goodInfo.params" > 
          <xcell :title="params.name" :fr="params.desc"></xcell>
        </template>
      </div>
    </wux-popup> -->
  </div>
</template>
<script>
// import { formatTime } from '@/utils/index'
import xcell from '@/components/cell'
import store from '@/store/'
export default {
  components: {
    xcell
  },
  data() {
    return {
      sizeDialogShow: false,
      paramsDialogShow: false,
      goodNum: 1,
      current: 0,
      bugType: '',
      images: [],
      goodAdress: '广东惠州',
      goodInfo: {
        price: 98,
        desc: '进口精油北欧风香薰蜡烛台礼盒天然大豆蜡卧室无烟大理石陶瓷杯',
        saleTotal: '3',
        style: [],
        colorTypes: [],
        params: []
      },
      sizeDialogData: {
        colorName: '111',
        colorId: '111',
        price: '98',
        stock: '100',
        imgUrl: '/static/images/goods.png'
      },
      selectData: {}
    }
  },
  onShow() {
    this.goodInfo = store.state.gooddetail.good
    this.sizeDialogData.colorName = this.goodInfo.style[0].title
    this.sizeDialogData.imgUrl = this.goodInfo.style[0].src
    this.sizeDialogData.colorId = this.goodInfo.style[0].name
    this.goodInfo.style[0].select = true
  },
  methods: {
    sizeSelect() {
      this.sizeDialogShow = true
    },
    sizeDialogClose() {
      this.sizeDialogShow = false
    },
    goodNumChange(ev) {
      this.goodNum = ev.target.value
    },
    // 选择规格颜色
    colorSelect(index) {
      // this.bugType = ''
      this.goodInfo.style.forEach(item => {
        item.select = false
      })
      const target = this.goodInfo.style[index]
      target.select = true
      this.sizeDialogData.colorName = target.title
      this.sizeDialogData.imgUrl = target.src
      this.sizeDialogData.colorId = target.name
    },
    // 购买(加入购物车/立即购买)
    toBug(type) {
      if (type) {
        this.bugType = 'bug'
      } else {
        this.bugType = 'cart'
      }
      this.sizeDialogShow = true
    },
    addToCart() {
      const productInfo = {
        id: this.goodInfo.id,
        price: this.sizeDialogData.price,
        num: this.goodNum,
        title: this.sizeDialogData.colorName,
        name: this.sizeDialogData.colorId,
        brand_title: this.goodInfo.brand_title,
        src: this.sizeDialogData.imgUrl
      }
      this.$store.commit('ADD_TO_CART', productInfo)
      wx.showToast({
        title: '已添加到购物车',
        complete: () => {
          this.sizeDialogShow = false
        }
      })
    },
    sizeDialogConfirm() {
      if (this.bugType === 'cart') {
        this.addToCart()
      } else {
        const productInfo = {
          id: this.goodInfo.id,
          price: this.sizeDialogData.price,
          num: this.goodNum,
          title: this.sizeDialogData.colorName,
          brand_title: this.goodInfo.brand_title,
          name: this.sizeDialogData.colorId,
          src: this.sizeDialogData.imgUrl
        }
        this.$store.commit('UPDATE_PAYING_GOOD', productInfo)
        this.$store.commit('UPDATE_TOPAY_TYPE', 0)
        wx.navigateTo({
          url: '/pages/index/paying'
        })
        this.sizeDialogShow = false
      }
    },
    imageCount(e) {
      this.current = e.mp.detail.current
    },
    backToIndex() {
      wx.switchTab({
        url: '/pages/index/index'
      })
    }
  }
}
</script>
<style scoped lang="less">
.params_window {
  padding: 15px;
  .title {
    text-align: center;
    height: 30px;
    // line-height: 40px;
  }
  .params {
    height: 40px;
    line-height: 40px;
    text-align: left;
    .params_name {
      color: #999;
      width: 70px;
    }
    .params_desc {
      box-sizing: border-box;
      color: #333;
      flex-grow: 1;
      padding: 0 15px;
      line-height: 1.1;
    }
  }
  .complete {
    margin-top: 100px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    color: #fff;
    background-image: linear-gradient(to right, #FF9000 0%, #FF5000 100%);
  }
}
.flex {
  display: flex;
  align-items: center;
}
.window {
  padding: 15px 15px;
  text-align: left;
  position: relative;
  .mock_icon {
    position: absolute;
    top: 15px;
    right: 15px;
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 0.5px solid #666;
    border-radius: 50%;
    &:before,
    &:after {
      position: absolute;
      display: inline-block;
      content: '';
      width: 10px;
      height: 1px;
      background: #666;
      left: 50%;
      top: 50%;
    }
    &:before {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &:after {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
  .info {
    color: #333;
    padding-bottom: 16px;
    border-bottom: 0.5px solid #f2f2f2;
    .img {
      display: inline-block;
      width: 80px;
      height: 80px;
      margin-right: 10px;
    }
    .desc {
      .price {
        color: #ff5000;
        font-size: 24px;
      }
    }
  }
  .color {
    .title {
      height: 30px;
      font-size: 15px;
      line-height: 30px;
    }
    .color_type {
      >span {
        display: inline-block;
        border-radius: 20px;
        padding: 4px 14.5px;
        font-size: 12px;
        margin-right: 14px;
        margin-bottom: 10px;
        background-color: #F8F8F8;
      }
      .sel {
        color: #fff;
        background-image: linear-gradient(to right, #FF7A00 100%, #FE560A 100%);
      }
    }
  }
  .number {
    border-top: 0.5px solid #f2f2f2;
    padding-top: 15px;
    font-size: 15px;
    justify-content: space-between;
  }
  .btns {
    font-size: 14px;
    flex-grow: 1.5;
    color: #fff;
    text-align: center;
    margin-top: 100px;
    .btn_group {
      >span {
        display: inline-block;
        width: 150px;
        height: 36px;
        line-height: 36px;
      }
      .add {
        background: linear-gradient(to right, #FFC500, #FF9402);
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
      .pay {
        background: linear-gradient(to right, #FF7A00, #FE560A);
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
      .confirm {
        width: 100%;
        border-radius: 20px;
        background: linear-gradient(to right, #FFC500, #FF9402);
      }
    }
  }
}
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
.detail {
  padding: 0 15px;
  .price {
    color: #ff5000;
    font-size: 24px;
  }
  .desc {
    font-size: 16px;
    font-weight: 600;
    color: rgb(51, 51, 51);
  }
  .info {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(153, 153, 153);
  }
}
.img_title {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.5px solid #eee;
  padding: 10px 0;
  >span {
    display: flex;
    align-items: center;
  }
  .icon_info {
    margin: 0 10px;
  }
  .line1 {
    display: inline-block;
    width: 40px;
    border-top: 1px solid #999;
  }
}
.img_content {
  font-size: 0;
  image {
    width: 100%;
    vertical-align: middle;
  }
  img {
    width: 100%;
    display: block;
  }
}
.content {
  .mock_foot {
    height: 51px;
  }
}
.foot {
  height: 50px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 0.5px solid #eee;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  color: #999;
  padding: 0 15px;
  .left,
  .right {
    display: flex;
    align-items: center;
    width: 1px;
    flex-grow: 1;
    font-size: 0;
    >span {
      text-align: center;
    }
    .store {
      margin-right: 0px;
    }
    img {
      width: 16px;
      height: 16px;
    }
    p {
      font-size: 12px;
      margin-top: 5px;
      line-height: 1;
    }
  }
  .left {
    .service {
      line-height: 1;
      border: none;
      background: #fff;
      margin-left: 20px;
      p {
        color: #999;
        margin-top: 4px;
      }
    }
  }
  .right {
    font-size: 14px;
    flex-grow: 1.5;
    color: #fff;
    .btn_group {
      >span {
        display: inline-block;
        width: 100px;
        height: 36px;
        line-height: 36px;
      }
      .add {
        background: linear-gradient(to right, #FFC500, #FF9402);
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
      }
      .pay {
        background: linear-gradient(to right, #FF7A00, #FE560A);
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
      }
    }
  }
}
</style>