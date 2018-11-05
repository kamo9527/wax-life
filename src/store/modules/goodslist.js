const state = {
  ssgoodsss: [
    { id: 2, title: '新鲜桂味10斤 * 一箱', src: '../../static/images/goods.png', price: 110, num: 10, select: true, status: 'going', kind: '个人个人' },
    { id: 3, title: '新鲜妃子笑10斤 * 一箱', src: '../../static/images/goods.png', price: 110, num: 2, select: true, status: 'going', kind: '额二哥' },
    { id: 6, title: '新鲜妃子笑10斤 * 一箱', src: '../../static/images/goods.png', price: 110, num: 2, select: true, status: 'going', kind: '额二哥' },
    { id: 34, title: '新鲜妃子笑10斤 * 一箱', src: '../../static/images/goods.png', price: 110, num: 2, select: true, status: 'going', kind: '额二哥' },
    { id: 89, title: '新鲜妃子笑10斤 * 一箱', src: '../../static/images/goods.png', price: 110, num: 2, select: true, status: 'going', kind: '额二哥02' },
    { id: 323, title: '新鲜妃子笑10斤 * 一箱', src: '../../static/images/goods.png', price: 110, num: 2, select: true, status: 'going', kind: '额二哥01' },
    { id: 23, title: '新鲜妃子笑10斤 * 一箱', src: '../../static/images/goods.png', price: 110, num: 2, select: true, status: 'going', kind: '额二哥03' },
    { id: 4, title: '新鲜糯米糍10斤 * 一箱', src: '../../static/images/goods.png', price: 110, num: 0, select: true, status: 'done' },
    { id: 5, title: '新鲜龙眼10斤 * 一箱', src: '../../static/images/goods.png', price: 110, num: 0, select: true, status: 'done' }
  ],
  cartGoods: [],
  showGoods: []
}
const getters = {
  goodsList: stata => state.showGoods.filter(item => !item.is_new),
  newGoods: stata => state.showGoods.filter(item => item.is_new),
  selectGoods: state => {
    return state.cartGoods.filter(item => item.num)
  },
  selectGoodsss: state => {
    return state.ssgoodsss.filter(item => item.num)
  },
  selectBuy: state => {
    return state.cartGoods.filter(item => item.num && item.select)
  },
  selectStatus: (state, getters) => (status) => {
    if (status === 'all') {
      return getters.selectBuy
    } else {
      return getters.selectBuy.filter(item => item.status === status)
    }
  }
}
const mutations = {
  'UPDATE_ALL_GOODS'(state, data) {
    state.showGoods = data
  },
  'UPDATE_GOODS_ITEM'(state, data) {
    state.goods.find(v => {
      if (v.id === data.id) v = data
    })
  },
  'UPDATE_GOODS_ALL_SELECT'(state, data) {
    state.goods.forEach(v => {
      v.select = data.checked
    })
  },
  // 加入购物车
  'ADD_TO_CART'(state, data) {
    const cartGoods = state.cartGoods
    data.select = true
    data.status = 'going'
    data.kind = data.styleTitle
    if (cartGoods.length === 0) {
      state.cartGoods.push(data)
    } else {
      let isSameId = false
      cartGoods.forEach(item => {
        if (item.id === data.id) {
          item.num = item.num + data.num
          isSameId = true
        }
      })
      if (!isSameId) {
        state.cartGoods.push(data)
      }
    }
  },
  // 清空购物车
  'CLEAN_CART'(state, data) {
    state.cartGoods = []
  }
}
const actions = {
  async updataAllGoods({ commit }) {
    const db = wx.cloud.database()
    let res = await db.collection('goods').get()
    commit('UPDATE_ALL_GOODS', res.data)
    // // 查询当前用户所有的 counters
    // db.collection('goods').get()
    // .then(res => {
    //   console.log('aaa')
    //   commit('UPDATE_ALL_GOODS', res.data)
    // })
    // .catch(err => {
    //   console.log('fail信息:', err)
    // })
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
