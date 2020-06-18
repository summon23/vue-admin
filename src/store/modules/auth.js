import AuthLogic from '../../logic/auth'

const user = localStorage.getItem('user-token')

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export default {
  namespaced: true,
  state: initialState,
  actions: {
    login ({ dispatch, commit }, userdata) {
      return AuthLogic.authUser(userdata).then(
        user => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        error => {
          return Promise.reject(error)
        },
      )
    },
    logout ({ commit }) {
      AuthLogic.doLogout()
      commit('logoutSuccess')
    },
  },
  mutations: {
    loginSuccess (state) {
      state.status.loggedIn = true
    },
    logoutSuccess (state) {
      state.status.loggedIn = false
      state.user = null
    },
  },
}
