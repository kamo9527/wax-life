module.exports = [{
  path: '/pages/shopping/cart',
  config: {
    navigationBarTitleText: '购物车',
    usingComponents: {
      'input-number': '../../static/iview/input-number/index',
      'i-radio': '../../static/iview/radio/index'
    }
  }
}, {
  path: '/pages/index/index',
  config: {
    navigationBarTitleText: '蜡の生活，你的态度',
    usingComponents: {
      'xtabs': '../../static/iview/tabs/index',
      'xtab': '../../static/iview/tab/index',
      'xrow': '../../static/iview/row/index',
      'xcol': '../../static/iview/col/index',
      'wux-divider': '../../static/wux-weapp/divider/index'
    }
  }
}, {
  path: '/pages/index/detail',
  config: {
    navigationBarTitleText: '产品详情'
  }
}, {
  path: '/pages/my/index',
  config: {
    navigationBarTitleText: '日志',
    usingComponents: {
      'wux-gallery': '../../static/wux-weapp/gallery/index',
      'wux-row': '../../static/wux-weapp/row/index',
      'wux-col': '../../static/wux-weapp/col/index'
    }
  }
}]
