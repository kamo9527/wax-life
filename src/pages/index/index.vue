<template>
  <div class="my_store">
    <xtabs :current="current" color="#ea9b5a" @change="tabsChange" :fixed="true">
      <xtab key="home" title="首页"></xtab>
      <xtab key="goods" title="产品"></xtab>
      <xtab key="new" title="新品"></xtab>
      <xtab key="workshop" title="作坊"></xtab>
    </xtabs>
    <div class="my_home show_move" v-if="current === 'home'">
      <image
        v-for="item in yunImages" 
        :key="item.id"
        :src="basicUrl + item.src"
        @click="chooseId(item.id)"
        mode="widthFix" 
        >
      </image>
      <image src="/static/images/giving_01.jpg" mode="widthFix" ></image>
      <image src="/static/images/giving_02.jpg" mode="widthFix" ></image>
    </div>
    <div class="my_goods show_move" v-if="current === 'goods'">
      <xrow i-class="goods_filter_tabs">
        <xcol span="6" v-for="item in goodsFilter" :i-class="filterbar === item.key ? 'on' : '' " :key="item.key" @click="filterChange(item.key)">
          {{item.name}}<span :class="item.sort" v-if="item.key === 'price'"></span>
        </xcol>
      </xrow>
      <div class="goods_list">
        <div class="goods_item" v-for="item in goods" :key="item" @click="chooseGood(item)">
          <image :src="item.brand_img" mode="widthFix"></image>
          <div class="content">
            <div class="title">{{item.brand_title}}</div>
            <div class="detail">￥<span class="price">{{item.price}}</span><span class="num">{{item.sale}}人付款</span><span class="more">. . .</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="new_goods show_move" v-if="current === 'new'">
      <div class="new_goods_item" v-for="item in newGoods" :key="item">
        <image :src="item.brand_img" mode="widthFix"></image>
        <div class="content">
          <div class="update_day">{{item.is_new}}</div>
          <div class="title">{{item.title}}</div>
          <div class="detail">￥<span class="price">{{item.price}}</span></div>
        </div>
      </div>
    </div>
    <div class="my_workshop show_move" v-if="current === 'workshop'">
      <xcell 
        i-class="my_link" 
        src="/static/icon/serve.png" 
        title="深圳驰雅私人工作坊" 
        inlineDesc="专注手工蜡艺术品设计制作">
        <div slot="more">
          <button :plain="true" open-type="contact" class="my_link_note">
            <image class="my_link_icon" src="/static/icon/wx.png" mode="widthFix"></image>
            <div>联系我们</div>
          </button>
        </div>
      </xcell>
      <div class="dot_line"></div>
       <xcell 
        i-class="my_link_address" 
        src="/static/icon/address.png" 
        title="广东省惠州市博罗县"
        @cellClick="getAddress"
        is-link>
      </xcell>
      <xcell 
        i-class="my_link_phone" 
        src="/static/icon/phone.png" 
        title="15914039385"
        @cellClick="phoneCall"
        is-link>
      </xcell>
      <div class="my_workshop_jobs" v-for="(url, index) in urls" :key="url">
        <img class="my_img" :src="url"  @click="previewSwiperImg(url)" />
      </div>
      <div class="my_workshop_word">
        <h2 class="title">产品的用处</h2>
        <div><span class="dot"></span>家居装饰  熏香除臭  携带方便  留香长</div>
        <div><span class="dot"></span>结婚闺蜜朋友生日伴手送礼</div>
        <div>热销韩国花饰香薰蜡片，衣橱芳香伴手礼，闺蜜情人礼物，春日樱茶、良辰美景、婀娜多姿3个香味可选，放衣柜、客厅、卧室、行李箱，是家居出差旅行必备单品！</div>
      </div>
      <div class="my_workshop_word">
        <h2 class="title">材质解析</h2>
        <div>材质：天然蜂蜜蜡 + 植物大豆蜡，蜂蜜蜡由天然蜂巢提取而成，相比普通的石蜡，更加环保与健康，因蜂蜜质地比较硬，因而配上一定量的大豆蜡，能改善蜡片香薰质地。</div>
      </div>
    </div>
    <div class="my_divider">
      <wux-divider>
        <text class="text" v-if="current === 'workshop'">我们的态度</text>
        <text class="text" v-else>没有更多的产品啦</text>
      </wux-divider>
    </div>
  </div>
</template>
<script>
import xcell from '@/components/cell'
import {mapGetters, mapMutations, mapActions} from 'vuex'

export default {
  components: { xcell },
  data() {
    return {
      current: 'home',
      basicUrl: '',
      yunImages: [
        {id: 'LCHY01', src: 'home/home_01.png'},
        {id: 'LCHY02', src: 'home/home_002.png'},
        {id: 'LCHY03', src: 'home/home_003.png'},
        {id: 'LCHY04', src: 'home/home_04.png'},
        {id: 'LCHY05', src: 'home/home_005.png'}
      ],
      priceSort: false,
      filterbar: 'all',
      goodsFilter: [
        { key: 'all', name: '综合' },
        { key: 'sale', name: '销量' },
        { key: 'praise', name: '点评率' },
        { key: 'price', name: '价格', sort: 'sort' } // sort : sort , sort_up, sort_down
      ],
      urls: [
        'cloud://wax-test-ee69e9.7761-wax-test-ee69e9/home/0.jpg',
        'cloud://wax-test-ee69e9.7761-wax-test-ee69e9/home/0 (2).jpg',
        'cloud://wax-test-ee69e9.7761-wax-test-ee69e9/home/0 (1).jpg',
        'cloud://wax-test-ee69e9.7761-wax-test-ee69e9/home/8e1db27682629.jpg'
      ]
    }
  },
  created() {
    this.basicUrl = this.yunImagesBasic
  },
  onShow() {
    this.current = this.currentVuex
    this.updataAllGoods()
  },
  computed: {
    goods() { // 排序搜索
      let key = this.filterbar
      let sort = this.priceSort
      let arr = [...this.goodsList]
      if (key === 'all') { // 综合
        return this.goodsList
      } else if (key === 'price') { // 价格排序
        return arr.sort((a, b) => {
          return sort ? (b.price - a.price) : (a.price - b.price)
        })
      } else { // 销量和好评率
        return arr.sort((a, b) => {
          return b[key] - a[key]
        })
      }
    },
    ...mapGetters(['currentVuex', 'goodsList', 'newGoods'])
  },
  methods: {
    tabsChange(e) {
      let key = e.target.key
      this.current = key
      this.UPDATE_CURRENT(key)
    },
    filterChange(key) {
      this.filterbar = key
      if (key === 'price') {
        this.priceSort = !this.priceSort
        this.goodsFilter[3].sort = this.priceSort ? 'sort_up' : 'sort_down'
      } else {
        this.goodsFilter[3].sort = 'sort'
        this.priceSort = false
      }
    },
    previewSwiperImg(url) {
      wx.previewImage({
        current: url, // 当前显示图片的http链接
        urls: this.urls // 需要预览的图片http链接列表
      })
    },
    getAddress() {
      const latitude = 23.242904
      const longitude = 114.127264
      wx.openLocation({
        latitude,
        longitude,
        scale: 28
      })
    },
    phoneCall() {
      wx.makePhoneCall({
        phoneNumber: '15914039385',
        success: function() {
          console.log('拨打电话成功！')
        },
        fail: function() {
          console.log('拨打电话失败！')
        }
      })
    },
    bindViewTap() {
      const url = '../logs/index'
      wx.navigateTo({ url })
    },
    getUserInfo() {
      // 调用登录接口
      wx.getUserInfo({
        success: (res) => {
          console.log(res.userInfo)
        }
      })
    },
    // 选择商品
    chooseId(id) {
      let item = this.goods.find(v => {
        return v.id === id
      })
      if (!item) return
      this.$store.commit('UPDATE_GOODS_DETAIL', item)
      wx.navigateTo({
        url: '/pages/index/detail'
      })
    },
    // 选择商品
    chooseGood(item) {
      this.$store.commit('UPDATE_GOODS_DETAIL', item)
      wx.navigateTo({
        url: '/pages/index/detail'
      })
    },
    ...mapMutations(['UPDATE_CURRENT']),
    ...mapActions(['updataAllGoods'])
  }
}

</script>
<style lang="less">
.my_store {
  padding-top: 42px;
  .show_move {
    animation: mymove 0.6s ease-out;
    -webkit-animation: mymove 0.6s ease-out;
  }
  .my_home {
    image {
      width: 100%;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }
  .my_goods {
    .goods_filter_tabs {
      position: fixed;
      width: 100%;
      background-color: #fff;
    }

    ._xcol {
      line-height: 36px;
      font-size: 14px;
      color: #80848f;
      text-align: center;
    }

    .on {
      color: #ea9b5a;
    }

    .test {
      width: 200px;
      height: 100px;
      line-height: 100px;
      border: 1px solid #eee;
      text-align: center;
      font-size: 14px;
    }

    .sort,
    .sort_up,
    .sort_down {
      display: inline-block;
      width: 16px;
      height: 16px;
      vertical-align: middle;
    }

    .sort {
      background: url('../../../static/icon/sort.png') no-repeat;
    }

    .sort_up {
      background: url('../../../static/icon/sort_up.png') no-repeat;
    }

    .sort_down {
      background: url('../../../static/icon/sort_down.png') no-repeat;
    }
  }

  .goods_list {
    padding: 46px 10px 0;
    display: flex;
    flex-wrap: wrap;

    .goods_item {
      box-shadow: 0 0 145px #ea9b5a;
      -webkit-box-shadow: 0 0 14px #ea9b5a;
      flex-shrink: 0;
      box-sizing: border-box;
      width: 49%;
      margin-left: 2%;
      margin-bottom: 10px;
      border-radius: 8px;
      background-color: #fff;

      image {
        width: 100%;
        height: 174px;
        border-radius: 8px 8px 0 0;
        vertical-align: middle;
      }

      .content {
        padding: 4px 8px 6px;
      }
      
      .title {
        font-size: 13px;
      }

      .detail {
        font-size: 10px;
        color: #ea9b5a;

        .price {
          font-size: 14px;
          margin-right: 6px;
        }

        .num {
          color: #999;
        }

        .more {
          float: right;
        }
      }

      &:nth-child(2n+1) {
        margin-left: 0;
      }
    }
  }

  .new_goods {
    padding: 0 15px;
    .new_goods_item {
      box-shadow: 0 0 25px #ea9b5a;
      -webkit-box-shadow: 0 0 25px #ea9b5a;
      flex-shrink: 0;
      box-sizing: border-box;
      width: 100%;
      margin-top: 15px;
      margin-bottom: 15px;
      border-radius: 8px;
      background-color: #fff;

      image {
        width: 100%;
        border-radius: 8px 8px 0 0;
        vertical-align: middle;
      }

      .content {
        padding: 4px 8px 5px;
        overflow: hidden;
      }

      .update_day{
        padding-top: 10px;
        font-size: 16px;
        color: #ea9b5a;
        float: right;
      }
      .title {
        font-size: 13px;
      }

      .detail {
        font-size: 10px;
        color: #ea9b5a;

        .price {
          font-size: 14px;
          margin-right: 5px;
        }
      }
    }
  }

  .my_workshop {
    .my_link {
      .i_cell_hd .img_icon {
        width: 50px;
        height: 50px;
      }

      .i_cell_bd .inline_desc {
        font-size: 13px;
        color: #ea9b5a;
      }
      .my_link_note{
        font-size: 10px;
        padding: 0;
      }
      .my_link_icon {
        width: 28px;
        height: 28px;
        vertical-align: middle;
      }
      button[plain] {
        border: none;
      }
    }
    .dot_line{
      width: 100%;
      height: 2px;
      margin: 6px 0;
      background-color: #ea9b5a;
      background: linear-gradient(to right, #e6e6e6, #ea9b5a);
    }
    .my_link_address::before{
      display: none;
    }
    .my_link_address, .my_link_phone{
      .i_cell_hd .img_icon {
        width: 22px;
        height: 22px;
        vertical-align: middle;
      }
    }
    .my_workshop_jobs{
      padding: 0 10px 10px;
      .my_img{
        width: 100%;
        border-radius: 8px;
        display: block;
        vertical-align: middle;
      }
    }
    .my_workshop_word{
      padding: 10px;
      color: #515151;
      .title{
        font-size: 18px;
        font-weight: bolder;
        color: #ea9b5a;
        text-align: center;
        position: relative;
        margin-bottom: 10px;
        &::after{
          content: " ";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -2px;
          width: 40px;
          margin: auto;
          border-top: 2px solid #ea9b5a;
        }
      }
      .dot{
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: #ea9b5a;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
  }

  .my_divider {
    padding: 10px 40px 20px;

    .text {
      font-size: 14px;
      color: #BFBFBF;
    }
  }
}

@keyframes mymove {
  0% {
    opacity: 0;
    transform: translate(375px, 0);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

@-webkit-keyframes mymove {
  0% {
    opacity: 0;
    transform: translate(375px, 0);
  }

  100% {
    opacity: 1;
    transform: translate(0, 0);
  }
}

</style>
