<template>
  <div>
    <xcell
      v-if="isAddress"
      :title="addressInfo.userName"
      :mobile="addressInfo.telNumber"
      :inline-desc="addressInfo.address"
      i-class="i_pay_address"
      @cellClick="addressManage"
    >
    </xcell>
    <xcell
      v-else
      title="请点击选择收获地址"
      src="/static/icon/local.png"
      i-class="i_pay_address"
      @cellClick="addressManage"
    >
    </xcell>
    <div class="address_line"></div>
    <div class="line"></div>
    <!-- <good-item :list="payImgList"></good-item> -->
    <!-- <div>
      <div class="lable">购物清单</div>.
      <div v-for="(item, index) in payingGoods" :key="index">
        <div class="good_detail">
          <img :src="item.src" alt="">
          <span>{{item.title}}</span>
        </div>
        <div class="good_price">
          {{item.num + '*' + item.price + '元'}}
        </div>
      </div>
    </div> -->
    <mini-goods-list
      :list="payImgList"
      link="/pages/index/list"
    ></mini-goods-list>
    <div class="line"></div>
    <div class="i_cell_list">
      <xcell
        title="商品总价"
        :fr="`￥${totalAmount}`"
        i-class="i_cell_pay"
      ></xcell>
      <xcell
        title="运费"
        :fr="`￥${queryForm.freight}`"
        i-class="i_cell_pay"
      ></xcell>
      <xcell
        title="合计"
        :fr="`￥${totalAmount}`"
        i-class="i_cell_pay"
      ></xcell>
    </div>
    <pay
      :money="allPrice"
      @to-pay="toPay"
    >
    </pay>
  </div>
</template>
<script>
import xcell from '@/components/cell'
import miniGoodsList from '@/components/miniGoodsList'
// import goodItem from '@/components/goodItem'
import pay from '@/components/pay'
import { mapGetters } from 'vuex'
export default {
  components: {
    xcell,
    miniGoodsList,
    // goodItem,
    pay
  },
  data() {
    return {
      isAddress: false,
      addressInfo: {},
      queryForm: {
        allGoods: 1515,
        freight: 0
      },
      selectBuy: '1',
      addressItem: '222'
    }
  },
  computed: {
    allPrice() {
      return this.totalAmount + this.queryForm.freight
    },
    totalAmount() {
      let price = 0
      this.payingGoods.forEach(v => {
        price += (v.price * v.num)
      })
      return price
    },
    ...mapGetters(['payingGoods', 'payImgList'])
  },
  methods: {
    toPay() {
      wx.cloud.callFunction({
        name: 'toPay'
      })
        .then(res => {
          console.log(res.result) // 3
        })
        .catch(console.error)
    },
    makeOrder() {
      let price = this.isAddress ? `恭喜您支付了${this.allPrice}元` : '请选择收获地址'
      if (this.isAddress) {
        const data = {
          act: 'createOrder',
          data: {
            allPrice: this.allPrice,
            order_name: this.addressInfo.userName,
            order_phone: this.addressInfo.telNumber,
            order_address: this.addressInfo.address,
            order_img: this.payingGoods[0].src,
            status: 'picking',
            list: this.payingGoods
          }
        }
        wx.cloud.callFunction({
          name: 'orderAction',
          data,
          complete: res => {
            if (res.result.code === 0) {
              // wx.requestPayment({
              //   ...res.data.pay_params,
              //   success: function () {
              //     wx.redirectTo({
              //       url: 'success?count=' + amount
              //     })
              //   },
              //   fail: function (d) {
              //     wx.showModal({
              //       content: '支付失败，请重试。',
              //       confirmColor: '#ce3b28'
              //     })
              //   }
              // })
              wx.showToast({
                title: '开单成功啦',
                complete: () => {
                  // 购物车置空
                  this.$store.state.gooddetail.isCartToPay && this.$store.commit('CLEAN_CART')
                  setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/my/index'
                    })
                  }, 1500)
                }
              })
            } else {
              wx.showToast({
                title: '开单失败，请稍后再试',
                icon: 'none'
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: price,
          icon: 'none',
          duration: 1500
        })
      }
    },
    addressManage() {
      if (wx.chooseAddress) {
        wx.chooseAddress({
          success: (res) => {
            const data = res
            data.address = this.formatAddress(res)
            this.addressInfo = data
            this.isAddress = true
          },
          fail: (err) => {
            console.log(JSON.stringify(err))
          }
        })
      } else {
        console.log('当前微信版本不支持chooseAddress')
      }
    },
    formatAddress(data) {
      return '' + data.provinceName + data.cityName + data.countyName + data.detailInfo
    }
  }
}
</script>
<style lang="less">
.i_pay_address {
  padding-top: 15px;
  padding-bottom: 15px;
  .i_cell_hd .img_icon {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
}
.i_cell_pay {
  .i_cell_fr {
    color: #d4237a;
  }
}
.last_cell {
  border-bottom: 1rpx solid #e5e5e5;
}
.address_line {
  width: 100%;
  height: 4px;
  background-image: linear-gradient(
    -45deg,
    #fff 5%,
    #1296db 5%,
    #1296db 35%,
    #fff 35%,
    #fff 55%,
    #d17e52 55%,
    #d17e52 85%,
    #fff 85%,
    #fff 100%
  );
  background-size: 25% 4px;
  background-repeat: repeat-x;
}
</style>