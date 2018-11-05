import Vue from 'vue'
import App from '@/App'
import store from '@/store'
// var Fly=require("flyio/dist/npm/wx")

// var fly=new Fly

// Vue.prototype.$http = fly

Vue.prototype.yunImagesBasic = 'cloud://wax-test-ee69e9.7761-wax-test-ee69e9/'
Vue.config.productionTip = false

// import IboxPlugin from '@/plugins/ibox'
// Vue.use(IboxPlugin)
if (!wx.cloud) {
  console.error('请使用 2.2.3 或以上的基础库以使用云能力')
} else {
  wx.cloud.init({
    env: 'wax-test-ee69e9',
    traceUser: true
  })
}
const app = new Vue({
  store,
  ...App
})

app.$mount()

export default {
  cloud: true,
  config: {
    pages: [],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#bfbfbf',
      selectedColor: '#ea9b5a',
      borderStyle: 'white',
      backgroundColor: '#ffffff',
      list: [{
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'static/icon/home.png',
        selectedIconPath: 'static/icon/home-actived.png'
      }, {
        pagePath: 'pages/shopping/cart',
        text: '购物车',
        iconPath: 'static/icon/shopping.png',
        selectedIconPath: 'static/icon/shopping-actived.png'
      }, {
        pagePath: 'pages/my/index',
        text: '我的',
        iconPath: 'static/icon/my.png',
        selectedIconPath: 'static/icon/my-actived.png'
      }]
    }
  }
}
