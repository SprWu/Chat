import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  inLineNum: 0,
  oneName: '',
  twoName: ''
}

const mutations = {
  changeNum(state, newNum) {
    state.inLineNum = newNum
  },
  setName(state,params) {
    // state.selfName = selfName;
    state.oneName = params[0] || '';
    state.twoName = params[1] || '';
  }
}

const getters = {
  getInLineNum(state) {
    return state.inLineNum;
  },
  // getSelfName(state) {
  //   return state.selfName;
  // },
  getOneName(state) {
    return state.oneName;
  },
  getTwoName(state) {
    return state.twoName;
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters
})
