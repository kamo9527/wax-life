<template>
  <section>
    <xtabs :current="current" color="#ea9b5a" @change="tabsChange" :fixed="true">
      <xtab key="picking" title="待收货"></xtab>
      <xtab key="done" title="已完成"></xtab>
    </xtabs>
    <!-- <div class="my_list" v-if="showList">
      <xcell i-class="my_list_item" src="../../static/images/goods.png" title="啊哥哥如果韩寒而隔热隔热个人" inline-desc="个人个人个" bd-start>
        <div slot="operate">
          <div class="my_courier" @click="getCourier('484848')">快递单号: 458884848848</div>
        </div>
        <div slot="more">
          <div>￥4848</div>
          <div>x45</div>
          <div class="status">运输中</div>
        </div>
      </xcell>
      <xcell i-class="my_list_item" src="../../static/images/goods.png" title="啊哥哥如果韩寒而隔热隔热个人" inline-desc="个人个人个" bd-start>
        <div slot="operate">
          <div class="my_courier" @click="getCourier('484848')">快递单号: 暂无</div>
        </div>
        <div slot="more">
          <div>￥4848</div>
          <div>x45</div>
          <div class="status">待发货</div>
        </div>
      </xcell>
    </div> -->
    <div class="no_list" v-if="showNoList">
      <image src="../../static/images/no_list.png" mode="widthFix" class="no_list_img"></image>
    </div>
    <web-view src="http://www.kuaidi100.com/" v-if="isShow"></web-view>
  </section>
</template>
<script>
import xcell from '@/components/cell'
export default {
  components: {
    xcell
  },
  data() {
    return {
      current: 'picking',
      isShow: false,
      showList: false,
      showNoList: true,
      statusInfo: {
        going: '已发货',
        done: '已到货'
      }
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
  methods: {
    tabsChange(e) {
      this.current = e.target.key
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
    }
  }
}

</script>
<style lang="less">
.my_list {
  padding-top: 42px;

  .my_list_item {
    margin-top: 10px;
    background-color: #FAFAFA;
    .i_cell_hd {
      .img_icon {border-radius: 4px;}
    }
    &::before{display: none;}
  }

  .my_courier {
    padding-top: 16px;
    font-size: 13px;
    color: #0A76F5;
  }
  .status{
    color: #ea9b5a;
    font-size: 13px;
    float: right;
    padding-top: 15px;
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
</style>
