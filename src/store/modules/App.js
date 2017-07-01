import Vue from 'vue'
import * as t from '@/store/mutation-types'
import { MIC } from '@/lib/MIC'

const state = {
  auth: false,
  page: 0
}

const mutations = {
  [t.APP_SET_AUTH] (state, value) {
    state.auth = value
  },
  [t.APP_SET_PAGE] (state, value) {
    state.page = value
  }
}

const actions = {
  auth ({commit}, {username, password}) {
    return MIC.login(username, password)
      .then(account => {
        commit(t.APP_SET_AUTH, 1)
        commit(t.APP_SET_PAGE, 1)
        return Promise.resolve(account)
      })
  },
  page ({commit}, value) {
    commit(t.APP_SET_PAGE, value)
  }
}

const getters = {
  auth: (state) => {
    return state.auth
  },
  page: (state) => {
    return (!state.auth) ? 0 : state.page;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
