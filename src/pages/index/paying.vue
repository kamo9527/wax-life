<template>
  <div>
    <i-cell 
      v-if="isAddress" 
      :title="addressInfo.userName" 
      :label="addressInfo.telNumber" 
      :value="addressInfo.address" 
      @click="addressManage"
      is-link
      >
    </i-cell>
    <i-cell 
      v-else 
      title="请点击选择收获地址" 
      @click="addressManage" 
      is-link
    >
      <img src='../../static/icon/local.png' slot="icon" />
    </i-cell>
    <div class="address_line"></div>
    <div class="line"></div>
    <goods-pay-list :list="payImgList"></goods-pay-list>
    <!-- <div>
      <div class="lable">购物清单</div>.
      <div v-for="(item, index) in payList" :key="index">
        <div class="good_detail">
          <img :src="item.src" alt="">
          <span>{{item.title}}</span>
        </div>
        <div class="good_price">
          {{item.num + '*' + item.price + '元'}}
        </div>
      </div>
    </div> -->
    <!-- <mini-goods-list :goods-list="selectBuy"></mini-goods-list> -->
    <div class="line"></div>
    <!-- <xcell title="商品总价" :fr="`￥${totalAmount}`" i-class="i_cell_pay">
    </xcell>
    <xcell title="运费" :fr="`￥${queryForm.freight}`" i-class="i_cell_pay">
    </xcell>
    <xcell title="合计" :fr="`￥${totalAmount}`" i-class="i_cell_pay last_cell">
    </xcell> -->
    <pay :money="allPrice" @to-pay="toPay"></pay>
  </div>
</template>
<script>
import goodsPayList from '@/components/goodsPayList'
import xcell from '@/components/cell'
import pay from '@/components/pay'
import { mapGetters } from 'vuex'
export default {
  components: {
    goodsPayList,
    xcell,
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
    isAllselect() {
      let item = this.payList.some(v => {
        return !v.select
      })
      return !item && this.payList.length > 0
    },
    totalAmount() {
      let price = 0
      this.payList.forEach(v => {
        price += (v.price * v.num)
      })
      return price
    },
    ...mapGetters(['payList', 'payImgList'])
  },
  methods: {
    toPay() {
      let price = this.isAddress ? `恭喜您支付了${this.allPrice}元` : '请选择收获地址'
      if (this.isAddress) {
        const data = {
          act: 'createOrder',
          data: {
            allPrice: this.allPrice,
            order_name: this.addressInfo.userName,
            order_phone: this.addressInfo.telNumber,
            order_address: this.addressInfo.address,
            order_img: this.payList[0] ? this.payList[0].src : '../../static/icon/local.png',
            status: 'picking',
            list: this.payList
          }
        }
        wx.cloud.callFunction({
          name: 'orderAction',
          data,
          complete: res => {
            if (res.result.code === 0) {
              wx.showToast({
                title: '开单成功啦',
                complete: () => {
                  // 购物车置空
                  this.$store.state.gooddetail.isCartToPay && this.$store.commit('CLEAN_CART')
                  setTimeout(() => {
                    wx.switchTab({
                      url: '/pages/index/index'
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
  height: 2px;
  background-image: linear-gradient(to right, #1296db 30%, #fff 30%, #fff 50%, #d17e52 50%, #d17e52 80%, #fff 80%, #fff 100%);
  background-size: 80px 2px;
  background-repeat: repeat-x;
}
</style>