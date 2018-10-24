<template>
  <div>
    <xcell
      v-if="isAddress"
      :title="addressInfo.userName"
      :mobile="addressInfo.telNumber" 
      :inline-desc="addressInfo.address"
      i-class="i_pay_address"
      @cellClick="addressManage">
    </xcell>
    <xcell
      v-else
      title="请点击选择收获地址"
      src="../../static/icon/local.png"
      i-class="i_pay_address"
      @cellClick="addressManage">
    </xcell>
    <div class="address_line"></div>
    <good-item
      color="#ea9b5a"
      :item="item"
      :good-list="selectGoods"
      >
    </good-item>
    <!-- <div>
      <div class="lable">购物清单</div>.
      <div v-for="(item, index) in selectGoods" :key="index">
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
    <xcell
      title="商品总价"
      :fr="`￥${totalAmount}`"
      i-class="i_cell_pay">
    </xcell>
    <xcell
      title="运费"
      :fr="`￥${queryForm.freight}`"
      i-class="i_cell_pay">
    </xcell>
    <xcell
      title="合计"
      :fr="`￥${totalAmount}`"
      i-class="i_cell_pay last_cell">
    </xcell>
    <pay 
      :money="allPrice"
      @to-pay="toPay">
    </pay>
  </div>
</template>
<script>
import xcell from '@/components/cell'
import miniGoodsList from '@/components/miniGoodsList'
import goodItem from '@/components/goodItem'

import pay from '@/components/pay'
import {mapGetters} from 'vuex'

// import {mapGetters} from 'vuex'
// import { postClient } from '@/rest/goods'
export default {
  components: {
    xcell,
    miniGoodsList,
    goodItem,
    pay
  },
  data() {
    return {
      isAddress: false,
      addressInfo: {},
      queryForm: {
        allGoods: 1515,
        freight: 45
      },
      selectBuy: '1',
      addressItem: '222'

    }
  },
  onShow() {
    return
    let index = this.$route.query.index
    if (index !== undefined) {
      this.addressInfo = this.addressItem(index)
      this.isAddress = true
    } else {
      this.isAddress = false
    }
    this.$store.commit('UPDATE_IS_PICK', true)
  },
  computed: {
    allPrice() {
      return this.totalAmount + this.queryForm.freight
    },

    isAllselect() {
      let item = this.selectGoods.some(v => {
        return !v.select
      })
      return !item && this.selectGoods.length > 0
    },
    totalAmount() {
      let price = 0
      this.selectGoods.forEach(v => {
        price += (v.price * v.num)
      })
      return price
    },
    ...mapGetters({
      selectGoods: 'payingGoods'
    })
  },
  methods: {
    toPay() {
      let price = this.isAddress ? `恭喜您支付了${this.allPrice}元` : '请选择收获地址'

      console.log('selectGoods', this.selectGoods)
      console.log('addressInfo', this.addressInfo)

      const data = {
        act: 'createOrder',
        data: {
          totalAmount: this.totalAmount,
          allPrice: this.allPrice,
          freight: this.queryForm.freight,
          fh_status: 0, // '0未发货  1部分发货 2全部发货'
          status: 'paying',
          order_status: 0, // '订单状态  0待支付 1待收货 2待确认  3已完成  4已取消'
          sh_name: this.addressInfo.userName,
          sh_phone: this.addressInfo.telNumber,
          sh_address: this.addressInfo.address,
          src: this.selectGoods[0] ? this.selectGoods[0].src : '../../static/icon/local.png',
          title: this.selectGoods[0] ? this.selectGoods[0].title : '暂无信息',
          list: this.selectGoods
        }
      }

      wx.cloud.callFunction({
        name: 'orderAction',
        data,
        complete: res => {
          if(res.result.code == 0) {
            wx.showToast({
              title: '开单成功啦',
              complete: () => {
                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/index/index'
                  })
                }, 1500)
                
              }
            })
          }else {
            wx.showToast({
              title: '开单失败，请稍后再试',
              icon: 'none'
            })
          }
          
        }
      })

      // wx.showToast({
      //   title: price,
      //   icon: 'none',
      //   duration: 1500
      // })
    },
    addressManage() {
      if(wx.chooseAddress){
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
      }else{
        console.log('当前微信版本不支持chooseAddress');
      }
    },
    formatAddress(data) {
      return '' + data.provinceName + data.cityName + data.countyName + data.detailInfo
    }
  },

  
  

}
</script>
<style lang="less">
.i_pay_address{
  padding-top: 15px;
  padding-bottom: 15px;
  .i_cell_hd .img_icon {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }
}  
.i_cell_pay{
  .i_cell_fr {
    color: #d4237a;
  }
}
.last_cell{
  border-bottom: 1rpx solid #e5e5e5;
}
.address_line{
  width: 100%;
height: 2px;
background-image: linear-gradient(to right, #1296db 30%, #fff 30%, #fff 50%, #d17e52 50%, #d17e52 80%, #fff 80%, #fff 100%);
background-size: 80px 2px;
background-repeat: repeat-x;
}
</style>