const state = {
  good: {},
  payingGoods: [],
  // 结单入口标记
  isCartToPay: false
}
const getters = {
  payingGoods: state => {
    return state.payingGoods
  },
  payImgList: state => state.payingGoods.map(v => {
    return v.src
  })
}
const mutations = {
  'UPDATE_GOODS_DETAIL'(state, data) {
    state.good = data
  },
  'UPDATE_PAYING_GOOD'(state, data) {
    if (data instanceof Array) {
      state.payingGoods = data
    } else {
      state.payingGoods = [data]
    }
  },
  'UPDATE_GOODS_ALL_SELECT'(state, data) {
    state.goods.forEach(v => {
      v.select = data.checked
    })
  },
  'UPDATE_TOPAY_TYPE'(state, data) {
    state.isCartToPay = data
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
