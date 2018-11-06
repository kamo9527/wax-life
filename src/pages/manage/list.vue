<template>
  <section>
    <xtabs :current="current" color="#ea9b5a" @change="tabsChange" :fixed="true">
      <xtab key="picking" title="待发货"></xtab>
      <xtab key="sending" title="运输中"></xtab>
      <xtab key="done" title="已完成"></xtab>
    </xtabs>
    <div class="my_list" v-if="showList">
      <order-item v-for="item in list" :key="item.orderId" :item="item" :is-btn="true" @onBtn="operate">
      </order-item>
    </div>
    <div class="no_list" v-if="showNoList">
      <image src="../../static/images/no_list.png" mode="widthFix" class="no_list_img"></image>
    </div>
    <i-modal title="快递单号" :visible="showModal" @ok="sure" @cancel="cancel">
      <i-input @change="updataVal" title="快递单号：" placeholder="请输入" />
    </i-modal>
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
      questData: {
        orderId: '',
        courier: ''
      },
      current: 'picking',
      showList: false,
      showNoList: false,
      showModal: false,
      list: []
    }
  },
  mounted() {
    Object.assign(this.$data, this.$options.data())
    this.getOrders(this.current)
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() // 在当前页面显示导航条加载动画。
    setTimeout(() => {
      this.getOrders(this.current)
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 500)
  },
  methods: {
    tabsChange(e) {
      this.current = e.target.key
      this.getOrders(this.current)
    },
    sure() {
      this.updateOrderCourier(this.questData)
      this.questData.courier = ''
      this.showModal = false
    },
    cancel() {
      this.questData.courier = ''
      this.showModal = false
    },
    operate(id, status) {
      if (!id || !status) return
      this.questData.orderId = id
      if (status === 'picking') {
        this.showModal = true
      } else if (status === 'sending') {
        wx.showModal({
          title: '提示',
          content: '确定收货么？',
          success: res => {
            if (res.confirm) {
              this.updateOrderStatus(id)
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    },
    updataVal(e) {
      let val = e.target.detail.value
      this.questData.courier = val
    },
    getOrders(type) {
      wx.showLoading()
      this.list = []
      wx.cloud.callFunction({
        name: 'orderAction',
        data: {
          act: 'getOrderByOpenId',
          status: type,
          isManager: true
        }
      }).then(res => {
        wx.hideLoading()
        this.list = res.result.data
        this.showList = this.list.length > 0
        this.showNoList = !this.showList
      }).catch(err => {
        console.error('[云函数] [permissions] 调用失败：', err)
      })
    },
    updateOrderCourier(info) {
      wx.cloud.callFunction({
        name: 'orderAction',
        data: {
          act: 'updateOrderCourier',
          info
        }
      }).then(res => {
        wx.showToast({
          title: '快递更新成功',
          duration: 1500,
          complete: res => {
            this.getOrders(this.current)
          }
        })
      }).catch(err => {
        console.error('[云函数] [permissions] 调用失败：', err)
      })
    },
    updateOrderStatus(id) {
      wx.cloud.callFunction({
        name: 'orderAction',
        data: {
          act: 'updateOrderStatus',
          orderId: id
        }
      }).then(res => {
        wx.showToast({
          title: '状态更新成功',
          duration: 1500,
          complete: res => {
            this.getOrders(this.current)
          }
        })
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

.no_list {
  padding-top: 142px;

  .no_list_img {
    display: block;
    width: 100%;
  }

  .no_list_tips {
    text-align: center;
    color: #999;
  }
}

</style>
