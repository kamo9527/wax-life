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

Date.prototype.formatDate = function(fmt) {
    var o = {
        "M+" : this.getMonth() + 1,
        "d+" : this.getDate(),
        "h+" : this.getHours(),
        "m+" : this.getMinutes(),
        "s+" : this.getSeconds(),
        "q+" : Math.floor((this.getMonth() + 3) / 3),
        "S" : this.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

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
      list: []
    }
  },
  onShow() {
  },
  mounted() {
    this.getOrders(this.current)
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
      this.getOrders(this.current)
    },
    sure() {
      const id = this.questData.id

      const reqData = {
        status: 'sending',
        courier: this.questData.courierNumber,
        fh_time: new Date().formatDate('yyyy-MM-dd hh:mm:ss')
      }

      this.updateOrders(id, reqData)
      // return
      // this.list.splice()
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
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定')
              const id = this.questData.id
              const reqData = {
                status: 'done',
                sh_time: new Date().formatDate('yyyy-MM-dd hh:mm:ss')
              }
              this.updateOrders(id, reqData)

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
          console.log('getOrders', res)
        }
      })
    },

    updateOrders(orderId, data) {    
      wx.showLoading() 
      wx.cloud.callFunction({
        name: 'orderAction',
        data: {
          act: 'updateOrder',
          orderId,
          data
        },
        complete: res => {
          wx.hideLoading()     
          let msg
          if(res.result.code == 0) {
            msg = '更新成功'
          }else {
            msg = '更新失败'
          }
          wx.showToast({
            title: msg,
            icon: 'none',
            duration: 1500,
            complete: res => {
              this.getOrders(this.current)
            }
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
