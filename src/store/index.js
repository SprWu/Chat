import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  nickName: '',
}

const mutations = {
  changeNickName(state, newNickName) {
    state.nickName = newNickName
  }
}

const getters = {
  getNickName(state) {
    return state.nickName;
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters
})
