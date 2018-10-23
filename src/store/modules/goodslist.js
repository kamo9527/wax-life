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
  goods: []
}
const getters = {
  goodsList: stata => stata.goods,
  // goodsBySale: stata => {
  //   return stata.goods.sort((a, b) => {
  //     return b.sale - a.sale
  //   })
  // },
  // goodsByPraise: stata => {
  //   return stata.goods.sort((a, b) => {
  //     return b.praise - a.praise
  //   })
  // },
  // goodsByPriceUp: stata => {
  //   return stata.goods.sort((a, b) => {
  //     return a.price - b.price
  //   })
  // },
  // goodsByPriceDown: stata => {
  //   return stata.goods.sort((a, b) => {
  //     return b.price - a.price
  //   })
  // },
  selectGoods: state => {
    return state.goods.filter(item => item.num)
  },
  selectBuy: state => {
    return state.goods.filter(item => item.num && item.select)
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
  'UPDATE_ALL_GOODS' (state, data) {
    state.goods = data
  },
  'UPDATE_GOODS_ITEM' (state, data) {
    state.goods.find(v => {
      if (v.id === data.id) v = data
    })
  },
  'UPDATE_GOODS_ALL_SELECT' (state, data) {
    state.goods.forEach(v => {
      v.select = data.checked
    })
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
