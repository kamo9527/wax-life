<template>
  <section>
    <xtabs :current="current" color="#ea9b5a" @change="tabsChange" :fixed="true">
      <xtab key="picking" title="待发货"></xtab>
      <xtab key="sending" title="运输中"></xtab>
      <xtab key="done" title="已完成"></xtab>
    </xtabs>
    <div class="my_list" v-if="showList">
      <order-item
        v-for="item in list" :key="item.id"
        :item="item"
        :is-btn="true"
        @onBtn="operate"
        >
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
        id: '',
        courierNumber: ''
      },
      current: 'picking',
      showList: true,
      showNoList: false,
      showModal: false,
      list: [{
        src: 'cloud://wax-test-ee69e9.7761-wax-test-ee69e9/home/0 (1).jpg',
        goods_id: 'LCHY_02',
        order_name: '长贵',
        order_phone: '1594742224',
        id: '4545',
        allPrice: 98,
        num: 4,
        courier: '45455445454',
        status: 'done'
      }]
    }
  },
  onShow() {
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() // 在当前页面显示导航条加载动画。
    setTimeout(() => {
      console.log('aaaa')
      wx.hideNavigationBarLoading()
      wx.stopPullDownRefresh()
    }, 500)
  },
  methods: {
    tabsChange(e) {
      this.current = e.target.key
    },
    sure() {
      this.list.splice()
      this.questData.courierNumber = ''
      this.showModal = false
      // 发送请求修改数据库
      // 刷新列表
    },
    cancel() {
      this.questData.courierNumber = ''
      this.showModal = false
    },
    operate(id, status) {
      if (!id || !status) return
      this.questData.id = id
      if (status === 'picking') {
        this.showModal = true
      } else if (status === 'sending') {
        wx.showModal({
          title: '提示',
          content: '确定收货么？',
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              // 发送请求修改数据库
              // 刷新列表
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    },
    updataVal(e) {
      let val = e.target.detail.value
      this.questData.courierNumber = val
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
