<template>
  <section>
    <xtabs :current="current" color="#ea9b5a" @change="tabsChange" :fixed="true">
      <xtab key="picking" title="待收货"></xtab>
      <xtab key="done" title="已完成"></xtab>
    </xtabs>
    <div class="my_list" v-if="showList">
      <order-item
        v-for="item in list" 
        :key="item.id"
        :item="item"
        >
      </order-item>
    </div>
    <div class="no_list" v-if="showNoList">
      <image src="../../static/images/no_list.png" mode="widthFix" class="no_list_img"></image>
    </div>
    <web-view src="http://www.kuaidi100.com/" v-if="isShow"></web-view>
  </section>
</template>
<script>
import orderItem from '@/components/orderItem'
export default {
  components: {
    orderItem
  },
  data() {
    return {
      current: 'picking',
      showList: false,
      showNoList: false,
      statusInfo: {
        going: '已发货',
        done: '已到货'
      },
      list: []
    }
  },
  mounted() {
    Object.assign(this.$data, this.$options.data())
    this.getOrders('picking')
  },
  methods: {
    tabsChange(e) {
      this.current = e.target.key
      this.getOrders(this.current)
    },
    getCourier(num) {
      let _this = this
      wx.setClipboardData({
        data: num,
        success: function(res) {
          _this.isShow = true
          wx.showToast({
            title: '复制成功',
            duration: 700,
            success: (res) => {
              console.log('打开快递100')
            }
          })
        }
      })
    },
    getOrders(type) {
      wx.showLoading()
      this.list = []
      wx.cloud.callFunction({
        name: 'orderAction',
        data: {
          act: 'getOrderByOpenId',
          status: type
        }
      }).then(res => {
        wx.hideLoading()
        this.list = res.result.data
        this.showList = this.list.length > 0
        this.showNoList = !this.showList
      }).catch(err => {
        console.error('[云函数] [permissions] 调用失败：', err)
      })
    }
  }
}

</script>
<style scoped lang="less">
.my_list {
  padding-top: 42px;
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
</style>
