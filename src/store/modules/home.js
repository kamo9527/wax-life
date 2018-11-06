const state = {
  current: 'home'
}
const getters = {
  currentVuex: stata => state.current
}
const mutations = {
  'UPDATE_CURRENT' (state, data) {
    state.current = data
  }
}
export default {
  state,
  getters,
  mutations
}
