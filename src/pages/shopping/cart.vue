<template>
  <div class="my_cart">
    <div class="localaction">
      <image src="../../static/icon/local.png" class="local_img" mode="widthFix"></image>
      <open-data type="userProvince" lang="zh_CN"></open-data>
      <open-data type="userCity" lang="zh_CN"></open-data>
    </div>
    <goods-item
      v-for="(item, index) in selectGoods" :key="index"
      color="#ea9b5a"
      :item="item"
      >
    </goods-item>
    <div class="no_list" v-if="selectGoods.length === 0">
      <image src="../../static/images/no_list.png" mode="widthFix" class="no_list_img"></image>
    </div>
    <accounts 
      color="#ea9b5a"
      :selected="isAllselect"
      :accounts="totalPrice"
      @to-pay="toPay"
      >
    </accounts>
  </div>
</template>
<script>
import goodsItem from '@/components/goodsItem'
import accounts from '@/components/accounts'
import {mapGetters, mapMutations} from 'vuex'
export default {
  components: {
    goodsItem,
    accounts
  },
  data() {
    return {
    }
  },
  onShow() {
  },
  computed: {
    isAllselect() {
      let item = this.selectGoods.some(v => {
        return !v.select
      })
      return !item && this.selectGoods.length > 0
    },
    totalPrice() {
      let price = 0
      this.selectGoods.forEach(v => {
        if (v.select) {
          price += (v.price * v.num)
        }
      })
      return price
    },
    ...mapGetters(['selectGoods'])
  },
  methods: {
    toPay() {
      if (this.totalPrice > 0) {
        // 筛选被选中商品
        let list = this.selectGoods.filter(v => {
          return v.select
        })
        this.ADD_TO_PAY(list)
        this.$router.push({
          path: '/pages/index/paying',
          query: {
            'from': 'together'
          }
        })
      } else {
        wx.showToast({
          title: '请选择产品',
          icon: 'none',
          duration: 1500
        })
      }
    },
    ...mapMutations(['ADD_TO_PAY'])
  }
}
</script>
<style scoped lang="less">
.my_cart{
  padding-bottom: 50px;
.localaction {
  padding-bottom: 10px;
  display: flex !important;
  align-items: center;
  justify-content:center;
  overflow: hidden;
  .local_img{
    display: inline-block;
    width: 22px;
    height: 22px;
    margin-right: 10px;
  }
}
.no_list{
  padding-top: 142px;
  .no_list_img{
    display: block;
    width: 100%;
  }
  .no_list_tips{
    text-align: center;
    color: #999;
  }
}
}

</style>