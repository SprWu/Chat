import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  inLineNum: 0,
  userList: []
}

const mutations = {
  userAdd(state,user) {
    if(state.userList.indexOf(user) === -1)
      state.userList.push(user);
  },
  changeList(state, list) {
    state.userList = list;
  },
  userRemove(state,user) {
    let arr = state.userList.filter( u => u != user)
    state.userList = arr;
  }
}

const getters = {
  getUserList(state) {
    return state.userList;
  }
}
export default new Vuex.Store({
  state,
  mutations,
  getters
})
