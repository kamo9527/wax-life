<script>
import 'mp-weui/lib/style.css'
import './assets/base/fn.less'


export default {
  mpType: 'app',
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
page{
  height: 100%;
  /*font-size: 13px;*/
  /*background-color: #F2F2F2;*/
}
</style>
