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
      :accounts="totalAmount"
      >
    </accounts>
  </div>
</template>
<script>
import goodsItem from '@/components/goodsItem'
import accounts from '@/components/accounts'
import {mapGetters} from 'vuex'
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
    totalAmount() {
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
    // itemChange(item) {
    //   this.UPDATE_GOODS_ITEM(item)
    // },
    // allSelect(isAll) {
    //   if (this.ids.length > 0) this.UPDATE_GOODS_ALL_SELECT({ids: this.ids, select: !isAll})
    // },
    // toAccounts() {
    //   console.log(this.selectGoods)
    //   if (this.totalAmount) {
    //     this.$router.push('/pages/goods/paying')
    //   } else {
    //     wx.showToast({
    //       title: '请选择我家荔枝',
    //       icon: 'none',
    //       duration: 1500
    //     })
    //   }
    // },
    // ...mapMutations(['UPDATE_GOODS_ITEM'])
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