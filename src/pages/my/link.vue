<template>
  <div>
  </div>
</template>
<script>
import xcell from '@/components/cell'
export default {
  components: {
    xcell
  },
  data() {
    return {
      phoneNumber: '13632779376',
      markers: [{
        iconPath: '../../static/icon/coordinate.png',
        id: 55,
        latitude: 23.159880,
        longitude: 114.285000,
        width: 50,
        height: 50
      }],
      controls: [{
        id: 1,
        iconPath: '',
        position: {
          left: 0,
          top: 300 - 50,
          width: 50,
          height: 50
        },
        clickable: true
      }]
    }
  },
  created() {
  },
  methods: {
    phoneCall() {
      wx.makePhoneCall({
        phoneNumber: this.phoneNumber,
        success: function() {
          console.log('拨打电话成功！')
        },
        fail: function() {
          console.log('拨打电话失败！')
        }
      })
    }
  }
}
</script>
<style lang="less">
.company_image{
  display: block;
  width: 100%;
}
.company_introduction{
  padding: 10px 15px;
  p{
    text-indent: 26px;
  }
}
.company_link{
  .i_cell_hd .img_icon {
    width: 23px;
    height: 23px;
  }
  .i_cell:first-child{
    .i_cell_fr{
      color: #5890ff;
    }
  }
}

.service_center{
  padding:  15px 20px;
  .i_flex_item{
    margin: 0 10px;
  }
  .link_btn{
    font-size: 14px;
  }
}
</style>