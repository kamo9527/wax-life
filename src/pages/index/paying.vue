<template>
  <div>
    <xcell 
      v-if="isAddress" 
      :title="addressInfo.userName" 
      :mobile="addressInfo.telNumber" 
      :inline-desc="addressInfo.address" 
      @cellClick="addressManage"
      i-class="i_pay_address"
    >
    </xcell>
    <xcell 
      v-else 
      title="请点击选择收获地址" 
      src="../../static/icon/local.png" 
      i-class="i_pay_address" 
      @cellClick="addressManage"
    >
    </xcell>
    <div class="address_line"></div>
    <div class="line"></div>
    <goods-pay-list :list="payImgList"></goods-pay-list>
    <!-- <mini-goods-list :goods-list="selectBuy"></mini-goods-list> -->
    <div class="line"></div>
    <div class="i_cell_list">
    <xcell title="商品总价" :fr="`￥${totalPrice}`" i-class="i_cell_pay"></xcell>
    <xcell title="运费" :fr="`￥${questForm.freight}`" i-class="i_cell_pay"></xcell>
    <xcell title="合计" :fr="`￥${totalPrice}`" i-class="i_cell_pay"></xcell>
    </div>
    <pay :money="totalPrice" @to-pay="toPay"></pay>
  </div>
</template>
<script>
import goodsPayList from '@/components/goodsPayList'
import xcell from '@/components/cell'
import pay from '@/components/pay'
import { mapGetters, mapMutations } from 'vuex'
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
      questForm: {
        price: 0,
        freight: 0
      }
    }
  },
  computed: {
    totalAmount() {
      let price = 0
      this.payList.forEach(v => {
        price += (v.price * v.num)
      })
      return price
    },
    totalPrice() {
      return this.totalAmount + this.questForm.freight
    },
    ...mapGetters(['payList', 'payImgList'])
  },
  methods: {
    toPay() {
      let formKey = this.$route.query.from
      // let price = this.isAddress ? `恭喜您支付了${this.totalPrice}元` : '请选择收获地址'
      if (this.isAddress) {
        const data = {
          act: 'createOrder',
          data: {
            totalPrice: this.totalPrice,
            order_name: this.addressInfo.userName,
            order_phone: this.addressInfo.telNumber,
            order_address: this.addressInfo.address,
            status: 'picking',
            list: this.payList
          }
        }
        wx.cloud.callFunction({
          name: 'orderAction',
          data
        }).then(res => {
          if (res.result.code === 0) {
            wx.showToast({
              title: '下单成功啦',
              duration: 2000
            })
            setTimeout(() => {
              // 购物车置空
              if (formKey === 'together') this.CLEAN_CART()
              // 待支付列表置空
              this.CLEAN_PAY_LIST()
              wx.switchTab({
                url: '/pages/my/index'
              })
            }, 2000)
          } else {
            wx.showToast({
              title: '开单失败，请稍后再试',
              icon: 'none'
            })
          }
        }).catch(err => {
          console.error('[云函数] [permissions] 调用失败：', err)
        })
      } else {
        wx.showToast({
          title: '请填写收货地址',
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
      return data.provinceName + ' ' + data.cityName + ' ' + data.countyName + ' ' + data.detailInfo
    },
    ...mapMutations(['CLEAN_PAY_LIST', 'CLEAN_CART'])
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
.address_line {
  width: 100%;
  height: 4px;
  background-image: linear-gradient(-45deg,#fff 5%, #1296db 5%, #1296db 35%, #fff 35%, #fff 55%, #d17e52 55%, #d17e52 85%, #fff 85%, #fff 100%);
  background-size: 25% 4px;
  background-repeat: repeat-x;
}
</style>