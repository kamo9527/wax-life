const state = {
  good: {},
  payingGoods: [],
}
const getters = {
  payingGoods: state => {
    return state.payingGoods
  },
  // selectBuy: state => {
  //   return state.goods.filter(item => item.num && item.select)
  // },
  // selectStatus: (state, getters) => (status) => {
  //   if (status === 'all') {
  //     return getters.selectBuy
  //   } else {
  //     return getters.selectBuy.filter(item => item.status === status)
  //   }
  // }
}
const mutations = {
  'UPDATE_GOODS_DETAIL' (state, data) {
    state.good = data
  },

  'UPDATE_PAYING_GOOD' (state, data) {
    if(data instanceof Array) {
      state.payingGoods = data
    }else {
      state.payingGoods = [data]
    }
  },

  'UPDATE_GOODS_ALL_SELECT' (state, data) {
    state.goods.forEach(v => {
      v.select = data.checked
    })
  }
}

// const actions = {
//   UPDATE_CAR_BASIC_INFO({ commit }, basicInfo) {
//     commit('UPDATE_CAR_BASIC_INFO', basicInfo)
//   }
// }
export default {
  state,
  getters,
  // actions,
  mutations
}
