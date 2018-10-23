<template>
  <div>
    <xcell
      v-if="isAddress"
      :title="addressInfo.name"
      :mobile="addressInfo.mobile" 
      :inline-desc="addressInfo.address"
      i-class="i_pay_address"
      link="/pages/my/address">
    </xcell>
    <xcell
      v-else
      title="请点击选择收获地址"
      src="../../static/icon/local.png"
      i-class="i_pay_address"
      link="/pages/my/address">
    </xcell>
    <div class="address_line"></div>
    <mini-goods-list :goods-list="selectBuy"></mini-goods-list>
    <div class="line"></div>
    <xcell
      title="商品总价"
      :fr="`￥${queryForm.allGoods}`"
      i-class="i_cell_pay">
    </xcell>
    <xcell
      title="运费"
      :fr="`￥${queryForm.freight}`"
      i-class="i_cell_pay">
    </xcell>
    <xcell
      title="合计"
      :fr="`￥${allPrice}`"
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
import pay from '@/components/pay'
// import {mapGetters} from 'vuex'
// import { postClient } from '@/rest/goods'
export default {
  components: {
    xcell,
    miniGoodsList,
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
      selectBuy: '111',
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
      return this.queryForm.allGoods + this.queryForm.freight
    },
  },
  methods: {
    changeAddress() {
      this.$router.push('/pages/my/address')
    },
    toPay() {
      let price = this.isAddress ? `恭喜您支付了${this.allPrice}元` : '请选择收获地址'
      wx.showToast({
        title: price,
        icon: 'none',
        duration: 1500
      })
    }
  }
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