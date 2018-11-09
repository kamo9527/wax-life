<template>
  <div class="content">
    <scroll-view scroll-y>
      <div class="swiper_container">
        <swiper circular class="swiper_info" :current="current" @change="imageCount">
          <swiper-item v-for="item in goodsInfo.swiper" :key="item">
            <image class="slide_image" :src="item.src" @click="previewSwiperImg(item.src, 'swiper')">
            </image>
          </swiper-item>
        </swiper>
        <div class="image_count">{{current + 1}} / {{goodsInfo.swiper.length}}</div>
      </div>
      <div class="detail">
        <div class="price">￥{{goodsInfo.price}}</div>
        <div class="desc">{{goodsInfo.title}}</div>
        <div class="info">
          <span>快递：免运费</span>
          <span>月销{{goodsInfo.sale}}笔</span>
          <span>广东惠州</span>
        </div>
      </div>
      <!-- <xcell title="服务" fr="7天无理由 · 运费险"></xcell> -->
      <xcell title="风格：" :fr="chooseGoods" @cellClick="sizeSelect"></xcell>
      <!-- <xcell title="参数" fr="品牌 形状..." @cellClick="paramsDialogShow = true"></xcell> -->
      
      <div class="img_content">
        <div class="my_divider">
          <wux-divider>
            <text class="text">优惠礼品</text>
          </wux-divider>
        </div>
        <image class="goods-img" mode="widthFix" src="cloud://wax-test-ee69e9.7761-wax-test-ee69e9/home/giving_01.jpg" /></image>
        <image class="goods-img" mode="widthFix" src="cloud://wax-test-ee69e9.7761-wax-test-ee69e9/home/giving_02.jpg" /></image>
        <div class="my_divider">
          <wux-divider>
            <text class="text">详情</text>
          </wux-divider>
        </div>
        <image class="goods-img" mode="widthFix" 
          v-for="item in goodsInfo.others" 
          :src="item.src" 
          :key="item"
          @click="previewSwiperImg(item.src, 'others')"
          ></image>
      </div>
      <div class="mock_foot"></div>
    </scroll-view>
    <!-- todo 店铺和客服 -->
    <div class="foot">
      <div class="left">
        <div class="store" @click="backToIndex">
          <img src="/static/icon/sub.png" alt="">
          <span>店铺</span>
        </div>
        <button :plain="true" class="service" open-type="contact">
          <img src="/static/icon/serve.png" alt="">
          <span>客服</span>
        </button>
      </div>
      <div class="right">
        <div class="btn_group">
          <span class="add" @click="sizeSelect('toCart')">加入购物车</span>
          <span class="pay" @click="sizeSelect('toPay')">立即购买</span>
        </div>
      </div>
    </div>
    <wux-popup position="bottom" class-names="slideInUp" :visible="sizeDialogShow" @close="sizeDialogClose">
      <div class="window">
        <span class="mock_icon" @click="sizeDialogClose"></span>
        <div class="flex info">
          <img class="img" :src="chooseItem.src">
          <div class="desc">
            <p class="price">￥{{goodsInfo.price}}</p>
            <p>库存：{{goodsInfo.price}}</p>
            <p v-if="chooseItem.name">已选：{{chooseItem.title}}</p>
            <p v-else>选择：颜色分类</p>
          </div>
        </div>
        <div class="color">
          <div class="title">颜色分类</div>
          <div class="color_type">
            <span 
              v-for="(good, gdIndex) in goodsInfo.style" 
              :key="gdIndex" 
              :class="{sel: good.select}" 
              @click="colorSelect(gdIndex)"
            >{{good.title}}
            </span>
          </div>
        </div>
        <div class="flex number">
          <div class="title">购买数量</div>
          <i-input-number :value="goodNum" min="1" max="100" @change="goodNumChange"></i-input-number>
        </div>
        <div class="btns">
          <div class="btn_group" v-if="opareteType">
            <span class="confirm" @click="oparete('')">确定</span>
          </div>
          <div class="btn_group" v-else>
            <span class="add" @click="oparete('toCart')">加入购物车</span>
            <span class="pay" @click="oparete('toPay')">立即购买</span>
          </div>
        </div>
      </div>
    </wux-popup>
    <!-- <wux-popup position="bottom" class-names="slideInUp" :visible="paramsDialogShow" @close="paramsDialogShow = false">
      <div class="params_window">
        <div class="title">产品参数</div>
        <div class="params flex" v-for="(params, paramsIndex) in goodsInfo.params" :key="paramsIndex">
          <div class="params_name">{{params.name}}</div>
          <div class="params_desc">{{params.desc}}</div>
        </div>
        <div class="complete" @click="paramsDialogShow = false">完成</div>
        <template v-for="params in goodsInfo.params" > 
          <xcell :title="params.name" :fr="params.desc"></xcell>
        </template>
      </div>
    </wux-popup> -->
  </div>
</template>
<script>
import xcell from '@/components/cell'
import { mapMutations } from 'vuex'
export default {
  components: {
    xcell
  },
  data() {
    return {
      id: '', // 产品id
      current: 0,
      goodNum: 1,
      chooseGoods: '请选择 颜色分类',
      opareteType: '',
      sizeDialogShow: false,
      goodsInfo: {
        price: 0,
        desc: '',
        saleTotal: '',
        style: [],
        colorTypes: [],
        params: [],
        swiper: [],
        others: []
      },
      chooseItem: {
        name: '',
        title: '',
        src: '',
        num: 1
      },
      selectData: {}
    }
  },
  created() {
  },
  onShow(option) {
    Object.assign(this.$data, this.$options.data())
    this.id = this.$route.query.id
    this.getDetail(this.id)
  },
  computed: {
    swiperUrls() {
      return this.goodsInfo.swiper.map(v => {
        return v.src
      })
    },
    othersUrls() {
      return this.goodsInfo.others.map(v => {
        return v.src
      })
    }
  },
  methods: {
    async getDetail(id) {
      wx.showLoading()
      const db = wx.cloud.database()
      let res = await db.collection('goods').where({id: id}).get()
      this.goodsInfo = res.data[0]
      this.chooseItem.src = this.goodsInfo.brand_img
      wx.hideLoading()
    },
    imageCount(e) {
      this.current = e.mp.detail.current
    },
    previewSwiperImg(src, key) {
      let urls = this[key + 'Urls']
      wx.previewImage({
        current: src, // 当前显示图片的http链接
        urls: urls // 需要预览的图片http链接列表
      })
    },
    sizeSelect(key) {
      this.opareteType = key
      this.sizeDialogShow = true
    },
    sizeDialogClose() {
      this.sizeDialogShow = false
    },
    goodNumChange(ev) {
      this.goodNum = ev.target.value
    },
    colorSelect(index) { // 选择规格颜色
      // this.bugType = ''
      this.goodsInfo.style.forEach(item => {
        item.select = false
      })
      const target = this.goodsInfo.style[index]
      target.select = true
      this.chooseItem = target
      this.chooseGoods = target.title
    },
    oparete(key) { // 购买(加入购物车/立即购买)
      let nextKey = key || this.opareteType
      if (!this.chooseItem.name) {
        if (!this.sizeDialogShow) {
          this.sizeDialogShow = true
        } else {
          wx.showToast({
            icon: 'none',
            title: '请选择种类'
          })
        }
      } else {
        // 选择颜色后封装信息进行管理
        const chooseInfo = {
          id: this.goodsInfo.id,
          price: this.goodsInfo.price,
          brand_title: this.goodsInfo.brand_title,
          ...this.chooseItem
        }
        chooseInfo.num = this.goodNum
        if (nextKey === 'toPay') {
          this.UPDATE_CURRENT(chooseInfo)
          wx.navigateTo({
            url: '/pages/index/paying'
          })
        } else if (nextKey === 'toCart') {
          this.ADD_TO_CART(chooseInfo)
          wx.showToast({
            title: '成功添加到购物车'
          })
        }
        this.sizeDialogShow = false
      }
    },
    imageCount(e) {
      this.current = e.mp.detail.current
    },
    backToIndex() {
      wx.switchTab({
        url: '/pages/index/home'
      })
    },
    ...mapMutations(['ADD_TO_CART', 'UPDATE_CURRENT'])
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
      span {
        text-align: center;
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

.my_divider {
  border-top: 1rpx solid #eee;
  padding: 0 40px;
    .text {
      font-size: 14px;
      color: #BFBFBF;
    }
  }

.img_content {
  font-size: 0;
  image {
    width: 100%;
    vertical-align: middle;
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
        text-align: center;
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
