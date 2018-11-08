<template>
  <section>
    <div class="my_center">
      <ul class="my_center_top">
        <li class="center_icon">
          <image src="../../static/icon/members.png" class="members_img"></image>
        </li>
        <li class="center_user_avatar">
          <div class="user_avatar">
            <open-data type="userAvatarUrl"></open-data>
          </div>
        </li>
        <li class="center_content">
          <open-data type="userNickName"></open-data>
          <p class="my_center_desc">普通用户</p>
        </li>
      </ul>
    </div>
    <div class="line bg_fff"></div>
    <div class="i_center_list">
      <xcell
        v-if="hasAuth"
        title="我的管理" 
        src="../../static/icon/manage.png" 
        link="../manage/list"
        >
      </xcell>
      <xcell
        v-if="hasAuth"
        title="商品录入" 
        src="../../static/icon/upload.png" 
        link="../manage/goodsUpdata"
        >
      </xcell>
      <xcell
        title="我的订单" 
        src="../../static/icon/all.png" 
        link="../my/list"
        >
      </xcell>
      <xcell
        title="我的地址" 
        src="../../static/icon/address_0.png" 
        @cellClick="addressManage"
        is-link>
      </xcell>
      <xcell
        title="店家简介" 
        src="../../static/icon/sub.png" 
        @cellClick="goHome"
        is-link>
      </xcell>
      <xcell
        title="联系我们，做你的小程序" 
        src="../../static/icon/serve.png" 
        link='../my/link'>
      </xcell>
    </div>
  </section>
</template>
<script>
import xcell from '@/components/cell'
import { mapMutations } from 'vuex'
export default {
  components: {
    xcell
  },
  data() {
    return {
      hasAuth: false
    }
  },
  onShow() {
    wx.cloud.callFunction({
      name: 'permissions',
      data: {}
    }).then(res => {
      this.hasAuth = res.result.hasAuth
    }).catch(err => {
      console.error('[云函数] [permissions] 调用失败：', err)
    })
  },
  methods: {
    // getUserInfo() {
    //   // 调用登录接口
    //   wx.login({
    //     success: () => {
    //       wx.getUserInfo({
    //         success: (res) => {
    //           this.userInfo = res.userInfo
    //         }
    //       })
    //     }
    //   })
    // },
    addressManage() {
      if (wx.chooseAddress) {
        wx.chooseAddress({
          success: (res) => {
            console.log(JSON.stringify(res))
          },
          fail: (err) => {
            console.log(JSON.stringify(err))
          }
        })
      } else {
        console.log('当前微信版本不支持chooseAddress')
      }
    },
    goHome() {
      this.UPDATE_CURRENT('workshop')
      wx.switchTab({
        url: '../index/index'
      })
    },
    phoneCall() {
      wx.makePhoneCall({
        phoneNumber: '15914039385',
        success: function() {
          console.log('拨打电话成功！')
        },
        fail: function() {
          console.log('拨打电话失败！')
        }
      })
    },
    ...mapMutations(['UPDATE_CURRENT'])
  }
}
</script>
<style lang="less">
.my_center {
  width: 100%;
  height: 175px;
  background: url('../../../static/images/members.png') no-repeat;
  background-size: 100% 100%;
  .my_center_top{
    padding-top: 75px;
    width: 100%;
    overflow: hidden;
  }
  li{
    float: left;
  }
  .center_icon{
    float: right;
    .members_img{
      padding-top: 18px;
      display: inline-block;
      padding-right: 15px;
      width: 40px;
      height: 40px;
    }

  }
  .center_user_avatar{
    margin: 0 10px;
    width: 76px;
    height: 76px;
    // background: url('http://47.106.206.172:8080/blueHat/my_avatar.png') no-repeat;
    // background-size: 100% 100%;
    position: relative;
    .user_avatar{
      box-shadow: 0 0 30px #ea9b5a;
      -webkit-box-shadow: 0 0 30px #ea9b5a;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 54px;
      height: 54px;
      border-radius: 50%;
      overflow:hidden;
    }
  }
  .center_content{
    padding-top: 17px;
    font-size: 15px;
    font-weight: 500;
    color: #fff;
      overflow:hidden;
    }
  .my_center_desc{
    width: 50px;
    font-size: 10px;
    font-weight: normal;
    background-color: #bfbfbf;
    background: linear-gradient(to right, #e6e6e6, #bfbfbf);
    color: #8a8a8a;
    line-height: 16px;
    height: 16px;
    padding: 0 1px;
    text-align: center;
    border-radius: 8px;
    margin-top: 2px;
  }
}
.i_center_list{
  border-top: 1rpx solid #e5e5e5;
  border-bottom: 1rpx solid #e5e5e5;
  .i_cell_hd .img_icon {
    width: 30px;
    height: 30px;
  }
}
</style>