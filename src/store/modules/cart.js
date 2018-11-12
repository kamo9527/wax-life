const state = {
  cartGoods: []
}
const getters = {
  selectGoods: state => state.cartGoods
}
const mutations = {
  'ADD_TO_CART'(state, data) {
    data.select = true
    state.cartGoods.push(data)
  },
  'UPDATE_GOODS_ITEM'(state, data) {
    state.cartGoods.find(v => {
      if (v.id === data.id) v = data
    })
  },
  'UPDATE_GOODS_ALL_SELECT'(state, data) {
    state.cartGoods.forEach(v => {
      v.select = data.select
    })
  },
  // // 加入购物车
  // 'ssADD_TO_CART'(state, data) {
  //   const cartGoods = state.cartGoods
  //   data.select = true
  //   data.status = 'going'
  //   data.kind = data.styleTitle
  //   if (cartGoods.length === 0) {
  //     state.cartGoods.push(data)
  //   } else {
  //     let isSameId = false
  //     cartGoods.forEach(item => {
  //       if (item.id === data.id) {
  //         item.num = item.num + data.num
  //         isSameId = true
  //       }
  //     })
  //     if (!isSameId) {
  //       state.cartGoods.push(data)
  //     }
  //   }
  // },
  // 清空购物车
  'CLEAN_CART'(state, data) {
    state.cartGoods = []
  }
}
export default {
  state,
  getters,
  mutations
}
