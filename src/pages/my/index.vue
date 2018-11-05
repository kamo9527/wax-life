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
        link='.../my/link'>
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
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAuwAAAFdCAIAAADXPK/mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkQxMzY2NkFBQ0Y3MjExRTg4RUVBOTVFQkE0RUE4NzQ5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkQxMzY2NkFCQ0Y3MjExRTg4RUVBOTVFQkE0RUE4NzQ5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDEwRjNCNjdDRjcyMTFFODhFRUE5NUVCQTRFQTg3NDkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RDEwRjNCNjhDRjcyMTFFODhFRUE5NUVCQTRFQTg3NDkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4VlKCGAAATJElEQVR42uzd0XqjRoKA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') no-repeat;
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