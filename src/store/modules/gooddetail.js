const state = {
  good: {}
}
const getters = {
  // selectGoods: state => {
  //   return state.goods.filter(item => item.num)
  // },
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
    console.log('UPDATE_GOODS_DETAIL', state.good)
    
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
