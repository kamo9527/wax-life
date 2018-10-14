<template>
  <section>
    <xtabs :current="current" color="#ea9b5a" @change="tabsChange" :fixed="true">
      <xtab key="willsend" title="待发货"></xtab>
      <xtab key="sending" title="发货中"></xtab>
      <xtab key="picked" title="待收货"></xtab>
      <xtab key="done" title="已完成"></xtab>
    </xtabs>
    <div class="my_list">
      <xcell 
        i-class="my_list_item" 
        src="../../static/images/goods.png" 
        title="啊哥哥如果韩寒而隔热隔热个人"
        inline-desc="个人个人个"
        bd-start
        >
        <div slot="more">
          <div>￥4848</div>
          <div>x45</div>
        </div>
      </xcell>
    </div>
  </section>
</template>
<script>
import xcell from '@/components/cell'
import {mapGetters} from 'vuex'
export default {
  components: {
    xcell
  },
  data() {
    return {
      current: 'willsend',
      statusInfo: {
        going: '已发货',
        done: '已到货'
      }
    }
  },
  onShow() {
    // this.tabstatus = this.$route.query.status
  },
  computed: {
    goods() {
      let status = this.tabstatus
      return this.selectStatus(status)
    },
    ...mapGetters(['selectStatus'])
  },
  methods: {
    tabsChange(e) {
      this.current = e.target.key
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
.my_list{
  padding-top: 42px;
  .my_list_item{
    margin-top: 10px;
    background-color: #FAFAFA;
  }
}
.my_title{padding-top: 10px;}
.my_cell{
  .i_cell_hd .img_icon {
    width: 30px;
    height: 30px;
  }
}
</style>