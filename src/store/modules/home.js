const state = {
  current: 'home',
  showGoods: []
}
const getters = {
  currentVuex: stata => state.current,
  goodsList: stata => state.showGoods.filter(item => !item.is_new),
  newGoods: stata => state.showGoods.filter(item => item.is_new)
}
const mutations = {
  'UPDATE_CURRENT' (state, data) {
    state.current = data
  },
  'UPDATE_ALL_GOODS'(state, data) {
    state.showGoods = data
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
  mutations,
  actions
}
