const state = {
  payList: [],
  // 结单入口标记
  isCartToPay: false
}
const getters = {
  payList: state => state.payList,
  payImgList: state => state.payList.map(v => {
    return v.src
  })
}
const mutations = {
  'ADD_TO_PAY'(state, data) {
    if (data instanceof Array) {
      state.payList = [...data]
    } else {
      state.payList.push(data)
    }
  },
  'UPDATE_PAYING_GOOD'(state, data) {
    // if (data instanceof Array) {
    //   state.payList = data
    // } else {
    // }
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
