<template>
  <div class="my_list_item">
    <div :class="['i_cell', 'i_cell_bd_start', iClass]">
      <div class="i_cell_hd">
        <img :src="item.list && item.list[0].styleSrc" class="img_icon order_pic" alt="" />
    </div>
        <div class="i_cell_bd">
          <div class="title pb10">订单编号：{{item.orderId}}</div>
          <div class="order_content">
            <span class="title">{{item.list && item.list[0].title}}</span>
            <!-- <span>x1</span> -->
          </div>
          <div class="order_detail">姓名：{{item.order_name}}</div>
          <div class="order_detail">手机号：{{item.order_phone}}</div>
        </div>
        <div class="i_cell_fr">
          <div>{{item.orderShowTime}}</div>
          <div>￥{{item.allPrice}}</div>
          <div class="status">{{statusInfo[item.status]}}</div>
        </div>
      </div>
      <div class="i_cell">
        <div class="i_cell_bd">
          <span class="my_courier" @click.stop="getCourier(item.courier)">快递单号: {{item.courier || '暂无'}}</span>
        </div>
        <div class="i_cell_fr" v-if="item.status !== 'done' && isBtn">
          <button size="mini" type="primary" @click.stop="btnClick(item.orderId, item.status)" class="operate_btn">{{btnInfo[item.status]}}</button>
        </div>
      </div>
      <web-view src="http://www.kuaidi100.com/" v-if="isShow"></web-view>
    </div>
</template>
<script>
export default {
  props: {
    iClass: String,
    item: Object,
    isBtn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShow: false,
      btnInfo: {
        picking: '录入',
        sending: '确认收货'
      },
      statusInfo: {
        picking: '待发货',
        sending: '运输中',
        done: '已完成'
      }
    }
  },
  onShow() {
    this.isShow = false
  },
  methods: {
    getCourier(courier) {
      if (courier) {
        let _this = this
        wx.setClipboardData({
          data: courier,
          success: (res) => {
            wx.showToast({
              title: '复制成功',
              duration: 2000,
              success: (res) => {
                _this.isShow = true
              }
            })
          }
        })
      }
    },
    btnClick(id, status) {
      this.$emit('onBtn', id, status)
    }
  }
}

</script>
<style scoped lang="less">
.my_list_item {
  margin-top: 10px;
  background-color: #FAFAFA;

  &::before {
    display: none;
  }

  .order_pic {
    border-radius: 4px;
  }

  .my_courier {
    color: #0A76F5;
  }

  .status {
    color: #ea9b5a;
    font-size: 13px;
    float: right;
    padding-top: 20px;
  }
  .order_content{
    height: 15px;
    line-height: 15px;
    span{
      font-size: 12px;
      color: #666;
      display: inline-block;
      vertical-align: middle;
    }
    .title{
      max-width: 160px;
      white-space: nowrap;
      text-overflow:ellipsis; 
      overflow:hidden;
    }
  }
  .order_detail {
    font-size: 13px;
  }

  .operate_btn {
    display: inline-block;
    vertical-align: middle;
  }
}

</style>
