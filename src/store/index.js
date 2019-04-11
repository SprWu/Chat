import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  inLineNum: 0,
}

const mutations = {
  changeNum(state, newNum) {
    state.inLineNum = newNum
  }
}

const getters = {
  getInLineNum(state) {
    return state.inLineNum;
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters
})
