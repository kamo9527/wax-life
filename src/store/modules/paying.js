const state = {
  payingList: [],
  // 结单入口标记
  isCartToPay: false
}
const getters = {
  payingList: state => {
    return state.payingList
  }
}
const mutations = {
  // 'UPDATE_GOODS_DETAIL'(state, data) {
  //   state.good = data
  // },
  'UPDATE_PAYING_GOOD'(state, data) {
    // if (data instanceof Array) {
    //   state.payingList = data
    // } else {
    // }
    state.payingList = [...data]
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
