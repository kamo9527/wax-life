<template>
  <section>
    <xtabs :current="current" color="#ea9b5a" @change="tabsChange" :fixed="true">
      <xtab key="picking" title="待收货"></xtab>
      <xtab key="done" title="已完成"></xtab>
    </xtabs>
    <div class="my_list" v-if="showList">
      <order-item
        v-for="item in list" :key="item.id"
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
      showList: true,
      showNoList: false,
      statusInfo: {
        going: '已发货',
        done: '已到货'
      },
      list: [
        // {
        //   src: 'cloud://wax-test-ee69e9.7761-wax-test-ee69e9/home/0 (1).jpg',
        //   goods_id: 'LCHY_02',
        //   order_name: '长贵',
        //   order_phone: '1594742224',
        //   id: '4545',
        //   allPrice: 98,
        //   num: 4,
        //   courier: '45455445454',
        //   status: 'sending'
        // }
      ]
    }
  },
  onShow() {
  },
  computed: {
    // goods() {
    //   let status = this.tabstatus
    //   return this.selectStatus(status)
    // },
    // ...mapGetters(['selectStatus'])
  },
  mounted() {
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
    getData() {
      getApi01().then(res => {
        if (res.code === 0) {
          console.log(res.data.name)
        } else {
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1500
          })
        }
      })
    },
    getOrders(type) {
      wx.showLoading() 
      wx.cloud.callFunction({
        name: 'orderAction',
        data: {
          act: 'getOrderByOpenId',
          status: type
        },
        complete: res => {
          wx.hideLoading() 
          res.result.data.forEach(item => {
            item.orderShowTime = item.show_time.substring(0, 10)
          }) 
          this.list = res.result.data
          console.log('getOrderByOpenId: ', res)
        }
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
