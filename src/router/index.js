module.exports = [{
  path: '/pages/index/index',
  config: {
    navigationBarTitleText: '蜡の态度',
    usingComponents: {
      'xtabs': '../../static/iview/tabs/index',
      'xtab': '../../static/iview/tab/index',
      'xrow': '../../static/iview/row/index',
      'xcol': '../../static/iview/col/index',
      'wux-divider': '../../static/wux-weapp/divider/index'
    }
  }
}, {
  path: '/pages/my/index',
  config: {
    navigationBarTitleText: '个人中心',
    usingComponents: {
      'wux-gallery': '../../static/wux-weapp/gallery/index',
      'wux-row': '../../static/wux-weapp/row/index',
      'wux-col': '../../static/wux-weapp/col/index'
    }
  }
}, {
  path: '/pages/my/list',
  config: {
    navigationBarTitleText: '我的订单',
    usingComponents: {
      'xtabs': '../../static/iview/tabs/index',
      'xtab': '../../static/iview/tab/index'
    }
  }
}, {
  path: '/pages/index/detail',
  config: {
    navigationBarTitleText: '产品详情',
    usingComponents: {
      "wux-popup": "../../static/wux-weapp/popup/index",
      'i-input-number': '../../static/iview/input-number/index',
      'wux-divider': '../../static/wux-weapp/divider/index'
    }
  }
}, {
  path: '/pages/my/link',
  config: {
    navigationBarTitleText: '小程序开发咨询'
  }
}, {
  path: '/pages/shopping/cart',
  config: {
    navigationBarTitleText: '购物车',
    usingComponents: {
      'input-number': '../../static/iview/input-number/index',
      'i-radio': '../../static/iview/radio/index'
    }
  }
}, {
  path: '/pages/manage/goodsUpdata',
  config: {
    navigationBarTitleText: '产品录入',
    usingComponents: {
      'i-input': '../../static/iview/input/index',
      'i-panel': '../../static/iview/panel/index',
      'wux-popup': '../../static/wux-weapp/popup/index'
    }
  }
}, {
  path: '/pages/manage/list',
  config: {
    enablePullDownRefresh: true,
    navigationBarTitleText: '物流管理',
    usingComponents: {
      'xtabs': '../../static/iview/tabs/index',
      'xtab': '../../static/iview/tab/index',
      'i-input': '../../static/iview/input/index',
      'i-modal': '../../static/iview/modal/index'
    }
  }
}, {
  path: '/pages/index/paying',
  config: {
    navigationBarTitleText: '填写订单',
    usingComponents: {
      'card': '../../static/iview/card/index',
      'i-cell': '../../static/iview/cell/index'
    }
  }
}]
